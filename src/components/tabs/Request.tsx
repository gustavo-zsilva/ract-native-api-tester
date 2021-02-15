import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import All from './All';
import sendRequest from '../../utils/sendRequest';

const Request = ({ route }: any) => {
    console.log('Request Screen');
    console.log(route.params.item);
    

    const { Navigator, Screen } = createMaterialTopTabNavigator();

    // const { data } = sendRequest(item.url, item.method)

    return (
        <View>
            <Navigator>
                <Screen name="All" component={All} />
            </Navigator>
        </View>
    )
}

export default Request;