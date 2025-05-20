import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState,useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  cleanCart
} from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
import Wishlist from '../components/Wishlist';
import { addToWish } from '../redux/WishReducer.js';
import axios from 'axios';

import {UserType} from '../UserContext';
import config from '../src/config.js';


const CartScreen = () => {
  const {userId, setUserId} = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        let price = 0;

        if (typeof item.price === 'string') {
          price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        } else if (typeof item.price === 'number') {
          price = item.price;
        }

        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const total = calculateTotal();

  const handleIncreaseQuantity = (item) => {
    if (item.quantity < 10) {
      dispatch(incrementQuantity(item));
    } else {
      Alert.alert('Maximum quantity reached', 'You can add up to 10 of this item');
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item));
    }
  };

  const handleRemoveItem = (item) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => dispatch(removeFromCart(item)),
          style: 'destructive',
        },
      ]
    );
  };

  const handleProceedToBuy = () => {
    if (cart.length === 0) {
      Alert.alert('Your cart is empty', 'Please add items to your cart before proceeding');
      return;
    }
    navigation.navigate('ConfirmationScreen');
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: () => dispatch(cleanCart()),
          style: 'destructive',
        },
      ]
    );
  };

  const handleSaveForLater = async (item) => {
  try {
    setLoading(true);
    dispatch(addToWish(item));
    dispatch(removeFromCart(item));
    const response = await axios.post(`${config.API_URL}/user/${userId}/wishlist`, {
      name: item.title || item.name || 'No Title',
      id: item.id,
      description: item.size || '',
      price: item.price,
      color: item.color || '',
      image: item.carouselImages?.[0] || item.image || '',
    });

    console.log('Item saved to wishlist:', response.data);
  } catch (error) {
    console.error('Error saving item:', error.response?.data || error.message);
    dispatch(removeFromWish(item.id));
    dispatch(addToCart(item)); 
    Alert.alert('Error', 'Failed to move product. Please try again.');
  } finally {
    setLoading(false);
  }
};
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBar}>
          <View style={styles.searchInput}>
            <AntDesign name="search1" size={20} color="#666" />
            <TextInput
              placeholder="Search Amazon.in"
              style={styles.searchTextInput}
              placeholderTextColor="#666"
            />
          </View>
          <Pressable style={styles.micButton}>
            <Entypo name="mic" size={20} color="black" />
          </Pressable>
        </View>


        <View style={styles.priceSummary}>
          <Text style={styles.priceText}>
            Subtotal ({cart.length} items):
            <Text style={styles.priceAmount}> ₹{total}</Text>
          </Text>
          <Text style={styles.emiText}>EMI options available</Text>
        </View>


        <Pressable
          onPress={handleProceedToBuy}
          style={[styles.actionButton, styles.proceedButton]}
        >
          <Text style={styles.actionButtonText}>Proceed to Buy</Text>
        </Pressable>

        {cart.length > 0 && (
          <Pressable
            onPress={handleClearCart}
            style={[styles.actionButton, styles.clearCartButton]}
          >
            <Text style={styles.actionButtonText}>Clear Cart</Text>
          </Pressable>
        )}

        <View style={styles.divider} />


        {cart.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <MaterialIcons name="remove-shopping-cart" size={60} color="#ccc" />
            <Text style={styles.emptyCartText}>Your Amazon Cart is empty</Text>
            <Pressable
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopButtonText}>Shop today's deals</Text>
            </Pressable>
          </View>
        ) : (
          cart.map((item, index) => (
            <View key={`${item.id}_${index}`} style={styles.cartItemContainer}>

              <View style={styles.productInfo}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {item.title || item.name}
                  </Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Text style={styles.inStock}>In Stock</Text>
                  <Text style={styles.deliveryText}>FREE delivery</Text>
                </View>
              </View>


              <View style={styles.quantityContainer}>
                <View style={styles.quantityControls}>
                  {item.quantity > 1 ? (
                    <Pressable
                      onPress={() => handleDecreaseQuantity(item)}
                      style={styles.quantityButton}
                    >
                      <AntDesign name="minus" size={16} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => handleRemoveItem(item)}
                      style={styles.quantityButton}
                    >
                      <AntDesign name="delete" size={16} color="black" />
                    </Pressable>
                  )}

                  <View style={styles.quantityDisplay}>
                    <Text>{item.quantity}</Text>
                  </View>

                  <Pressable
                    onPress={() => handleIncreaseQuantity(item)}
                    style={styles.quantityButton}
                  >
                    <AntDesign name="plus" size={16} color="black" />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => handleRemoveItem(item)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>


              <View style={styles.optionsContainer}>
                <Pressable
                  onPress={() => handleSaveForLater(item)}
                  style={styles.optionButton}
                >
                  <Text style={styles.optionButtonText}>Save for later</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Text style={styles.optionButtonText}>See more like this</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
        <>
          <Text style={styles.sectionTitle}>Your Wishlist</Text>
          <Wishlist />
        </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00CED1',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  searchTextInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  micButton: {
    padding: 8,
  },
  priceSummary: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  priceText: {
    fontSize: 18,
    color: '#0F1111',
  },
  priceAmount: {
    fontWeight: 'bold',
  },
  emiText: {
    fontSize: 14,
    color: '#067D62',
    marginTop: 4,
  },
  actionButton: {
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButton: {
    backgroundColor: '#FFD814',
  },
  clearCartButton: {
    backgroundColor: '#f0c14b',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 8,
    backgroundColor: '#f3f3f3',
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyCartText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
    color: '#0F1111',
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
  },
  cartItemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImage: {
    width: 120,
    height: 120,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#0F1111',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#B12704',
  },
  inStock: {
    color: '#067D62',
    fontSize: 14,
    marginBottom: 5,
  },
  deliveryText: {
    fontSize: 14,
    color: '#565959',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  quantityDisplay: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#0066c0',
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  optionButtonText: {
    color: '#0066c0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default CartScreen;