import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/AntDesign';

const Main = () => {

    const [data, setData] = useState([{title: 'Poggers', apiUrl: 'https://localhost:3000/api'}]);

    const getData = async (storageKey: string) => {
        try {
            const jsonData = await AsyncStorage.getItem(storageKey);

            if (jsonData === null) return;

            const data = JSON.parse(jsonData);
            setData(data);

        } catch (err) {
            console.error(err);
        }
    }

    const setItems = async (storageKey: string) => {
        try {
            await AsyncStorage.setItem(storageKey, JSON.stringify([{title: 'Poggers', apiUrl: 'https://localhost:3000/api'}]))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        // setItems('@api_list_key');

        getData('@api_list_key');
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#2b2b2b" translucent /> 
            
            <View style={styles.header}>
            </View>

            <View>
                {
                    data.map((item: any) => {
                        return <Text>{item.title}</Text>
                    })
                }
            </View>

            
            <View style={styles.add}>
                <TouchableOpacity>
                    <View>
                        <Icon name="plus" size={40} color="#000000" />
                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0f0f0',
        marginTop: StatusBar.currentHeight,
        padding: 20,
        elevation: 6
    },

    list: {
        flexDirection: 'column'
    },

    add: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 50,
        elevation: 6
    }
})

export default Main;