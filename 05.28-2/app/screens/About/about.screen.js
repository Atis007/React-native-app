import * as React from 'react';
import { Text, Button, View } from 'react-native';
import { aboutStyle } from './about.style';

export default function Page({route, navigation}) {
    const { nev, HF1 } = route.params;
    return(
        <View style={aboutStyle.container}>
            <Text>Ez itt a masodik oldal</Text>
            <Text>Hallgato: {nev}</Text>
            <Text>Hf1: {HF1}</Text>
            <Button title="Vissza" onPress={() => navigation.goBack()}/>
        </View>
    );
}