import React, { useState, useEffect } from 'react';

import { Animated, Easing } from 'react-native';

const Loading = ({ children }: any) => {

    const value = useState(new Animated.Value(0))[0];

    
    const animateIcon = () => {
        Animated.sequence([
            Animated.timing(
                value,
                {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.ease,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                value,
                {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true
                }
            ),
        ]).start(animateIcon)
    }
       
    useEffect(() => {
        animateIcon();
    }, [])

    const rotationalAnimation = value.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <Animated.View style={{ transform: [{ rotate: rotationalAnimation }] }}>
            {children}
        </Animated.View>
    );
}

export default Loading;