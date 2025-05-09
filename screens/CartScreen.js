// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   ScrollView,
//   TextInput,
//   Platform,
//   SafeAreaView,
// } from 'react-native';

// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import React from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
// import { useNavigation } from '@react-navigation/native';
// import Wishlist from '../components/Wishlist';



// const CartScreen = () => {
//   const cart = useSelector((state) => state.cart.cart);
//   const total = cart
//     .map((item) => item.price * item.quantity)
//     .reduce((curr, prev) => curr + prev, 0);

//     const dispatch = useDispatch();
//     const navigation = useNavigation();

//     const increaseQuantity = (item) => dispatch(incrementQuantity(item));  
//     const decreaseQuantity = (item) => dispatch(decrementQuantity(item));
//     const deleteItem = (item) => dispatch(removeFromCart(item));
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.searchBar}>
//           <Pressable style={styles.searchInput}>
//             <AntDesign name='search1' size={24} color='black' />
//             <TextInput placeholder='Search' style={styles.input} />
//           </Pressable>
//           <Entypo name='mic' size={24} color='black' />
//         </View>
//         <View
//           style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
//         >
//           <Text style={{ fontSize: 18, fontWeight: '400' }}>Sub TOtal </Text>
//           <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{total}</Text>
//         </View>

//         <Text style={{ marginHorizontal: 10 }}>EMI Option Available</Text>

//         <Pressable
//         onPress={() => navigation.navigate('ConfirmationScreen')}
//           style={{
//             backgroundColor: '#FFC72C',
//             padding: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 5,
//             marginHorizontal: 10,
//             marginTop: 10,
//           }}
//         >
//           <Text>Proceed to Buy({cart.length}) items</Text>
//         </Pressable>

//         <Text
//           style={{
//             height: 1,
//             borderColor: '#D0D0D0',
//             borderWidth: 1,
//             marginTop: 16,
//           }}
//         />

//         <View>
//           {cart?.map((item, index) => (
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 marginVertical: 10,
//                 borderBottomColor: '#F0F0F0',
//                 borderWidth: 2,
//                 borderLeftWidth: 0,
//                 borderTopWidth: 0,
//                 borderRightWidth: 0,
//               }}
//             >
//               <Pressable
//                 style={{
//                   marginVertical: 10,
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <View>
//                   <Image
//                     style={{ width: 140, height: 140, resizeMode: 'contain' }}
//                     source={{ uri: item?.image }}
//                   />
//                 </View>

//                 <View>
//                   <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
//                     {item?.title}
//                   </Text>
//                   <Text
//                     style={{ fontSize: 20, fontWeight: 'bold', marginTop: 6 }}
//                   >
//                     {item?.price}
//                   </Text>
//                   <Text style={{ color: 'green' }}>In Stock</Text>
//                 </View>
//               </Pressable>

//               <Pressable
//                 style={{
//                   marginTop: 15,
//                   marginBottom: 20,
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: 10,
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingHorizontal: 10,
//                     paddingVertical: 5,
//                     borderRadius: 5,
//                   }}
//                 >
//                   {item?.quantity > 1 ? ( 
//                     <Pressable
//                     onPress={() => decreaseQuantity(item)}
//                     style={{
//                       backgroundColor: '#D8D8D8',
//                       padding: 7,
//                       borderTopLeftRadius: 6,
//                       borderBottomLeftRadius: 6,
//                     }}
//                   >
//                     <AntDesign name='minus' size={24} color='black' />
//                   </Pressable>
//                   ):
//                   (
//                     <Pressable
//                     onPress={() => deleteItem(item)}
//                     style={{
//                       backgroundColor: '#D8D8D8',
//                       padding: 7,
//                       borderTopLeftRadius: 6,
//                       borderBottomLeftRadius: 6,
//                     }}
//                   >
//                     <AntDesign name='delete' size={24} color='black' />
//                   </Pressable>

//                   )}
                  

//                   <Pressable
//                     style={{
//                       backgroundColor: 'white',
//                       paddingHorizontal: 18,
//                       paddingVertical: 6,
//                     }}
//                   >
//                     <Text>{item?.quantity}</Text>
//                   </Pressable>

//                   <Pressable
//                   onPress={() => increaseQuantity(item)}
//                     style={{
//                       backgroundColor: '#D8D8D8',
//                       padding: 7,
//                       borderTopRightRadius: 6,
//                       borderBottomRightRadius: 6,
//                     }}
//                   >
//                     <AntDesign name='plus' size={24} color='black' />
//                   </Pressable>


//                   <Pressable
//                   onPress={() => deleteItem(item)}
//                     style={{
//                       backgroundColor: '#D8D8D8',
//                       padding: 7,
//                       borderTopLeftRadius: 6,
//                       borderTopRightRadius: 6,
//                       borderBottomRightRadius: 6,
//                       borderBottomLeftRadius: 6,
//                       marginLeft: 30,
//                     }}
//                   >
//                     <Text>Delete</Text>
//                   </Pressable>
//                 </View>

