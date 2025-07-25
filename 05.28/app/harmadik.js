import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
    <Link href='/' asChild>
        <Pressable>
            <Text>Katt ide - vissza</Text>
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
