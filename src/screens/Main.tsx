import React, { useState, useEffect } from 'react';


import { View, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Card from '../components/Card';

interface ItemProps {
    title: string;
    apiUrl: string;
    id: string;
}


const Main = ({ navigation }: any) => {

    const [data, setData] = useState<ItemProps[]>([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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

    

    // console.log(requestData);
    

    useEffect(() => {
        getData('@api_list_key');
    })

    return (
        <View style={styles.container}>
     
            <StatusBar backgroundColor="#2b2b2b" translucent />
            
            <Header>
                <TouchableOpacity style={styles.menu} onPress={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FeatherIcon name="menu" size={32} color="#f3f3f3" />
                </TouchableOpacity>
            </Header>

            
            <Sidebar visible={isSidebarOpen} />
            

            <View 
                style={styles.flatList}
                pointerEvents={!isSidebarOpen ? 'none' : 'auto'}
            >
            <FlatList
                data={data}
                renderItem={({item}) => {
                    return <Card item={item} />
                }}
            />
            </View>
            
            <View style={styles.add}>
                <TouchableOpacity onPress={() => navigation.navigate('Modal', { data })}>
                    <View>
                        <Icon name="plus" size={40} color="#2b2b2b" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F4A59'
    },

    flatList: {
        flexDirection: 'column',
        flex: 1
    },

    add: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 50,
        elevation: 6
    },

    menu: {
        padding: 12,
    },
})

export default Main;