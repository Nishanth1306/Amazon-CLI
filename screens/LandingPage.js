import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          console.log("USer Found");
          navigation.replace("Home");
        } else {
          console.log("USer Not Found");
         
          setLoading(false);
        }
      } catch (error) {
        console.log("Error reading userId from AsyncStorage:", error);
        setLoading(false);
      }
    };

    checkUser();
  }, [navigation]);

  const handleSkipLogin = async () => {
    await AsyncStorage.setItem("userType", "guest");
    navigation.replace("Main");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#febe10" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome to Our App</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.skipButton]} onPress={handleSkipLogin}>
        <Text style={[styles.buttonText, { color: "#000" }]}>Skip Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 160,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#041E42",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#febe10",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  skipButton: {
    backgroundColor: "#ddd",
  },
});

export default LandingPage;

