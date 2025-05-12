import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Share,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetailScreen = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const { width } = Dimensions.get('window');
  const height = width * 0.8;


  const {item} = route.params || {};
  const isInCart = cart.some(item => item?.asin === item?.asin);
  console.log(item);

  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 5000);
  };

  const getPriceNumber = (priceStr) => {
    return parseInt(priceStr?.replace(/[^0-9]/g, '') || 0);
  };
  
  const numericPrice = typeof item.price === 'string' ? getPriceNumber(item.price) : item.price;
  

 
  // const getPriceNumber = (priceStr) => {
  //   try {
  //     return parseInt(priceStr?.replace(/[^0-9]/g, '') || 0);
  //   } catch {
  //     return 0;
  //   }
  // };

  const calculateDiscount = () => {
    try {
      const original = getPriceNumber(item?.originalPrice);
      const current = getPriceNumber(item?.price);
      if (original > current && current > 0) {
        return Math.round(((original - current) / original) * 100);
      }
      return 0;
    } catch {
      return 0;
    }
  };

  const discountPercentage = calculateDiscount();

  //Handlers with error prevention
  const handleAddToCart = () => {
    try {
      if (item?.asin) {
        dispatch(addToCart(item));
        Alert.alert('Added to Cart', `${item?.title || 'Item'} added to cart`);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not add to cart');
    }
  };

  

  const handleBuyNow = () => {
    try {
      if (!isInCart && item?.asin) {
        dispatch(addToCart(item));
      }
      

      const numericPrice = getPriceNumber(item?.price);

     
      const itemWithNumericPrice = {
        ...item,
        price: numericPrice,
      };
  
      navigation.navigate('ConfirmationScreen', { item: itemWithNumericPrice });


    } catch (error) {
      Alert.alert('Error', 'Could not proceed to checkout');
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out ${item?.title || 'this product'}: ${item?.price || ''}\n${item?.url || ''}`,
      });
    } catch (error) {
      console.log('Sharing error:', error);
    }
  };

  
  const renderPrice = () => {
    if (!item?.price) return null;
    return (
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        {item?.originalPrice && (
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        )}
      </View>
    );
  };

  const renderRating = () => {
    if (!item?.starRating || !item?.numRatings) return null;
    return (
      <Text style={styles.rating}>
        ⭐ {item.starRating} ({item.numRatings} ratings)
      </Text>
    );
  };

  const renderBadges = () => {
    return (
      <View style={styles.badgeContainer}>
        {item?.isPrime && (
          <Text style={styles.primeBadge}>✅ Prime Eligible</Text>
        )}
        {item?.isBestSeller && (
          <Text style={styles.bestSellerBadge}>🔥 Best Seller</Text>
        )}
      </View>
    );
  };

  const renderImage = () => {
    if (!item?.image) {
      return (
        <View style={[styles.imagePlaceholder, { width, height }]}>
          <Text>No Image Available</Text>
        </View>
      );
    }
    return (
      <Image
        source={{ uri: item.image }}
        style={[styles.productImage, { width, height }]}
        resizeMode="contain"
        onError={() => console.log('Image load error')}
      />
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchHeader}>
        <Pressable style={styles.searchBox}>
          <AntDesign name="search1" size={22} color="black" style={styles.searchIcon} />
          <Text style={styles.searchText}>Search Amazon.in</Text>
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={styles.imageContainer}>
        {renderImage()}
        <View style={styles.imageOverlay}>
          {discountPercentage > 0 && (
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{discountPercentage}% off</Text>
            </View>
          )}
          <Pressable style={styles.shareButton} onPress={onShare}>
            <MaterialCommunityIcons name="share-variant" size={24} color="black" />
          </Pressable>
        </View>
      </View>

    
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item?.title || 'Product Title Not Available'}
        </Text>
        
        {renderPrice()}
        {renderRating()}
        {renderBadges()}

        {item?.salesVolume && (
          <Text style={styles.salesVolume}>{item.salesVolume}</Text>
        )}

        {item?.delivery && (
          <Text style={styles.delivery}>{item.delivery}</Text>
        )}

        <View style={styles.separator} />

        <Pressable
          onPress={() => addItemToCart(route?.params?.item)}
          style={[
            styles.actionButton, 
            styles.addToCartButton, 
            isInCart && styles.addedToCart
          ]}
          disabled={isInCart}>
          <Text style={styles.buttonText}>
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleBuyNow}
          style={[styles.actionButton, styles.buyNowButton]}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  searchIcon: {
    paddingLeft: 10,
  },
  searchText: {
    paddingLeft: 10,
  },
  imageContainer: {
    position: 'relative',
    marginTop: 10,
    alignItems: 'center',
  },
  productImage: {
    alignSelf: 'center',
  },
  imagePlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  discountTag: {
    backgroundColor: '#C60C30',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  shareButton: {
    backgroundColor: '#E0E0E0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 15,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B12704',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  rating: {
    fontSize: 16,
    color: '#007185',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 8,
  },
  primeBadge: {
    color: '#067D62',
  },
  bestSellerBadge: {
    color: '#CC0C39',
  },
  salesVolume: {
    color: '#565959',
    marginBottom: 8,
  },
  delivery: {
    color: '#067D62',
    marginBottom: 15,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#0F1111',
  },
  noInfoText: {
    fontStyle: 'italic',
    color: '#565959',
  },
  actionButton: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  addToCartButton: {
    backgroundColor: '#FFD814',
  },
  buyNowButton: {
    backgroundColor: '#FFA41C',
  },
  addedToCart: {
    backgroundColor: '#C7C7C7',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProductDetailScreen;