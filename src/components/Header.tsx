import React from 'react';

import { View, StyleSheet, StatusBar } from 'react-native';

const Header = ({ children, forceTop = false }: any) => {
    return (
        <View style={[styles.container, {
            position: forceTop ? 'absolute' : 'relative',
            top: 0,
            right: 0,
            left: 0,
        }]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#926DDE',
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: 6,
        elevation: 6,
        zIndex: 3
    }
})

export default Header;