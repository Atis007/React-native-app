import React, { useState } from 'react';
import { Text, Button, View, ScrollView, TouchableOpacity } from 'react-native';
import { contactStyle } from '../style/contact.style';

export default function ContactScreen({navigation, route}) {
    const [ contact, setContact ] = useState([
        { id: 1, name: 'Kiss Miska', phone: '024655201' },
    ]);
    const addContact = (newContact) => {
        const contactWithId = {
            ...newContact,        // szétoszja a newContact osszes tulajdonsagat
            id: contacts.length + 1   // hozzaadja az uj id tulajdonságot
        };
        setContacts([...contacts, contactWithId]);
    };

    React.useEffect(() => {
        if (route.params?.newContact) {
            const { name, phone } = route.params.newContact;
            setContact(prevContacts => [
                ...prevContacts,
                {
                    id: prevContacts.length + 1,
                    name: name,
                    phone: phone
                }
            ]);
            navigation.setParams({ newContact: undefined });
        }
    }, [route.params?.newContact]);

    return(
        <View style={contactStyle.container}>
            <Text style={contactStyle.title}>Lista</Text>

            <ScrollView style={contactStyle.scrollView}>
                {contact.map((contact) => (
                    <TouchableOpacity 
                    key={contact.id} 
                    style={contactStyle.contactItem}
                    onPress={() => navigation.navigate('Adatok', {
                        name: contact.name,
                        phone: contact.phone
                    })}
                >
                    <Text style={contactStyle.contactName}>{contact.name}</Text>
                </TouchableOpacity>
                ))}
                <TouchableOpacity 
                    style={contactStyle.addButton}
                    onPress={() => navigation.navigate('Hozzáad')}>
                    <Text style={contactStyle.addButtonText}>Új névjegy hozzáadása</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}