import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import axios from 'axios';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Loading from '../animations/Loading';

import layoutStyles from '../styles/Layout';

interface Request {
    success: boolean;
    response: string;
    method: string;
    headers?: {
        accept: string;
    }
    sent?: boolean;
    readyState?: number;
}

const Card = ({ item }: any) => {

    const [isProcessingRequest, setIsProcessingRequest] = useState(false);
    const [requestData, setRequestData] = useState<Request>();


    const handleSendRequest = async (apiUrl: string) => {

        setIsProcessingRequest(true);

        axios.get(apiUrl)
        .then((data) => console.log(data))
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
                    headers: err.request["_headers"]["accept"],
                    sent: err.request["_sent"],
                    readyState: err.request["readyState"]
                }

                setRequestData(dataToSave)
            } else {
                console.log(err.message);
                
            }

            // console.log(err.config);
            
        })
        
        setIsProcessingRequest(false);
    }


    return (
        <TouchableOpacity
            style={styles.card}
            key={item.id}
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

                        <Text style={styles.apiUrl}>{item.apiUrl}</Text>
                    </View>
                </View>
            
                <FeatherIcon
                    name="check-circle"
                    size={32}
                    color="#00f120"
                />
            </View>

            <View style={[layoutStyles.row, {marginTop: isProcessingRequest ? 10 : 0, width: '100%'}]}>
                {
                    isProcessingRequest && (
                        <View style={[layoutStyles.row, {width: '100%'}]}>
                            <Loading>
                                <Icon name="loading1" size={32} color="#FFF" style={{transform: [{rotate: '30deg'}]}} />
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
                        <View style={[styles.responseContainer, {borderTopColor: requestData.success ? '#2cff2c' : '#ff6b6b'}]}>
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
                        </View>
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

    jsonIcon: {
        marginRight: 10
    },

    responseContainer: {
        marginTop: 10,
        borderTopColor: '#ff6b6b',
        borderTopWidth: 1
    },

    responseText: {
        fontSize: 15,
        marginTop: 3,
        color: '#FFF',
    }
})

export default Card;