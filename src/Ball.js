import React from 'react'
import { View, StyleSheet, Animated, Button } from 'react-native';

/**
 * 
 * Component shows a 'ball' at position (0, 0) 
 * and animates it over 1 second, to end up at 
 * position (200, 500)
 * 
 */
const Ball = () => {

    const [reanimate, setReanimate] = React.useState(false)

    // initialize position piece of state to be a refrence to an instanciated AnimatedValue (with default values 0,0)
    const [position, setPosition] = React.useState(new Animated.ValueXY(0, 0))

    // when component mounts
    React.useEffect(() => {

        // animate position, from default, to (200, 500)
        Animated.spring(position, {
            toValue: { x: 200, y: 700 },
            duration: 500
        }).start();

    }, [])

    // reanimate 
    React.useEffect(() => {
        if (reanimate) {
            Animated.spring(position, {
                toValue: { x: 0, y: 0 }
            }).start();
        } else {
            Animated.spring(position, {
                toValue: { x: 200, y: 700 }
            }).start();
        }
        
    }, [reanimate])

    // wrap view with animated.view, and pass in style -> position.getLayout()
    // we always animate an animated.view as opposed to a primitive view component
    return (
        <>
        <Animated.View style={position.getLayout()}>
            <View style={styles.ball} />
        </Animated.View>
        <Button title="Reanimate" onPress={() => setReanimate(prev => !prev)} />
        </>
    )
}

const styles = StyleSheet.create({
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black'
    }
})


export default Ball
