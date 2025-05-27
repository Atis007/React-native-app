import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, /*Button,*/ ScrollView, TouchableOpacity, Alert, Image} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const[szoveg,setSzoveg]=useState('Hello vilag!');
  const[tetelek,setTetelek]=useState(
    [
      {kulcs:1, ertek:'tetel 1'}, //egyedi azonosito, nem pedig id, ertek
      {kulcs:2, ertek:'tetel 2'},
      {kulcs:3, ertek:'tetel 3'},
      {kulcs:4, ertek:'tetel 4'},
      {kulcs:5, ertek:'tetel 5'},
      {kulcs:10, ertek:'tetel 6'},
      {kulcs:15, ertek:'tetel 7'},
      {kulcs:20, ertek:'tetel 8'},
      {kulcs:25, ertek:'tetel 9'},
      {kulcs:50, ertek:'tetel 10'},
    ]
  );
  const categories = [
    {
      name: 'Pizza',
      icon: 'pizza',
      image: 'https://people.vts.su.ac.rs/~probi/MobilProg/kepek/pizza.jpg'
    },
    {
      name: 'Burger',
      icon: 'hamburger',
      image: 'https://people.vts.su.ac.rs/~probi/MobilProg/kepek/burger.jpeg'
    },
    {
      name: 'Sushi',
      icon: 'fish',
      image: 'https://people.vts.su.ac.rs/~probi/MobilProg/kepek/sushi.jpeg'
    },
    {
      name: 'Salata',
      icon: 'food-apple',
      image: 'https://people.vts.su.ac.rs/~probi/MobilProg/kepek/salata.jpg'
    },
    {
      name: 'Fagyi',
      icon: 'ice-cream',
      image: 'https://people.vts.su.ac.rs/~probi/MobilProg/kepek/fagyi.jpeg'
    },
    {
      name: 'Kave',
      icon: 'coffee',
      image: 'https://people.vts.su.ac.rs/~probi/MobilProg/kepek/kave.jpeg'
    },
  ];
  const handlePress=(name)=>{
    Alert.alert('Kategoria kivalasztva', 'Erre kattintottal: ' + name );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.scrollView}>
          {
            tetelek.map((i)=>{
              return(
                <View style={styles.textBody} key={i.kulcs}>
                  <Text style={styles.text}>
                    {i.ertek}
                  </Text>
                </View>
              )
            })
          }
          {
            categories.map((i,j)=>{
              return(
                <TouchableOpacity key={j} onPress={()=>handlePress(i.name)}>
                  <View style={styles.textBody}>
                    <Image source={{uri: i.image}} style={styles.image}/>
                    <Text style={styles.text}>
                      <MaterialCommunityIcons name={i.icon} size={44} color="white"/>
                      {" " + i.name + "  "}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          {/*<Button
              title='katt ide'
              onPress={()=>setSzoveg('Hello React Native!')}/>*/}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#f00',
    borderRadius: 20,
    paddingTop: 8
  },
  image:{
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 8
  },
  scrollView:{
    flex:1,
    backgroundColor: 'pink'
  },
  textBody:{
    backgroundColor: 'blue',
    margin:2
  },
  text:{
    width: '100%',
    color:"yellow",
    fontSize: 24,
    fontStyle: 'italic',
    margin: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});
