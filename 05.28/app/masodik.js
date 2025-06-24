import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';
import { useLocalSearchParams } from "expo-router";


export default function Page(props) {
    const params = useLocalSearchParams();

    const { reggeli, ar } = params;
  return (
    <View>
        <Text>1:{reggeli}</Text>
        <Text>2:{ar}</Text>
    <Link href='/harmadik' asChild>
        <Pressable>
            <Text>Tovabb a 3.-ra</Text>
        </Pressable>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
