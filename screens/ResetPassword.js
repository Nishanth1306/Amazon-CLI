import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../src/config';

const ResetPassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const handleResetPassword = async () => {
    try {
      const res = await axios.post(`${config.API_URL}/reset-password`, {
        email,
        otp,
        newPassword,
      });
      Alert.alert("Success", res.data.message);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      <TextInput
        placeholder="Enter OTP"
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Enter New Password"
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Pressable onPress={handleResetPassword} style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </Pressable>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      marginTop: 60,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#999',
      padding: 10,
      marginBottom: 15,
      borderRadius: 6,
    },
    button: {
      backgroundColor: '#febe10',
      padding: 12,
      borderRadius: 6,
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#000',
    },
  });
  