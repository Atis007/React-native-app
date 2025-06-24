import { StyleSheet, Text, View, Button, TextInput, Touchable, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useState } from "react";
import Card from '../components/card';
import Colors from '../constants/colors';
import InputText from '../components/input';
import Number from '../components/number';

export default function Page(props) {
    const[enteredValue, setEnteredValue]=useState('');
    const[confirm, setConfirm]=useState(false);
    const[selectedNumber, setSelectedNumber]=useState();

    const numberInputHandle = (input)=>{
      console.log("inputHandler", input);
      setEnteredValue(input.replace(/[^0-9]/g, ''));
    }
    const resetInputHandle = ()=>{
      setEnteredValue('');
      setConfirm(false);
    }
    const confirmInputHandle = ()=>{
      const choosenNumber = parseInt(enteredValue);
      if(isNaN(choosenNumber) || choosenNumber<=0 || choosenNumber>99)
      {
        Alert.alert("Hibas ertek!",
          "Szamot kerek 1 es 99 kozott!",
          [{text: "OKE", style: "destructive", onPress: resetInputHandle()}]);
      }
      setConfirm(true);
      setSelectedNumber(choosenNumber);
      setEnteredValue('');
      Keyboard.dismiss();
    }
    let confirmedOutput;  //nincs definialva
    if(confirm)
      confirmedOutput=(
      <Card style={styles.choosenNumber}>
        <Number>{selectedNumber}</Number>
        <Button title="Start game" onPress={()=>props.onStart(selectedNumber)}></Button>
      </Card>);
  console.log("Startgameben",props);

      return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
      <View style={styles.container}>
        <Card style={styles.inputText}>
        <Text style={styles.title}>Új játék kezdése</Text>
        
              <InputText style={styles.inputText}
                  maxLength={2}
                  keyboardType='numeric'
                  onChangeText={numberInputHandle}
                  value={enteredValue}
              />

              <View style={styles.buttonContainer}>
                  <Button title="Törlés" onPress={resetInputHandle} color={Colors.primary}/>
                  <Button title="Mehet" onPress={confirmInputHandle} color={Colors.accent}/>
              </View>
          </Card>
          {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginHorizontal:10,
    },
    inputText:{
        width:300,
        maxWidth:'80%',
        textAlign: "center",
        marginTop: 20
        
    },
    buttonContainer:{
        flexDirection:'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal:10,
        marginTop: 3
    },
    choosenNumber:{
      marginTop: 20,
      alignItems: "center",
    }
});
