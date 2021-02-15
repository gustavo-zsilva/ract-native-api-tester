import React from 'react';

import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Header from '../components/Header';

import Request from '../components/tabs/Request';
import Response from '../components/tabs/Response';




const Details = ({ item }: any) => {
    const { Navigator, Screen } = createMaterialTopTabNavigator();

    return (
        <View style={styles.container}>
            <Header>
                <Text>Header</Text>
            </Header>

            
            <Navigator
                initialRouteName="Request"
                tabBarOptions={{
                    activeTintColor: '#FFF',
                    inactiveTintColor: '#926DDE',
                    indicatorStyle: {
                        height: null,
                        top: 0,
                        backgroundColor: '#926DDE'
                    },
                    indicatorContainerStyle: {
                        backgroundColor: '#3F4A59'
                    }
                }}
                swipeEnabled
            >
                <Screen name="Request" component={Request} initialParams={{ item: item }} />
                <Screen name="Response" component={Response} />
            </Navigator>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F4A59'
    },

    responseTab: {
        padding: 20,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F4A59'
    }
})

export default Details;