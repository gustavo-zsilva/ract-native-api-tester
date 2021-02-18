import React, { useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import DataContext from '../../contexts/data';

const All = () => {

    const data = useContext(DataContext);

    return (
        <View>
            <Text>
                {JSON.stringify(data.request)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default All;