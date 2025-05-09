import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import { addToCart } from '../redux/CartReducer';
import { useSelector, useDispatch } from 'react-redux';

const CategoryProductsScreen = ({ route }) => {
  const { query } = route.params;
  const [addedToCart, setAddedToCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [addedProductId, setAddedProductId] = useState(null);

  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedProductId(item.id);
    dispatch(addToCart(item));

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const [userType, setUserType] = useState('');

  useEffect(() => {
    const getUserType = async () => {
      const type = await AsyncStorage.getItem('userType');
      setUserType(type);
    };
    getUserType();
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://real-time-amazon-data.p.rapidapi.com/search',
          {
            params: {
              query: query,
              page: '1',
              country: 'US',
            },
            headers: {
              'x-rapidapi-key': 'd53e16b26fmshb0c79e088cd8997p19fe19jsn1f080e78740b',
              'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
            },
          }
        );

        setProducts(response.data?.data?.products || []);
      } catch (error) {
        console.error(
          'Error fetching products:',
          error.response?.data || error.message
        );
      }
    };

    fetchProducts();
  }, [query]);

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.product_photo }} style={styles.productImage} />
      <Text style={styles.title}>{item.product_title}</Text>
      <Text style={styles.price}>{item.product_price}</Text>

      <Pressable
        onPress={() =>{
          if (userType === 'guest') {
            Alert.alert(
              'Guest Access',
              'You need to log in to add items to your cart.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Login', onPress: () => navigation.navigate('Login') },
              ]
            );
            return;
          }
          
          addItemToCart({
            id: item.asin,
            title: item.product_title,
            price: parseFloat(item.product_price.replace(/[^0-9.]/g, '')) || 0,
            image: item.product_photo,
            quantity: 1,
          })
        }}
        style={[
          styles.cartButton,
          userType === 'guest' && { backgroundColor: '#ccc' },
        ]}
      >
        <Text style={styles.cartButtonText}>
          {addedProductId === item.asin ? 'Added to Cart' : 'Add to Cart'}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.asin}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  productCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#febe10',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CategoryProductsScreen;
