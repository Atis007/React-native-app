import * as React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function Page({navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Ez itt az elso oldal</Text>
                <Button 
                    title="About-ra"
                    onPress={() => navigation.navigate('about',{nev: 'Pista', HF1: 71})}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        padding: 24
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: 960,
        marginHorizontal: 'auto'
    },
    title:{
        fontSize: 64,
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize: 36,
        color: '#384340',
    }
});