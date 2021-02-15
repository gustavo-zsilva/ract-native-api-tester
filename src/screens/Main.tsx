import React, { useState, useEffect } from 'react';


import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native';
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

            
            <Sidebar visible={isSidebarOpen} setData={setData} />
            

            <View 
                style={styles.flatList}
                pointerEvents={!isSidebarOpen ? 'none' : 'auto'}
            >
            <FlatList
                data={data}
                renderItem={({item}) => {
                    return <Card item={item} setData={setData} data={data} />
                }}
                ListEmptyComponent={() => (
                    <View style={styles.emptyList}>
                        <FeatherIcon name="moon" size={42} color="#FFF" style={{ marginBottom: 10 }} />
                        <Text style={styles.emptyListText}>
                            Parece que sua lista de APIs está vazia.
                        </Text>
                        <Text style={styles.emptyListText}>
                            Comece a adicionar no botão de
                            {' '}
                            <Text style={{ fontSize: 24 }}>
                                +!
                            </Text>
                        </Text>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={styles.line} />
                )}
                keyExtractor={(item) => item.id}
                refreshing={false}
                onRefresh={() => getData('@api_list_key')}
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

    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%'
    },

    emptyListText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowRadius: 6,
        textShadowOffset: { width: 1, height: 1 }
    },

    line: {
        width: '90%',
        height: 1,
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#586575'
    }
})

export default Main;