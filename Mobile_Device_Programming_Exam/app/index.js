import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Home from '../screens/homeScreen';
import Detail from '../screens/detailScreen';
import About from '../screens/aboutMeScreen';
import { styles, COLORS, FONTS } from '../style/style';

export default function Page() {
//const [imgReady,      setImgReady]      = useState(false);
const [selectedHouse, setSelectedHouse] = useState(null);
const [showAbout,     setShowAbout]     = useState(false);

const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });
  if(!fontsLoaded) return <ActivityIndicator style={styles.center} />;

  //if(!imgReady) return <ActivityIndicator style={styles.center}/>; 

  let content;
  if (selectedHouse) {
    content = (<Detail house={selectedHouse} onBack={() => { setSelectedHouse(null);}}/>);
  } else if (showAbout){ 
    content = <About onBack={() => setShowAbout(false)} />;
  } else {
    content = (<Home onSelectHouse={setSelectedHouse} onShowAbout={() => setShowAbout(true)} />);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top','bottom', 'left', 'right']}>
        {content}
      </SafeAreaView>
    </SafeAreaProvider>
    );
}