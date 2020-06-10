import React from 'react';
import { 
    View,
    Animated,
    PanResponder,
    Dimensions,
    StyleSheet,
    LayoutAnimation,
    UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.33 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250

const Deck = ({ data, renderCard = () => {}, onSwipeLeft = () => {}, onSwipeRight = () => {}, renderNoMoreCards = () => {} }) => {

    // initialize position piece of state to be a refrence to an instanciated AnimatedValue
    const [position, setPosition] = React.useState(new Animated.ValueXY())

    // piece of state representing index of card we are swiping on (default value = 0)
    const [index, setIndex] = React.useState(0);

    const [panResponder] = React.useState(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => { 
            position.setValue({
                x: gesture.dx, 
                y: gesture.dy
            })
        },
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
                forceSwipe('Right');
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
                forceSwipe('Left');
            } else {
                resetPosition();
            }
        }
    }));

    /**
     * called by our panresponder when user swipe distance does not exceed
     * swipe threshold.
     * 
     * calls Animated.spring to change position of the card back to (0, 0)
     */
    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    /**
     * returns an object with 'position.getLayout(), transform: [{ interpolated rotation value }]
     * to be passed into style prop of Animated.View within renderCards
     */
    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        })
        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        };
    }

    /**
     * function called by onPanResponderRelease
     *  - if user swiped past SWIPE_THRESHOLD
     *      and user was swiping right, pass direction as 'Right', animate card off the screen to the right
     *  - else if user swiped past SWIPE_THRESHOLD
     *      and user was swiping left, pass direction as 'Left', animate card off the screen to the left
     * 
     *  - after animating, calls onSwipeComplete passing in the direction our card was swiped in
     * 
     * @param {STRING} direction === 'Left' || 'Right'
     */
    const forceSwipe = (direction) => {
        const x = direction === 'Right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position, {
            toValue: { x , y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => onSwipeComplete(direction));
    }

    /**
     * function provided as callback to .start() within forceSwipe funciton 
     *  - incremements index (state) and resets position (state) to prepare for next card to be shown
     *  - calls onSwipeRight / onSwipeLeft callback provided as prop passing in item that was swipped
     * 
     * @param {STRING} direction === 'Left' || 'Right'
     */
    const onSwipeComplete = (direction) => {
        const item = data[index];
        setIndex(prev => prev + 1)
        position.setValue({ x: 0, y: 0 })
        direction === 'Right' ? onSwipeRight(item) : onSwipeLeft(item);
    }
    
    // logic for implementing componentWillUpdate via hooks (thanks to useRef)
    const isFirstRender = React.useRef(true);
    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        /* business logic for component did update */
        
        // android compatibility
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // tell react native to animate any pending changes
        LayoutAnimation.spring();
    });

    // logic for implementing componetWillRecieceProps via hooks
    React.useEffect(() => {
        setIndex(0)
    }, [data])


    /**
     * function maps through the array of objects passed into component as a prop
     *  - returns an animated view wrapping each individual object
     *  - for each item within the array, this function calls the renderCard callback 
     * provided as a prop
     */
    const renderCards = () => {

        if (index >= data.length) {
            return renderNoMoreCards();
        }

        return data.map((item, i) => {

            if (i < index) return null

            if (i === index) {
                return (
                    <Animated.View 
                        key={item.id}
                        {...panResponder.panHandlers} 
                        style={[getCardStyle(), styles.cardStyle]}
                    >
                        { renderCard(item) }
                    </Animated.View>
                )
            }
                
            return (
                <Animated.View 
                    style={[styles.cardStyle, { top: 10 * (i - index) }]} 
                    key={item.id}>
                {
                    renderCard(item)
                }
                </Animated.View>
            )
        }).reverse();
    }
    
    return (
        <View>
        {
            renderCards()
        }
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
})

export default Deck