import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Header  from '../components/header';
import StartGame from '../screens/startGame';
import GameScreen from '../screens/gameScreen';
import GameOver from '../screens/gameOver';

export default function Page({title}) {
  const [userNumber, setUserNumber]=useState();
 const newGameHandler =()=>{
  setGuessRounds(0);
  setUserNumber(null);
 }

  const startGameHandler=(selectedNumber)=> {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }
  const [guessRounds, setGuessRounds]=useState(0);
  const gameOverHandler =(numberOfRounds)=>{setGuessRounds(numberOfRounds);}

  let content = <StartGame onStart={startGameHandler}/>;
  if(userNumber && guessRounds<=0)
  {
    console.log("indexben", userNumber);
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  }
  else if(guessRounds>0)
    content=<GameOver userNumber={userNumber} roundsNumber={guessRounds} onRestart={newGameHandler}/>

  return (
      <View style={styles.container}>
        <Header title={"Találd ki - játék"} />
        {content}
      </View>
  );
}

const styles = StyleSheet.create({
 container:{
  flex: 1,
 }
});
