import React, { useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import DataContext from '../../contexts/data';

const Body = () => {

    const data = useContext(DataContext);

    return (
        <View>
            <Text>
                {/* {JSON.stringify(data.request.body)} */}
            </Text>
        </View>
    )
}

export default Body;