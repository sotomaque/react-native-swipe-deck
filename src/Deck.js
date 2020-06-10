import React from 'react';
import { 
    View,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Deck = ({ data, renderCard }) => {


    // initialize position piece of state to be a refrence to an instanciated AnimatedValue
    const [position, setPosition] = React.useState(new Animated.ValueXY())

    const [panResponder] = React.useState(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => { 
            position.setValue({
                x: gesture.dx, 
                y: gesture.dy
            })
        },
        onPanResponderRelease: () => {}
    }));

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

    const renderCards = () => {
        return data.map((item, index) => {
            if (index === 0 ) {
                return (
                    <Animated.View 
                        key={item.id}
                        {...panResponder.panHandlers} 
                        style={getCardStyle()}
                    >
                        { renderCard(item) }
                    </Animated.View>
                )
            }
                
            return renderCard(item)
        });
    }

    return (
        <View>
        {
            renderCards()
        }
        </View>
    )
}


export default Deck