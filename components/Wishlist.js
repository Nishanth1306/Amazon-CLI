import React, {useEffect, useState} from 'react';
import { View,Text,FlatList,Image,StyleSheet,ActivityIndicator,Pressable ,Alert} from 'react-native';
import axios from 'axios';
import config from '../src/config';
import {UserType} from '../UserContext';
import {useContext} from 'react';
import {addToCart} from '../redux/CartReducer';
import {useDispatch } from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';



const Wishlist = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId, setUserId} = useContext(UserType);
  const dispatch = useDispatch();

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/user/${userId}/wishlist`,
      );
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${config.API_URL}/user/${userId}/wishlist/${productId}`);
      setWishlist(prev => prev.filter(item => item.id !== productId)); 
      Alert.alert('Success', 'Item removed from wishlist');
    } catch (error) {
      console.error('Error removing item from wishlist:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to remove item from wishlist');
    }
  };
  

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };

  // const renderItem = ({item}) => (
  //   <View style={styles.card}>
  //     <Image source={{uri: item.image}} style={styles.image} />
  //     <View style={{flex: 1, marginLeft: 10}}>
  //       <Text style={styles.title}>{item.name}</Text>
  //       <Text style={styles.description}>Size: {item.description}</Text>
  //       <Text style={styles.color}>Color: {item.color}</Text>
  //       <Text style={styles.price}>₹{item.price}</Text>
  //       <Pressable
  //         onPress={() => addItemToCart(item)}
  //         style={styles.cartButton}>
  //         <Text>{addedToCart ? 'Added to Cart' : 'Add to Cart'}</Text>
  //       </Pressable>

  //       <Pressable
  //         onPress={() => navigation.navigate('ConfirmationScreen')}
  //         style={styles.buyNowButton}>
  //         <Text>Buy Now</Text>
  //       </Pressable>
  //       <Pressable
  //       onPress={() => removeFromWishlist(item.id)}
  //       style={styles.deleteButton}>
  //       <Text style={{ color: 'white' }}>Delete</Text>
  //     </Pressable>
  //     </View>
  //   </View>
  // );
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>Size: {item.description}</Text>
        <Text style={styles.color}>Color: {item.color}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
  
        <View style={styles.buttonRow}>
          <Pressable onPress={() => addItemToCart(item)} style={styles.cartButton}>
            <Text style={styles.buttonText}>{addedToCart ? 'Added' : 'Cart'}</Text>
          </Pressable>
  
          <Pressable onPress={() => navigation.navigate('ConfirmationScreen')} style={styles.buyNowButton}>
            <Text style={styles.buttonText}>Buy</Text>
          </Pressable>
  
          <Pressable onPress={() => removeFromWishlist(item.id)} style={styles.deleteButton}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
  

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00CED1" />
      </View>
    );
  }

  return (
    <FlatList
      data={wishlist}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{padding: 10}}
    />
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  color: {
    fontSize: 14,
    marginTop: 2,
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#FFC72C',
    paddingVertical: 6,
    paddingHorizontal: 20, 
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6, 
    marginVertical: 6,
  },
  buyNowButton: {
    backgroundColor: '#FFAC1C',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 12,
  },
  
  
});
