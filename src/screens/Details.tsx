import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import axios, { AxiosResponse } from 'axios';
import DataContext from '../contexts/data';

import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

import Request from '../components/tabs/Request';
import Response from '../components/tabs/Response';
import Query from '../components/tabs/Query';
import Headers from '../components/tabs/Headers';


const Details = ({ navigation, route }: any) => {
    const { Navigator, Screen } = createMaterialTopTabNavigator();

    const { item } = route.params;

    const [data, setData] = useState({});

    const sendReq = async () => {

        const data: AxiosResponse = await axios.get(item.apiUrl);

        console.log('data data::: ', data);

        setData(data);

        return {data};
    }

    useEffect(() => {
        sendReq();
    }, [])

    return (
        <View style={styles.container}>
            <Header>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={32} color="#FFF" />
                </TouchableOpacity>
            </Header>

            <DataContext.Provider value={data}>
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
                    <Screen name="Request" component={Request} />
                    <Screen name="Response" component={Response} />
                    <Screen name="Headers" component={Headers} />
                    <Screen name="Query" component={Query} />
                </Navigator>
            </DataContext.Provider>
            
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
    },

    back: {
        padding: 12,
    }
})

export default Details;