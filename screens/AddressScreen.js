import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import config from '../src/config.js';
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    mobileNo: "",
    houseNo: "",
    street: "",
    landmark: "",
    city:"",
    postalCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwt_decode(token);
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return false;
    }
    if (!form.mobileNo.trim() || !/^\d{10}$/.test(form.mobileNo)) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!form.houseNo.trim()) {
      Alert.alert("Error", "Please enter your house number");
      return false;
    }
    if (!form.postalCode.trim()) {
      Alert.alert("Error", "Please enter your postal code");
      return false;
    }
    return true;
  };

  const handleAddAddress = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await axios.post(`${config.API_URL}/addresses`, {
        userId,
        address: form
      });
      
      Alert.alert("Success", "Address added successfully");
      setForm({
        name: "",
        mobileNo: "",
        houseNo: "",
        street: "",
        landmark: "",
        city:"",
        postalCode: ""
      });
      
      setTimeout(() => navigation.goBack(), 500);
    } catch (error) {
      console.error("Error adding address:", error);
      Alert.alert("Error", "Failed to add address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Add a new Address</Text>

        <TextInput
          placeholderTextColor="#666"
          placeholder="India"
          style={styles.input}
          editable={false}
        />

        {Object.entries({
          name: "Full name (First and last name)",
          mobileNo: "Mobile number",
          houseNo: "Flat, House No, Building, Company",
          street: "Area, Street, sector, village",
          landmark: "Landmark (Eg near appollo hospital)",
          city:"Enter your city",
          postalCode: "Pincode"
        }).map(([key, label]) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              value={form[key]}
              onChangeText={(text) => handleChange(key, text)}
              placeholderTextColor="#666"
              style={styles.input}
              placeholder={key === 'landmark' ? "Eg near appollo hospital" : ""}
              keyboardType={key === 'mobileNo' || key === 'postalCode' ? 'numeric' : 'default'}
            />
          </View>
        ))}

        <Pressable
          onPress={handleAddAddress}
          style={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Add Address</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    height: 40,
    backgroundColor: "#00CED1",
  },
  formContainer: {
    padding: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  submitButton: {
    backgroundColor: "#FFC72C",
    padding: 15,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontWeight: "bold",
    color: '#000',
  },
});

export default AddressScreen;