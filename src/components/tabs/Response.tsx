import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import All from './All';
import Body from './Body';
import Headers from './Headers';

const Response = () => {
    const { Navigator, Screen } = createMaterialTopTabNavigator();
    
    return (
        <View style={styles.container}>
            <Navigator>
                <Screen name="All" component={All} />
                <Screen name="Body" component={Body} />
                <Screen name="Headers" component={Headers} />
            </Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Response;