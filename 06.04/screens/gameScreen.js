import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { useState, useRef, useEffect } from "react";
import Card from '../components/card';
import Number from '../components/number';

const generateRandomNumberBetween=(min, max, exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const rndNumber=Math.floor(Math.random() * (max-min)) + min;
    if(rndNumber===exclude)
    {
        return generateRandomNumberBetween(min, max, exclude);
    }
    return rndNumber;
}

export default function Page(props) {
    const currentHigh=useRef(100);
    const currentLow=useRef(1);
    const {userChoice, onGameOver} = props;
    const [currentGuess, setCurrentGuess]=useState(generateRandomNumberBetween(1, 100, props.userChoice));
    const [rounds, setRounds]=useState(0);
    useEffect(()=>{
        if(currentGuess===props.userChoice){
            props.onGameOver(rounds);
        }
    },[currentGuess, userChoice, onGameOver]);
const nextGuessHandler=(direction)=>{
    if((direction==='kisebb' && currentGuess<props.userChoice) || 
       (direction==='nagyobb' && currentGuess>props.userChoice))
       {
            Alert.alert("Nem jo valasz!",
                "Csalni probalsz?",
                [{text: "Vissza", style: "cancel"}]
            );
            return;
       }
    if(direction==='kisebb')
    {
        currentHigh.current=currentGuess;
    }
    else
    {
        currentLow.current=currentGuess
    }
    const nextNumber = generateRandomNumberBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(currentRounds=>currentRounds+1);

    console.log("gamescreenben usere: ", props.userChoice);
    console.log("gamescreenben gep tippje: ", nextNumber);
    console.log("gamescreenben min: ", currentLow.current);
    console.log("gamescreenben max: ", currentHigh.current);
}
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Ellenfel tippje:</Text>
        <Number>{currentGuess}</Number>
        <Card style={styles.button_container}>
            <Button title="Kisebb" onPress={nextGuessHandler.bind(this, "kisebb")}/>
            <Button title="Nagyobb" onPress={nextGuessHandler.bind(this, "nagyobb")}/>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        padding: 10
    },
    button_container:{
        flexDirection:'row',
        width: '65%',
        justifyContent: 'space-around',
        alignItems: "center",
        marginTop: 5
    },
    text:{
        fontSize:26,
        marginHorizontal:10,
        textAlign: "center",
        marginVertical: 10
    },
});