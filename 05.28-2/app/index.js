import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/home.screen';
import AboutScreen from './screens/About/about.screen';
const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <Stack.Navigator initialRouteName='home'>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="about" component={AboutScreen} />
    </Stack.Navigator>
  );
}