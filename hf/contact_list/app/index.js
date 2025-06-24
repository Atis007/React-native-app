import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactScreen from './screens/Contact/contact.screen';
import DataScreen from './screens/Data/data.screen';
import NewContactScreen from './screens/NewContact/newcontact.screen';
const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <Stack.Navigator initialRouteName='Kapcsolatok'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000'
        },
        headerTintColor: '#FFFFFF',

        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        contentStyle: {
          backgroundColor: '#000000'
        },
      }}
      >
      <Stack.Screen name="Kapcsolatok" component={ContactScreen} />
      <Stack.Screen name="Adatok" component={DataScreen} />
      <Stack.Screen name="Hozzáad" component={NewContactScreen}/>
    </Stack.Navigator>
  );
}
