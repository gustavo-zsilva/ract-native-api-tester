import React, { useEffect, useState, createContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import All from './All';
import Body from './Body';
import Headers from './Headers';
import Query from './Query';

import sendRequest from '../../utils/sendRequest';

export let dataContext: any;

const Request = ({ route }: any) => {
    const { item } = route.params;

    dataContext = createContext({});

    // const data = sendRequest(item.url, item.method);
    // console.log(data);

    const [data, setData] = useState<AxiosRequestConfig>({})
    
    // useEffect(() => {
    //     axios({
    //         url: item.apiUrl,
    //         method: item.method,
    //     })
    //     .then(data => setData({...data}))
    //     .catch(err => console.log(err))
    // }, [])

    const sendReq = async () => {
        let data;

        try {
            const response: AxiosResponse = await axios.get(item.apiUrl);
            data = await response.request;
        } catch (err) {
            console.error(err); 
        }

        setData(data);

        return {data};
    }



    useEffect(() => {
        sendReq();
        console.log('DATA:  ', data);
    }, [])

    // console.log('====================================');
    // console.log('DATA: ', data.data);
    // console.log('====================================');
  

    const { Navigator, Screen } = createMaterialTopTabNavigator();

    return (
        <View style={styles.container}>
            <dataContext.Provider value={{ data }}>
            <Navigator>
                    <Screen name="All" component={All} />
                    <Screen name="Body" component={Body} />
                    <Screen name="Headers" component={Headers} />
                    <Screen name="Query" component={Query} />
                
            </Navigator>
            </dataContext.Provider>
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