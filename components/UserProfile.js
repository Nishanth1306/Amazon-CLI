import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {UserType} from '../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import config from '../src/config.js';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/profile/${userId}`);
        const {user} = response.data;
        setUser(user);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };
  return (
    <ScrollView
      style={{
        marginTop: 10,
        padding: 10,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        Welcome {user?.name}!
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <Pressable
          onPress={() => navigation.navigate('UserOrders')}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Your orders</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('UserAccount')}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{textAlign: 'center'}}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d0d0d0',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={order._id}>
              {order.products.slice(0, 1)?.map(product => (
                <View style={{marginVertical: 10}} key={product._id}>
                  <Image
                    source={{uri: product.image}}
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
