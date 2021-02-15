import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, LayoutChangeEvent } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Picker } from '@react-native-picker/picker';

import Loading from '../animations/Loading';

import layoutStyles from '../styles/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Request {
    success: boolean;
    response?: string;
    status?: number;
    method?: string;
    data?: Object;
    headers?: {
        accept: string;
    }
    sent?: boolean;
    readyState?: number;
    server?: string;
}

const Card = ({ item, setData, data }: any) => {

    const navigation = useNavigation();

    const [isProcessingRequest, setIsProcessingRequest] = useState(false);
    const [requestData, setRequestData] = useState<Request>();

    useEffect(() => {
        setIsProcessingRequest(false);
    }, [requestData])


    const handleSendRequest = async (apiUrl: string) => {

        setIsProcessingRequest(true);

        axios(apiUrl, {
            method: item.method
        })
        .then((data) => {
            const dataToSave = {
                success: true,
                data: data.data,
                method: data.request["_method"],
                status: data.status,
                server: data.headers.server
            }

            setRequestData(dataToSave);
        })
        .catch((err) => {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status);
                console.log(err.response.headers);
                
            } else if (err.request) {
                console.log(err.request);

                const dataToSave = {
                    success: false,
                    response: err.request["_response"],
                    method: err.request["_method"],
                    status: err.request["status"],
                    headers: err.request["_headers"]["accept"],
                    sent: err.request["_sent"],
                    readyState: err.request["readyState"]
                }

                setRequestData(dataToSave);
            } else {
                
                const dataToSave = {
                    success: false,
                    response: err.message,
                }

                setRequestData(dataToSave);
            }

            // console.log(err.config);
            
        })
    }

    const handleChangeApiMethod = async (itemValue: string) => {
        let newData = [...data];
        const indexOfItem = newData.findIndex((element) => element.id === item.id);
        
        newData[indexOfItem].method = itemValue;

        try {
            await AsyncStorage.setItem('@api_list_key', JSON.stringify(newData));
        } catch (err) {
            console.error(err);
        }

        setData(newData);
    }


    const methodsColors: any = {
        GET: '#c1a2ff',
        POST: '#48ff48',
        PUT: '#ff9f50',
        PATCH: '#ff9034',
        DELETE: '#ff6464'
    }

    const successColors = {
        true: '#2cff2c',
        false: '#ff6b6b'
    }

    

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleSendRequest(item.apiUrl)}
        >
            <View style={layoutStyles.row}>
                <View style={layoutStyles.row}>
                    <MaterialIcon
                        name="code-json"
                        size={32}
                        color="#f3f3f3"
                        style={styles.jsonIcon}
                    />
                    <View style={layoutStyles.column}>
                        <Text style={styles.itemTitle}>{item.title}</Text>

                        {item.isUrlHidden ? (
                            <Text style={[styles.apiUrl, {fontStyle: 'italic'}]}>Hidden</Text>
                        ) : (
                            <Text style={styles.apiUrl}>{item.apiUrl}</Text>
                        )}
                    </View>
                </View>

                <Picker
                    mode="dropdown"
                    selectedValue={item.method}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleChangeApiMethod(itemValue.toString())}
                >
                    {Object.keys(methodsColors).map((method: any, index: number) => (
                        <Picker.Item
                            key={index}
                            label={method}
                            value={method}
                            color={methodsColors[method]}
                        />
                    ))}
                </Picker>
            </View>

            <View style={[layoutStyles.row, {marginTop: isProcessingRequest ? 10 : 0, width: '100%'}]}>
                {
                    isProcessingRequest && (
                        <View style={[layoutStyles.row, {width: '100%'}]}>
                            <Loading>
                                <Icon name="loading1" size={32} color="#FFF" />
                            </Loading>
                            
                            <TouchableOpacity>
                                <Text style={{ color: '#ff7979' }}>
                                    cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

                {
                    requestData && (
                        <ScrollView style={[styles.responseContainer, {borderTopColor: successColors[requestData.success]}]} scrollEnabled={false}>
                            {Object.entries(requestData).map(([key, value], i) => {
                                // console.log(value);
                                
                                return <Text
                                            key={i}
                                            style={styles.responseText}
                                        >
                                            <Text style={{
                                                color: requestData.success ? '#98ff98' : '#ff9d9d'
                                            }}>
                                                {key}
                                            </Text>
                                            {" / "}
                                            <Text style={{
                                                color: typeof value === 'boolean' ? '#90cdff' : '#FFF'
                                            }}>
                                                {value.toString()}
                                            </Text>
                                            
                                        </Text>
                            })}
                            <View style={[styles.row, {marginTop: 10}]}>
                                <TouchableOpacity
                                    style={{marginRight: 10, padding: 4}}
                                    onPress={() => setRequestData(undefined)}
                                >
                                    <FeatherIcon
                                        name="trash-2"
                                        size={20}
                                        color={successColors[requestData.success]}
                                    />
                                </TouchableOpacity>
                                <View style={[styles.line, {backgroundColor: successColors[requestData.success]}]} />
                                <TouchableOpacity
                                    style={[styles.row, {marginLeft: 10, padding: 4}]}
                                    onPress={() => navigation.navigate('Details', {
                                        
                                    })}
                                >
                                    <Text style={{color: successColors[requestData.success], marginRight: 2}}>
                                        see details
                                    </Text>
                                    <MaterialIcon
                                        name="arrow-expand-right"
                                        size={20}
                                        color={successColors[requestData.success]}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )
                }
                
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        backgroundColor: '#586575',
        padding: 20,
        margin: 20,
        marginBottom: 2,
        borderRadius: 4,
        elevation: 2
    },

    itemTitle: {
        color: "#FFF"
    },

    apiUrl: {
        fontSize: 14,
        color: '#a7a7a7'
    },

    method: {
        fontSize: 16,
        // color: "#48ff48"
    },

    jsonIcon: {
        marginRight: 10
    },

    responseContainer: {
        marginTop: 10,
        borderTopColor: '#ff6b6b',
        borderTopWidth: 1,
        width: '100%'
    },

    responseText: {
        fontSize: 15,
        marginTop: 3,
        color: '#FFF',
    },

    picker: {
        minWidth: 120,
        alignSelf: 'flex-end',
        height: 40,
        fontSize: 15,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ff6b6b',
    },

    details: {
        
    }
})

export default Card;