import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, { useLayoutEffect, useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


import axios from 'axios';
import { UserType } from '../UserContext';

import config from '../src/config.js';
import UserProfile from '../components/UserProfile.js';
import GuestProfile from '../components/GuestProfile.js';



const Profile = () => {
  const [orders, setOrders] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1',
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: 'contain' }}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name='notifications-outline' size={24} color='black' />

          <AntDesign name='search1' size={24} color='black' />
        </View>
      ),
    });
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/profile/${userId}`);
        const { user } = response.data;
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
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);
  if (userId) {
    return (
      <UserProfile/> 
      
    );
  } else {
    return (
      <GuestProfile/>
      
    );
  }
};

export default Profile;
const styles = StyleSheet.create({});
