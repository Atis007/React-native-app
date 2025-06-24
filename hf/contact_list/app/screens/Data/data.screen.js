import React from 'react';
import { Text, Button, View, TouchableOpacity } from 'react-native';
import { contactStyle } from '../style/contact.style';

export default function Page({navigation, route}) {
    const { name, phone } = route.params;
    return(
        <View style={contactStyle.container}>
            <Text style={contactStyle.title}>Adatok</Text>

            <View style={contactStyle.dataContainer}>
                <Text style={contactStyle.dataLabel}>Név</Text>
                <Text style={contactStyle.dataValue}>{name}</Text>
                
                <Text style={contactStyle.dataLabel}>Telefon</Text>
                <Text style={contactStyle.dataValue}>{phone}</Text>
            </View>
            <TouchableOpacity 
                style={contactStyle.backButton}
                onPress={() => navigation.goBack()}>
                <Text style={contactStyle.buttonText}>Vissza a listához</Text>
            </TouchableOpacity>
        </View>
    );
}