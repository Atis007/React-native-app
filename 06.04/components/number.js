import { StyleSheet, View, Text } from "react-native";
import Colors from '../constants/colors';

export default function Number(props) {
    //console.log("number: ", props);
    const myString=String(props.children);
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{myString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 3,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        color: Colors.secondary_text,
        fontSize: 24
    }
});