import React, { useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { dataContext } from './Request';

const Body = () => {

    const data = useContext(dataContext);

    return (
        <View>
            <Text>
                {JSON.stringify(data.data)}
            </Text>
        </View>
    )
}

export default Body;