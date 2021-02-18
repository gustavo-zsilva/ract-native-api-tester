import React, { useEffect, useState, useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DataContext from '../../contexts/data';

import All from './All';
import Body from './Body';
import Headers from './Headers';
import Query from './Query';

import sendRequest from '../../utils/sendRequest';

const Request = () => {

    const { Navigator, Screen } = createMaterialTopTabNavigator();

    return (
        <View style={styles.container}>
            <Navigator>
                <Screen name="All" component={All} />
                <Screen name="Body" component={Body} />
            </Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F4A59'
    },
})

export default Request;