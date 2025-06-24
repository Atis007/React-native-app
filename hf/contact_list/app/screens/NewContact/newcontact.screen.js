import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { contactStyle } from '../style/contact.style';

export default function NewContactScreen({navigation}) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isFocused, setIsFocused] = useState({ name: false, phone: false });

    const handleSave = () => {
        if (!name.trim()) {
            Alert.alert('Hiba', 'Kérem adja meg a nevet!');
            return;
        }
        
        if (!phone.trim()) {
            Alert.alert('Hiba', 'Kérem adja meg a telefonszámot!');
            return;
        }

        navigation.navigate('Kapcsolatok', { 
            newContact: { name: name.trim(), phone: phone.trim() }
        });
    };
    return(
        //lathato lesz a billenyuzet mogotti textinput is, androidon vesz a magassagabol
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View style={contactStyle.container}>
                <Text style={contactStyle.title}>Új név hozzáadása</Text>

                <TextInput
                    placeholder="Név"
                    placeholderTextColor="#666666"
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setIsFocused({...isFocused, name: true})}
                    onBlur={() => setIsFocused({...isFocused, name: false})}
                    style={[
                        contactStyle.input,
                        isFocused.name && contactStyle.inputFocused
                    ]}/>
            
                <TextInput
                    placeholder="Telefonszám"
                    placeholderTextColor="#666666"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    onFocus={() => setIsFocused({...isFocused, phone: true})}
                    onBlur={() => setIsFocused({...isFocused, phone: false})}
                    style={[
                        contactStyle.input,
                        isFocused.phone && contactStyle.inputFocused
                    ]}/>

                <View style={contactStyle.buttonRow}>
                <TouchableOpacity 
                    style={contactStyle.saveButton}
                    onPress={handleSave}
                >
                    <Text style={contactStyle.buttonText}>Mentés</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={contactStyle.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={contactStyle.buttonText}>Mégse</Text>
                </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}