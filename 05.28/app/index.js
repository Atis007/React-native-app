import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Page() {
  const tovabbitottAdat = { reggeli: 'burek', ar: 200};
  return (
    <Link href={{
      pathname: '/masodik', params:tovabbitottAdat}}>
        Adatokat kuldunk
    </Link>
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
