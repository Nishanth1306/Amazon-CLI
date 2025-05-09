// UserAccountScreen.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import config from "../src/config";

const UserAccountScreen = () => {
  const { userId } = useContext(UserType);
  const [user, setUser] = useState(null);
  
  



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/profile/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Details</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <Text style={styles.addressTitle}>Saved Addresses</Text>
      {user.addresses?.map((address, index) => (
        <View key={index} style={styles.addressBox}>
          <Text>{address.name}, {address.street},</Text>
          <Text>{address.city}, {address.state} - {address.postalCode}</Text>
          <Text>{address.country}</Text>
          <Text>Phone: {address.phone}</Text>
        
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailBox: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },
  addressBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default UserAccountScreen;
