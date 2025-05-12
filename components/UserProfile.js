import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {UserType} from '../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import config from '../src/config.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [profileResponse, ordersResponse] = await Promise.all([
        axios.get(`${config.API_URL}/profile/${userId}`),
        axios.get(`${config.API_URL}/orders/${userId}`)
      ]);
      
      setUser(profileResponse.data.user);
      setOrders(ordersResponse.data.orders || []);
    } catch (error) {
      console.log('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: logout,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setUserId(null);
      navigation.replace('Login');
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const renderOrderItems = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9900" />
        </View>
      );
    }

    if (orders.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="remove-shopping-cart" size={50} color="#CCCCCC" />
          <Text style={styles.emptyText}>No orders found</Text>
          <Pressable 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ordersContainer}
      >
        {orders.map(order => (
          <Pressable
            key={order._id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', { orderId: order._id })}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderDate}>
                {new Date(order.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.orderStatus}>
                {order.status || 'Processing'}
              </Text>
            </View>
            
            {order.products.slice(0, 2).map(product => (
              <View style={styles.productItem} key={product._id}>
                <Image
                  source={{uri: product.image}}
                  style={styles.productImage}
                />
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
              </View>
            ))}
            
            {order.products.length > 2 && (
              <Text style={styles.moreItemsText}>
                +{order.products.length - 2} more items
              </Text>
            )}
            
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>Total: ₹{order.totalPrice}</Text>
              <AntDesign name="right" size={16} color="#666" />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome {user?.name || 'User'}!
          </Text>
          <Text style={styles.emailText}>{user?.email || ''}</Text>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => navigation.navigate('UserOrders')}
            style={styles.actionButton}
          >
            <MaterialIcons name="list-alt" size={24} color="#FF9900" />
            <Text style={styles.buttonText}>Your Orders</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('UserAccount')}
            style={styles.actionButton}
          >
            <MaterialIcons name="account-circle" size={24} color="#FF9900" />
            <Text style={styles.buttonText}>Your Account</Text>
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={() => navigation.navigate('Cart')}
            style={styles.actionButton}
          >
            <AntDesign name="heart" size={24} color="#FF9900" />
            <Text style={styles.buttonText}>Wishlist</Text>
          </Pressable>

          <Pressable
            onPress={handleLogout}
            style={styles.actionButton}
          >
            <MaterialIcons name="logout" size={24} color="#FF9900" />
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {renderOrderItems()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F1111',
  },
  emailText: {
    fontSize: 16,
    color: '#565959',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F1111',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#0F1111',
  },
  ordersContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    width: 220,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    marginRight: 15,
    backgroundColor: 'white',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    color: '#565959',
  },
  orderStatus: {
    fontSize: 14,
    color: '#067D62',
    fontWeight: '500',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    color: '#0F1111',
  },
  moreItemsText: {
    fontSize: 12,
    color: '#565959',
    marginLeft: 60,
    marginBottom: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
    marginTop: 5,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F1111',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#565959',
    marginTop: 15,
    marginBottom: 25,
  },
  shopButton: {
    backgroundColor: '#FFD814',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F1111',
  },
});

export default UserProfile;