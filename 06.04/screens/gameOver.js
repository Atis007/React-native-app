import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useRef, useEffect } from "react";
import Card from '../components/card';
import Number from '../components/number';
import Colors from '../constants/colors';

export default function Page(props){

    return (
        <View style={styles.container}>
            <Text>A jateknak vege</Text>
            <Text>Talalgatasok szama: {props.roundsNumber}</Text>
            <Text>A keresett szam: {props.userNumber}</Text>
            <Button title="Uj jatek" onPress={props.onRestart}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        padding: 10
    }
})