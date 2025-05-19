import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';
import {Share} from 'react-native';
import config from '../src/config.js';
import axios from 'axios';
import {UserType} from '../UserContext';
import {Animated, Easing} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addToWish, removeFromWish } from '../redux/WishReducer.js';

const ProductInfo = () => {
  const scaleAnim = useState(new Animated.Value(1))[0];
  const animateWishlist = () => {
    scaleAnim.setValue(0.7);

    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };
  const route = useRoute();
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = width;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const wishlist = useSelector(state => state.wishlist.wishlist);

  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 5000);
  };
  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    };
    fetchUser();
  }, []);

  const cart = useSelector(state => state.cart.cart);

  const onShare = async product => {
    try {
      const result = await Share.share({
        message: `Check out this product: ${product.name} - ${product.description}\n\nBuy now at: ${product.url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

 const handleAddToWishlist = async () => {
    const product = route.params;
    try {
      setLoading(true);
      if (isWishlisted) {
        await axios.delete(`${config.API_URL}/user/${userId}/wishlist/${product.id}`);
        setIsWishlisted(false);
      } 
      else {
        dispatch(addToWish(product));
        await axios.post(`${config.API_URL}/user/${userId}/wishlist`, {
          name: product.title,
          id: product.id,
          description: product.size,
          price: product.price,
          color: product.color,
          image: product.carouselImages[0],
        });
        
        
        setIsWishlisted(true);
        animateWishlist();
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  
    setLoading(false);
  };

  return (
    <ScrollView>
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.searchHeader}>
        <Pressable style={styles.searchBox}>
          <AntDesign
            style={{paddingLeft: 10}}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      </SafeAreaView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{width, height, marginTop: 25, resizeMode: 'contain'}}
            source={{uri: item}}
            key={index}>
            <View style={styles.discountShareRow}>
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>20% off</Text>
              </View>
              <View style={styles.shareButton}>
                <Pressable
                  onPress={() =>
                    onShare({
                      name: route?.params?.title,
                      description: `Price: ₹${route?.params?.price}, Size: ${route?.params?.size}, Color: ${route?.params?.color}`,
                      url: `https://amazon.com/product/${
                        route?.params?.id ||
                        route?.params?.title.replace(/\s+/g, '-')
                      }`,
                    })
                  }>
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </Pressable>
              </View>
            </View>

            <Animated.View style={[styles.heartIcon, { transform: [{ scale: scaleAnim }] }]}>
              <Pressable onPress={handleAddToWishlist} disabled={loading}>
                <AntDesign
                  name={isWishlisted ? 'heart' : 'hearto'}
                  size={24}
                  color={isWishlisted ? 'red' : 'black'}
                />
              </Pressable>
            </Animated.View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>
          {route?.params?.title}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600', marginTop: 6}}>
          ₹{route?.params?.price}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.detailRow}>
        <Text>Color: </Text>
        <Text style={styles.detailText}>{route?.params?.color}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text>Size: </Text>
        <Text style={styles.detailText}>{route?.params?.size}</Text>
      </View>

      <View style={styles.separator} />

      <View style={{padding: 10}}>
        <Text style={styles.totalText}>Total : ₹{route.params.price}</Text>
        <Text style={{color: '#00CED1'}}>
          FREE delivery Tomorrow by 3 PM. Order within 10hrs 30 mins
        </Text>

        <View style={styles.locationRow}></View>
      </View>

      <Text style={styles.inStockText}>IN Stock</Text>
      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={styles.cartButton}>
          
        <Text>{addedToCart ? 'Added to Cart' : 'Add to Cart'}</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('ConfirmationScreen',addItemToCart(route?.params?.item))}
        style={styles.buyNowButton}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  searchHeader: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  discountShareRow: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  discountTag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C60C30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginLeft: 20,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    borderColor: '#D0D0D0',
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  detailText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  locationRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    gap: 5,
  },
  inStockText: {
    color: 'green',
    marginHorizontal: 10,
    fontWeight: '500',
  },
  cartButton: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buyNowButton: {
    backgroundColor: '#FFAC1C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
