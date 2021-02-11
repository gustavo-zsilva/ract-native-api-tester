import React, { useState } from 'react';

import 'react-native-get-random-values';

import { View, Text, StyleSheet, StatusBar, TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';

const Modal = ({ route, navigation }: any) => {

    const { data } = route.params;

    const [title, setTitle] = useState('');
    const [apiUrl, setApiUrl] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const handleFormSubmit = async () => {
        if (!title || !apiUrl) return;

        setSubmitted(true);

        const newCard = {
            title,
            apiUrl,
            responseType: 'json',
            id: uuidv4(),
        };

        const newCards = [...data, newCard];

        try {
            await AsyncStorage.setItem('@api_list_key', JSON.stringify(newCards));
        } catch (err) {
            console.error(err);
        }

        setTitle('');
        setApiUrl('');

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header forceTop>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={32} color="#FFF" />
                </TouchableOpacity>
            </Header>

            <Text style={styles.title}>New API Endpoint</Text>

            <View style={styles.form}>
                <View style={styles.row}>
                    <View style={{ flex: 2, marginRight: 15 }}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            maxLength={25}
                            value={title}
                            onChangeText={text => setTitle(text)}
                        />
                    </View>
                    
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Response Type</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            defaultValue="JSON"
                        />
                    </View>
                </View>

                <Text style={styles.label}>Endpoint URL</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="url"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={apiUrl}
                    onChangeText={text => setApiUrl(text)}
                />

                <TouchableNativeFeedback onPress={handleFormSubmit}>
                    <View style={[styles.submitButton, {backgroundColor: submitted ? '#43BF6C' : 'dodgerblue'}]}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: StatusBar.currentHeight,
        paddingTop: 120,
        padding: 30,
        flex: 1,
        backgroundColor: '#3F4A59'
    },

    title: {
        fontSize: 24,
        textAlign: 'center',
        color: '#FFF'
    },

    form: {
        marginTop: 30,
        flex: 1
    },

    label: {
        fontSize: 16,
        marginBottom: 6,
        color: '#FFF'
    },

    input: {
        elevation: 3,
        backgroundColor: '#FFF',
        padding: 8,
        width: '100%',
        fontSize: 15,
        borderRadius: 2
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    submitButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'dodgerblue',
        elevation: 6,
        padding: 20,
        borderRadius: 2
    },

    submitButtonText: {
        color: '#FFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 2 },
        fontSize: 18
    },

    back: {
        padding: 12,
    }
})

export default Modal;