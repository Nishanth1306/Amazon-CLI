import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../UserContext';
import config from '../src/config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { userId } = useContext(UserType);



  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.API_URL}/addresses/${userId}`);
      setAddresses(response.data.addresses || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      Alert.alert("Error", "Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [userId])
  );

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`${config.API_URL}/addresses/${userId}/${addressId}`);
      fetchAddresses();
      Alert.alert("Success", "Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
      Alert.alert("Error", "Failed to delete address");
    }
  };

  const filteredAddresses = addresses.filter(address => 
    address.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    address.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
    address.postalCode.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
     
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchInputContainer}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput 
            placeholder="Search your addresses" 
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Your Addresses</Text>

          <Pressable
            onPress={() => navigation.navigate("Add")}
            style={styles.addAddressButton}
          >
            <Text style={styles.addAddressText}>Add a new Address</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </Pressable>

          {isLoading ? (
            <ActivityIndicator size="large" color="#00CED1" style={styles.loader} />
          ) : (
          
            <View style={styles.addressList}>
              {filteredAddresses.length === 0 ? (
                <Text style={styles.noAddressText}>
                  {searchQuery ? 'No matching addresses found' : 'No addresses saved yet'}
                </Text>
              ) : (
                filteredAddresses.map((item, index) => (
                  <View key={index} style={styles.addressCard}>
                    <View style={styles.addressHeader}>
                      <Text style={styles.addressName}>{item.name}</Text>
                      <Entypo name="location-pin" size={24} color="red" />
                    </View>

                    <Text style={styles.addressText}>
                      {item.houseNo}, {item.landmark}
                    </Text>
                    <Text style={styles.addressText}>{item.street}</Text>
                    <Text style={styles.addressText}>India, {item.city} </Text>
                    <Text style={styles.addressText}>Phone: {item.mobileNo}</Text>
                    <Text style={styles.addressText}>City: {item.city}</Text>
                    <Text style={styles.addressText}>PIN: {item.postalCode}</Text>

                  
                    <View style={styles.addressActions}>
                      <Pressable
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('EditAddress', { address: item })}
                      >
                        <Text>Edit</Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() => handleDeleteAddress(item._id)}
                      >
                        <Text>Remove</Text>
                      </Pressable>

                      <Pressable
                        style={styles.actionButton}
                        onPress={() => console.log('Set as default', item._id)}
                      >
                        <Text>Set as Default</Text>
                      </Pressable>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    backgroundColor: "#00CED1",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  searchIcon: {
    paddingLeft: 10
  },
  searchInput: {
    flex: 1,
    paddingRight: 10,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  addAddressText: {
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  noAddressText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  addressList: {
    marginTop: 10,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 15,
    color: "#181818",
    marginVertical: 2,
  },
  addressActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: "#D0D0D0",
    minWidth: 80,
    alignItems: 'center',
  },
});

export default AddAddressScreen;