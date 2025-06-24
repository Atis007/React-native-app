import { StyleSheet, Text, View, TextInput  } from "react-native";
import Colors from '../constants/colors';

export default function Page(props) {
    //console.log("input: ", props);
  return (
    <TextInput style={{...styles.inputText, ...props.style}}
    keyboardType={props.keyboardType}
    maxLength={props.maxLength}
    onChangeText={props.onChangeText}
    value={props.value}/>
  );
}

const styles = StyleSheet.create({
inputText:{
    height: 50,
    width: "70%",
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.primary,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});