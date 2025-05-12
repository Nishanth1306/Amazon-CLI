// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   Pressable,
// //   ScrollView,
// //   TextInput,
// //   Platform,
// //   SafeAreaView,
// // } from 'react-native';

// // import Entypo from 'react-native-vector-icons/Entypo';
// // import AntDesign from 'react-native-vector-icons/AntDesign';

// // import React from 'react';
// // import { useSelector,useDispatch } from 'react-redux';
// // import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
// // import { useNavigation } from '@react-navigation/native';
// // import Wishlist from '../components/Wishlist';



// // const CartScreen = () => {
// //   const cart = useSelector((state) => state.cart.cart);
// //   const total = cart
// //     .map((item) => item.price * item.quantity)
// //     .reduce((curr, prev) => curr + prev, 0);

// //     const dispatch = useDispatch();
// //     const navigation = useNavigation();

// //     const increaseQuantity = (item) => dispatch(incrementQuantity(item));  
// //     const decreaseQuantity = (item) => dispatch(decrementQuantity(item));
// //     const deleteItem = (item) => dispatch(removeFromCart(item));
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <ScrollView>
// //         <View style={styles.searchBar}>
// //           <Pressable style={styles.searchInput}>
// //             <AntDesign name='search1' size={24} color='black' />
// //             <TextInput placeholder='Search' style={styles.input} />
// //           </Pressable>
// //           <Entypo name='mic' size={24} color='black' />
// //         </View>
// //         <View
// //           style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
// //         >
// //           <Text style={{ fontSize: 18, fontWeight: '400' }}>Sub TOtal </Text>
// //           <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{total}</Text>
// //         </View>

// //         <Text style={{ marginHorizontal: 10 }}>EMI Option Available</Text>

// //         <Pressable
// //         onPress={() => navigation.navigate('ConfirmationScreen')}
// //           style={{
// //             backgroundColor: '#FFC72C',
// //             padding: 10,
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             borderRadius: 5,
// //             marginHorizontal: 10,
// //             marginTop: 10,
// //           }}
// //         >
// //           <Text>Proceed to Buy({cart.length}) items</Text>
// //         </Pressable>

// //         <Text
// //           style={{
// //             height: 1,
// //             borderColor: '#D0D0D0',
// //             borderWidth: 1,
// //             marginTop: 16,
// //           }}
// //         />

// //         <View>
// //           {cart?.map((item, index) => (
// //             <View
// //               style={{
// //                 backgroundColor: 'white',
// //                 marginVertical: 10,
// //                 borderBottomColor: '#F0F0F0',
// //                 borderWidth: 2,
// //                 borderLeftWidth: 0,
// //                 borderTopWidth: 0,
// //                 borderRightWidth: 0,
// //               }}
// //             >
// //               <Pressable
// //                 style={{
// //                   marginVertical: 10,
// //                   flexDirection: 'row',
// //                   justifyContent: 'space-between',
// //                 }}
// //               >
// //                 <View>
// //                   <Image
// //                     style={{ width: 140, height: 140, resizeMode: 'contain' }}
// //                     source={{ uri: item?.image }}
// //                   />
// //                 </View>

// //                 <View>
// //                   <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
// //                     {item?.title}
// //                   </Text>
// //                   <Text
// //                     style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}
// //                   >
// //                     {item?.price}
// //                   </Text>
// //                   <Text style={{ color: 'green' }}>In Stock</Text>
// //                 </View>
// //               </Pressable>

// //               <Pressable
// //                 style={{
// //                   marginTop: 15,
// //                   marginBottom: 20,
// //                   flexDirection: 'row',
// //                   alignItems: 'center',
// //                   gap: 10,
// //                 }}
// //               >
// //                 <View
// //                   style={{
// //                     flexDirection: 'row',
// //                     alignItems: 'center',
// //                     paddingHorizontal: 10,
// //                     paddingVertical: 5,
// //                     borderRadius: 5,
// //                   }}
// //                 >
// //                   {item?.quantity > 1 ? ( 
// //                     <Pressable
// //                     onPress={() => decreaseQuantity(item)}
// //                     style={{
// //                       backgroundColor: '#D8D8D8',
// //                       padding: 7,
// //                       borderTopLeftRadius: 6,
// //                       borderBottomLeftRadius: 6,
// //                     }}
// //                   >
// //                     <AntDesign name='minus' size={24} color='black' />
// //                   </Pressable>
// //                   ):
// //                   (
// //                     <Pressable
// //                     onPress={() => deleteItem(item)}
// //                     style={{
// //                       backgroundColor: '#D8D8D8',
// //                       padding: 7,
// //                       borderTopLeftRadius: 6,
// //                       borderBottomLeftRadius: 6,
// //                     }}
// //                   >
// //                     <AntDesign name='delete' size={24} color='black' />
// //                   </Pressable>

// //                   )}
                  

// //                   <Pressable
// //                     style={{
// //                       backgroundColor: 'white',
// //                       paddingHorizontal: 18,
// //                       paddingVertical: 6,
// //                     }}
// //                   >
// //                     <Text>{item?.quantity}</Text>
// //                   </Pressable>

