import React, { useState, useEffect } from 'react';

import { Animated, Dimensions } from 'react-native';

const Slide = ({ children, visible, styles }: any) => {

    const outOfView = -(Dimensions.get('window').width);

    const value = useState(new Animated.Value(visible ? 0 : outOfView))[0];

    useEffect(() => {
        Animated.timing(value, {
            toValue: visible ? outOfView : 0,
            duration: 140,
            useNativeDriver: true
        }).start();
    })

    return (
        <Animated.View style={[styles, { transform: [{ translateX: value }] }]}>
            {children}
        </Animated.View>
    );
}



export default Slide;