import React, { useState } from 'react';

import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Animated } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Slide from '../animations/Slide';

const Sidebar = ({ children, visible }: any) => {

    const handleDeleteAllCards = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Deleted all cards');
            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Slide styles={styles.container} visible={visible}>
                
            <View>
                {children}
            </View>

            <TouchableOpacity
                style={styles.deleteAllBtn}
                activeOpacity={0.6}
                onPress={handleDeleteAllCards}
            >
                <Text style={styles.deleteAllText}>Delete All Cards</Text>
            </TouchableOpacity>

        </Slide>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        elevation: 6,
        height: Dimensions.get('window').height,
        width: 300,
        backgroundColor: '#455160',
        position: 'absolute',
        // top: StatusBar.currentHeight + 73,
        zIndex: 2
    },

    deleteAllBtn: {
        borderColor: '#ff6464',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 25,
        elevation: 1,
        marginBottom: 10
    },

    deleteAllText: {
        textAlign: 'center',
        color: '#ff6464',
        fontSize: 15
    }
})

export default Sidebar;