import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../screens/Main';
import Modal from '../screens/Modal';

const StackNavigator = () => {
    const { Navigator, Screen } = createStackNavigator();

    return (
        <NavigationContainer>
            <Navigator headerMode="none" initialRouteName="Home">
                <Screen name="Home" component={Main} />
                <Screen name="Modal" component={Modal} />
            </Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;
