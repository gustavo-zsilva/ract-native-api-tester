import React, { useContext } from 'react';

import { View, Text, StyleSheet } from 'react-native';


import { dataContext } from './Request';

const All = () => {

    const data = useContext(dataContext);

    return (
        <View>
            <Text>
                {JSON.stringify(data)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default All;