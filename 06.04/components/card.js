import { StyleSheet, View } from "react-native";

export default function Page(props) {
    //console.log("cardban",props);
  return (
    <View style={{ ...styles.card, ...props.style }}>
        {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
 card:{

        alignItems:'center',
        elevation: 5,
        padding: 20,
        borderRadius:20,
        backgroundColor:'white'
 }
});