//               </Pressable>

//               <Pressable
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: 10,
//                   marginBottom: 10,
//                   marginLeft: 10,
//                 }}
//               >
//                 <Pressable
//                   style={{
//                     backgroundColor: 'white',
//                     paddingHorizontal: 8,
//                     paddingVertical: 10,
//                     borderRadius: 5,
//                     borderColor: '#C0C0C0',
//                     borderWidth: 0.6,
//                   }}
//                 >
//                   <Text>Save for Later</Text>
//                 </Pressable>

//                 <Pressable
//                   style={{
//                     backgroundColor: 'white',
//                     paddingHorizontal: 8,
//                     paddingVertical: 10,
//                     borderRadius: 5,
//                     borderColor: '#C0C0C0',
//                     borderWidth: 0.6,
//                   }}
//                 >
//                   <Text>See More Like this</Text>
//                 </Pressable>
//               </Pressable>
//             </View>
//           ))}
//         </View>
//         <Text style={{textAlign:"center"}}>Wishlist</Text>
//         <Wishlist/>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingTop: Platform.OS === 'android' ? 40 : 0,
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
// });


import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';
import Wishlist from '../components/Wishlist';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const increaseQuantity = (item) => dispatch(incrementQuantity(item));
  const decreaseQuantity = (item) => dispatch(decrementQuantity(item));
  const deleteItem = (item) => dispatch(removeFromCart(item));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <Pressable style={styles.searchInput}>
            <AntDesign name='search1' size={24} color='black' />
            <TextInput placeholder='Search' style={styles.input} />
          </Pressable>
          <Entypo name='mic' size={24} color='black' />
        </View>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalText}>Sub Total</Text>
          <Text style={styles.subtotalAmount}>{total}</Text>
        </View>

        <Text style={styles.emiText}>EMI Option Available</Text>

        <Pressable
          onPress={() => navigation.navigate('ConfirmationScreen')}
          style={styles.proceedButton}
        >
          <Text>Proceed to Buy({cart.length}) items</Text>
        </Pressable>

        <Text style={styles.separator} />

        <View>
          {cart?.map((item, index) => (
            <View style={styles.cartItemContainer} key={index}>
              <Pressable style={styles.cartItem}>
                <View>
                  <Image
                    style={styles.cartItemImage}
                    source={{ uri: item?.image }}
                  />
                </View>

                <View>
                  <Text numberOfLines={3} style={styles.cartItemTitle}>
                    {item?.title}{item?.name}
                  </Text>
                  <Text style={styles.cartItemPrice}>{item?.price}</Text>
                  <Text style={styles.inStock}>In Stock</Text>
                </View>
              </Pressable>

              <Pressable style={styles.cartActionsContainer}>
                <View style={styles.quantityControl}>
                  {item?.quantity > 1 ? (
                    <Pressable
                      onPress={() => decreaseQuantity(item)}
                      style={styles.decrementButton}
                    >
                      <AntDesign name='minus' size={24} color='black' />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={styles.deleteButton}
                    >
                      <AntDesign name='delete' size={24} color='black' />
                    </Pressable>
                  )}

                  <Pressable style={styles.quantityDisplay}>
                    <Text>{item?.quantity}</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={styles.incrementButton}
                  >
                    <AntDesign name='plus' size={24} color='black' />
                  </Pressable>

                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={styles.deleteItemButton}
                  >
                    <Text>Delete</Text>
                  </Pressable>
                </View>
              </Pressable>

              <Pressable style={styles.cartOptionsContainer}>
                <Pressable style={styles.saveForLaterButton}>
                  <Text>Save for Later</Text>
                </Pressable>

                <Pressable style={styles.seeMoreButton}>
                  <Text>See More Like this</Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
        <Text style={styles.wishlistTitle}>Wishlist</Text>
        <Wishlist />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    flex: 1,
    paddingLeft: 10,
  },
  subtotalContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '400',
  },
  subtotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emiText: {
    marginHorizontal: 10,
  },
  proceedButton: {
    backgroundColor: '#FFC72C',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  separator: {
    height: 1,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 16,
  },
  cartItemContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderBottomColor: '#F0F0F0',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cartItem: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  cartItemTitle: {
    width: 150,
    marginTop: 10,
  },
  cartItemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },
  inStock: {
    color: 'green',
  },
  cartActionsContainer: {
    marginTop: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  decrementButton: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  incrementButton: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  quantityDisplay: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  deleteButton: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  deleteItemButton: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    marginLeft: 30,
  },
  cartOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  saveForLaterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
  },
  seeMoreButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 0.6,
  },
  wishlistTitle: {
    textAlign: 'center',
  },
});





