import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import config from '../src/config';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = ({  }) => {
    const navigation= useNavigation();
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    axios
      .post(`${config.API_URL}/forgot-password`, { email })
      .then((response) => {
        Alert.alert(
          'Success',
          'Check your email for password reset instructions.'
        );
        navigation.navigate('ResetPassword', { email });
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Something went wrong'
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='Enter your email'
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
      />
      <Pressable onPress={handlePasswordReset} style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </Pressable>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#febe10',
    padding: 15,
    borderRadius: 6,
  },
  buttonText: { textAlign: 'center', fontWeight: 'bold' },
});
