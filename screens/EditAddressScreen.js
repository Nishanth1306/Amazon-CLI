import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../src/config';
import { UserType } from '../UserContext';

const EditAddressScreen = () => {
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const route = useRoute();
  const { address } = route.params; 

  const [name, setName] = useState(address.name || '');
  const [mobileNo, setMobileNo] = useState(address.mobileNo || '');
  const [houseNo, setHouseNo] = useState(address.houseNo || '');
  const [landmark, setLandmark] = useState(address.landmark || '');
  const [street, setStreet] = useState(address.street || '');
  const [city, setCity] = useState(address.city || '');
  const [postalCode, setPostalCode] = useState(address.postalCode || '');

  const handleUpdateAddress = async () => {
    if (!name || !mobileNo || !houseNo || !street || !postalCode) {
      Alert.alert('Validation', 'Please fill all required fields.');
      return;
    }

    try {
      const payload = {
        name,
        mobileNo,
        houseNo,
        landmark,
        street,
        city,
        postalCode,
      };
      await axios.put(`${config.API_URL}/addresses/${address._id}`, payload);
      Alert.alert('Success', 'Address updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating address:', error);
      Alert.alert('Error', 'Failed to update address');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile No"
        value={mobileNo}
        keyboardType="phone-pad"
        onChangeText={setMobileNo}
      />

      <TextInput
        style={styles.input}
        placeholder="House No"
        value={houseNo}
        onChangeText={setHouseNo}
      />

      <TextInput
        style={styles.input}
        placeholder="Landmark"
        value={landmark}
        onChangeText={setLandmark}
      />

      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        keyboardType="number-pad"
        onChangeText={setPostalCode}
      />

      <Pressable style={styles.button} onPress={handleUpdateAddress}>
        <Text style={styles.buttonText}>Update Address</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#00CED1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});

export default EditAddressScreen;
