import { StyleSheet, Text, View } from "react-native";
import Colors from '../constants/colors';
export default function Page({title}) {
    {
     //   console.log("header:", {title});
    }
  return (
    <View style={styles.header}>
        <Text style={styles.textHeader}>{title}</Text>
    </View>
 
  );
}

const styles = StyleSheet.create({
 header: {
    width: '100%',
    height: 110,
    paddingTop: 10,
    backgroundColor: Colors.primary,
    alignItems:'center',
    justifyContent:'center'
 },
textHeader:{
    color:'black',
    fontSize: 24,
}
});
