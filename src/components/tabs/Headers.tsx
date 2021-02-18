import React, { useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import DataContext from '../../contexts/data';

const Headers = () => {

    const data = useContext(DataContext);

    return (
        <View>
            <Text>
                {JSON.stringify(data.headers)}
            </Text>
        </View>
    )
}

export default Headers;