// //                   <Pressable
// //                   onPress={() => increaseQuantity(item)}
// //                     style={{
// //                       backgroundColor: '#D8D8D8',
// //                       padding: 7,
// //                       borderTopRightRadius: 6,
// //                       borderBottomRightRadius: 6,
// //                     }}
// //                   >
// //                     <AntDesign name='plus' size={24} color='black' />
// //                   </Pressable>


// //                   <Pressable
// //                   onPress={() => deleteItem(item)}
// //                     style={{
// //                       backgroundColor: '#D8D8D8',
// //                       padding: 7,
// //                       borderTopLeftRadius: 6,
// //                       borderTopRightRadius: 6,
// //                       borderBottomRightRadius: 6,
// //                       borderBottomLeftRadius: 6,
// //                       marginLeft: 30,
// //                     }}
// //                   >
// //                     <Text>Delete</Text>
// //                   </Pressable>
// //                 </View>

// //               </Pressable>

// //               <Pressable
// //                 style={{
// //                   flexDirection: 'row',
// //                   alignItems: 'center',
// //                   gap: 10,
// //                   marginBottom: 10,
// //                   marginLeft: 10,
// //                 }}
// //               >
// //                 <Pressable
// //                   style={{
// //                     backgroundColor: 'white',
// //                     paddingHorizontal: 8,
// //                     paddingVertical: 10,
// //                     borderRadius: 5,
// //                     borderColor: '#C0C0C0',
// //                     borderWidth: 0.6,
// //                   }}
// //                 >
// //                   <Text>Save for Later</Text>
// //                 </Pressable>

// //                 <Pressable
// //                   style={{
// //                     backgroundColor: 'white',
// //                     paddingHorizontal: 8,
// //                     paddingVertical: 10,
// //                     borderRadius: 5,
// //                     borderColor: '#C0C0C0',
// //                     borderWidth: 0.6,
// //                   }}
// //                 >
// //                   <Text>See More Like this</Text>
// //                 </Pressable>
// //               </Pressable>
// //             </View>
// //           ))}
// //         </View>
// //         <Text style={{textAlign:"center"}}>Wishlist</Text>
// //         <Wishlist/>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default CartScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //     paddingTop: Platform.OS === 'android' ? 40 : 0,
// //   },
// //   searchBar: {
// //     backgroundColor: '#00CED1',
// //     padding: 10,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   searchInput: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginHorizontal: 7,
// //     gap: 10,
// //     backgroundColor: 'white',
// //     borderRadius: 5,
// //     height: 40,
// //     flex: 1,
// //     paddingLeft: 10,
// //   },
// // });


// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   ScrollView,
//   TextInput,
//   Platform,
// } from 'react-native';

// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
// import { useNavigation } from '@react-navigation/native';
// import Wishlist from '../components/Wishlist';

// const CartScreen = () => {
//   const cart = useSelector((state) => state.cart.cart);
//   const total = cart
//     .map((item) => {
//       return Number(item?.price?.slice(1).replace(',',"")) * item.quantity
//     }
//     )
//     .reduce((curr, prev) => curr + prev, 0);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const increaseQuantity = (item) => dispatch(incrementQuantity(item));
//   const decreaseQuantity = (item) => dispatch(decrementQuantity(item));
//   const deleteItem = (item) => dispatch(removeFromCart(item));

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView>
//         <View style={styles.searchBar}>
//           <Pressable style={styles.searchInput}>
//             <AntDesign name='search1' size={24} color='black' />
//             <TextInput placeholder='Search' style={styles.input} />
//           </Pressable>
//           <Entypo name='mic' size={24} color='black' />
//         </View>
//         <View style={styles.subtotalContainer}>
//           <Text style={styles.subtotalText}>Sub Total : </Text>
//           <Text style={styles.subtotalAmount}>{total}</Text>
//         </View>

//         <Text style={styles.emiText}>EMI Option Available</Text>

//         <Pressable
//           onPress={() => navigation.navigate('ConfirmationScreen')}
//           style={styles.proceedButton}
//         >
//           <Text>Proceed to Buy({cart.length}) items</Text>
//         </Pressable>

//         <Text style={styles.separator} />

//         <View>
//           {cart?.map((item, index) => (
//             <View style={styles.cartItemContainer} key={index}>
//               <Pressable style={styles.cartItem}>
//                 <View>
//                   <Image
//                     style={styles.cartItemImage}
//                     source={{ uri: item?.image }}
//                   />
//                 </View>

//                 <View>
//                   <Text numberOfLines={3} style={styles.cartItemTitle}>
//                     {item?.title}{item?.name}
//                   </Text>
//                   <Text style={styles.cartItemPrice}>{item?.price}</Text>
//                   <Text style={styles.inStock}>In Stock</Text>
//                 </View>
//               </Pressable>

//               <Pressable style={styles.cartActionsContainer}>
//                 <View style={styles.quantityControl}>
//                   {item?.quantity > 1 ? (
//                     <Pressable
//                       onPress={() => decreaseQuantity(item)}
//                       style={styles.decrementButton}
//                     >
//                       <AntDesign name='minus' size={24} color='black' />
//                     </Pressable>
//                   ) : (
//                     <Pressable
//                       onPress={() => deleteItem(item)}
//                       style={styles.deleteButton}
//                     >
//                       <AntDesign name='delete' size={24} color='black' />
//                     </Pressable>
//                   )}

//                   <Pressable style={styles.quantityDisplay}>
//                     <Text>{item?.quantity}</Text>
//                   </Pressable>

//                   <Pressable
//                     onPress={() => increaseQuantity(item)}
//                     style={styles.incrementButton}
//                   >
//                     <AntDesign name='plus' size={24} color='black' />
//                   </Pressable>

//                   <Pressable
//                     onPress={() => deleteItem(item)}
//                     style={styles.deleteItemButton}
//                   >
//                     <Text>Delete</Text>
//                   </Pressable>
//                 </View>
//               </Pressable>

//               <Pressable style={styles.cartOptionsContainer}>
//                 <Pressable style={styles.saveForLaterButton}>
//                   <Text>Save for Later</Text>
//                 </Pressable>

//                 <Pressable style={styles.seeMoreButton}>
//                   <Text>See More Like this</Text>
//                 </Pressable>
//               </Pressable>
//             </View>
//           ))}
//         </View>
//         <Text style={styles.wishlistTitle}>Wishlist</Text>
//         <Wishlist />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   searchBar: {
//     backgroundColor: '#00CED1',
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 7,
//     gap: 10,
//     backgroundColor: 'white',
//     borderRadius: 5,
//     height: 40,
//     flex: 1,
//     paddingLeft: 10,
//   },
//   subtotalContainer: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   subtotalText: {
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   subtotalAmount: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   emiText: {
//     marginHorizontal: 10,
//   },
//   proceedButton: {
//     backgroundColor: '#FFC72C',
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     marginHorizontal: 10,
//     marginTop: 10,
//   },
//   separator: {
//     height: 1,
//     borderColor: '#D0D0D0',
//     borderWidth: 1,
//     marginTop: 16,
//   },
//   cartItemContainer: {
//     backgroundColor: 'white',
//     marginVertical: 10,
//     borderBottomColor: '#F0F0F0',
//     borderWidth: 2,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     borderRightWidth: 0,
//   },
//   cartItem: {
//     marginVertical: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cartItemImage: {
//     width: 140,
//     height: 140,
//     resizeMode: 'contain',
//   },
//   cartItemTitle: {
//     width: 150,
//     marginTop: 10,
//   },
//   cartItemPrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 6,
//   },
//   inStock: {
//     color: 'green',
//   },
//   cartActionsContainer: {
//     marginTop: 15,
//     marginBottom: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   decrementButton: {
//     backgroundColor: '#D8D8D8',
//     padding: 7,
//     borderTopLeftRadius: 6,
//     borderBottomLeftRadius: 6,
//   },
//   incrementButton: {
//     backgroundColor: '#D8D8D8',
//     padding: 7,
//     borderTopRightRadius: 6,
//     borderBottomRightRadius: 6,
//   },
//   quantityDisplay: {
//     backgroundColor: 'white',
//     paddingHorizontal: 18,
//     paddingVertical: 6,
//   },
//   deleteButton: {
//     backgroundColor: '#D8D8D8',
//     padding: 7,
//     borderTopLeftRadius: 6,
//     borderBottomLeftRadius: 6,
//   },
//   deleteItemButton: {
//     backgroundColor: '#D8D8D8',
//     padding: 7,
//     borderTopLeftRadius: 6,
//     borderTopRightRadius: 6,
//     borderBottomRightRadius: 6,
//     borderBottomLeftRadius: 6,
//     marginLeft: 30,
//   },
//   cartOptionsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginBottom: 10,
//     marginLeft: 10,
//   },
//   saveForLaterButton: {
//     backgroundColor: 'white',
//     paddingHorizontal: 8,
//     paddingVertical: 10,
//     borderRadius: 5,
//     borderColor: '#C0C0C0',
//     borderWidth: 0.6,
//   },
//   seeMoreButton: {
//     backgroundColor: 'white',
//     paddingHorizontal: 8,
//     paddingVertical: 10,
//     borderRadius: 5,
//     borderColor: '#C0C0C0',
//     borderWidth: 0.6,
//   },
//   wishlistTitle: {
//     textAlign: 'center',
//   },
// });


import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  decrementQuantity, 
  incrementQuantity, 
  removeFromCart,
  cleanCart 
} from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
import Wishlist from '../components/Wishlist';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item?.price?.replace(/[^0-9.]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
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

  const handleSaveForLater = (item) => {
    Alert.alert('Feature coming soon', 'Save for later functionality will be added soon');
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

  
        {cart.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Your Wishlist</Text>
            <Wishlist />
          </>
        )}
      </ScrollView>
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