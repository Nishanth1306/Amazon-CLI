// import React, { useCallback, useContext, useEffect, useRef } from "react";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Entypo from 'react-native-vector-icons/Entypo';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { BackHandler } from "react-native";
// import {
//   View,
//   Text,
//   ScrollView,
//   Pressable,
//   StyleSheet,
//   useWindowDimensions,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";
// import { useState } from "react";
// import { UserType } from "../UserContext";
// import axios from "axios";
// import ProductItem from "../components/ProductItem";
// import DropDownPicker from "react-native-dropdown-picker";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector, useDispatch } from "react-redux";
// import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { jwtDecode } from "jwt-decode";

// import config from "../src/config.js";
// import ImageSlider from "../components/ImageSlider.js";
// import AddressModal from "../components/AddressModal.js";
// import Categories from "../components/Categories.js";
// import TrendingDeals from "../components/TrendingDeals.js";
// import Search from "../components/Search.js";
// import TodaysDeals from "../components/TodaysDeals.js";
// import AntDesign from "react-native-vector-icons/AntDesign";

// const Home = () => {
//   const [filteredData, setFilteredData] = useState([]);
//   const { width } = useWindowDimensions();
//   const [Products, setProducts] = useState([]);
//   const navigation = useNavigation();
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress,setSelectedAdress] = useState("");
//   const { userId, setUserId } = useContext(UserType);
//   const [open, setOpen] = useState(false);
//   const [category, setCategory] = useState("jewelry");

//   const [items, setItems] = useState([
//     { label: "Men's Clothing", value: "men's clothing" },
//     { label: "Jewelery", value: "jewelery" },
//     { label: "Electronics", value: "electronics" },
//     { label: "Women's clothing", value: "women's clothing" },
//   ]);

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       () => {
//         if (modalVisible) {
//           setModalVisible(false);
//           return true;
//         }
//         return false;
//       }
//     );

//     return () => backHandler.remove();
//   }, [modalVisible]);

//   useEffect(() => {
//     if (userId) {
//       <Pressable
//         style={{
//           backgroundColor: "#F5F5F5",
//           paddingHorizontal: 10,
//           paddingVertical: 6,
//           borderWidth: 0.9,
//           borderColor: "#D0D0D0",
//         }}
//       >
//         <Text>Edit</Text>
//       </Pressable>;
//       fetchAddresses();
//     }
//   }, [userId, modalVisible]);

//   const fetchAddresses = async () => {
//     try {
//       const response = await axios.get(`${config.API_URL}/addresses/${userId}`);
//       const { addresses } = response.data;

//       setAddresses(addresses);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const responce = await axios.get("https://fakestoreapi.com/products");
//         setProducts(responce.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const [aproducts, setaProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("Phone");

//   useEffect(() => {
//     const loadProducts = async () => {
//       const fetched = await fetchAmazonProducts(selectedCategory);
//       setProducts(fetched);
//     };

//     loadProducts();
//   }, [selectedCategory]);

//   const list = [
//     {
//       id: "0",
//       image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
//       name: "Home",
//     },
//     {
//       id: "1",
//       image:
//         "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
//       name: "Deals",
//     },
//     {
//       id: "3",
//       image:
//         "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
//       name: "Electronics",
//     },
//     {
//       id: "4",
//       image:
//         "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
//       name: "Mobiles",
//     },
//     {
//       id: "5",
//       image:
//         "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
//       name: "Music",
//     },
//     {
//       id: "6",
//       image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
//       name: "Fashion",
//     },
//   ];

//   const images = [
//     {
//       id: "1",
//       uri: "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
//     },
//     {
//       id: "2",
//       uri: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
//     },
//     {
//       id: "3",
//       uri: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
//     },
//   ];

//   const onGenderOpen = useCallback(() => {
//     setCompanyOpen(false);
//   }, []);
//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       console.log("token", token);
//       const decodedToken = jwtDecode(token);
//       console.log("decodedToken", decodedToken);
//       const userId = decodedToken.userId;
//       setUserId(userId);
//     };

//     fetchUser();
//   }, []);
//   const cart = useSelector((state) => state.cart.cart);
//   const dispatch = useDispatch();

//   const addToCart = (product) => {
//     dispatch(addToCartAction(product));
//   };

//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     const backAction = () => {
//       if (modalVisible) {
//         setModalVisible(false);
//         return true; // prevent default behavior (exit app)
//       }
//       return false; // allow default behavior
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );

//     return () => backHandler.remove(); // cleanup on unmount
//   }, [modalVisible]);

//   return (
//     <>
//       <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//         <ScrollView>
//           <Search/>

//           <Pressable
//             onPress={() => setModalVisible(!modalVisible)}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               gap: 5,
//               padding: 10,
//               backgroundColor: "#AFEEEE",
//             }}
//           >
//             <Ionicons name="location-outline" size={24} color="black" />

//             <Pressable>
//             {selectedAddress ? (
//                 <Text>
//                   Deliver to {selectedAddress?.name} - {selectedAddress?.street}
//                 </Text>
//               ) : (
//                 <Text style={{ fontSize: 13, fontWeight: "500" }}>
//                     Add a Address
//                 </Text>
//               )}
//             </Pressable>

//             <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
//           </Pressable>
//           <Categories />
//           {/* <ImageSlider /> */}
//           <TrendingDeals />
//          <TodaysDeals/>

//           <View
//             style={{
//               marginHorizontal: 10,
//               marginTop: 20,
//               width: "45%",
//               marginBottom: open ? 50 : 15,
//             }}
//           >
//             <DropDownPicker
//               style={{
//                 borderColor: "#B7B7B7",
//                 height: 30,
//                 marginBottom: open ? 120 : 15,
//               }}
//               open={open}
//               value={category}
//               items={items}
//               setOpen={setOpen}
//               setValue={setCategory}
//               setItems={setItems}
//               placeholder="Choose Category"
//               placeholderStyle={styles.placeholderStyles}
//               onOpen={onGenderOpen}
//               zIndex={3000}
//               zIndexInverse={1000}
//             />
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               flexWrap: "wrap",
//               alignItems: "center",
//             }}
//           >
//             {Products?.filter((item) => item.category === category).map(
//               (item, index) => (
//                 <ProductItem item={item} key={index} />
//               )
//             )}
//           </View>
//         </ScrollView>
//       </SafeAreaView>

//       <BottomModal
//         onBackdropPress={() => setModalVisible(!modalVisible)}
//         swipeDirection={["up", "down"]}
//         swipeThreshold={200}
//         modalAnimation={
//           new SlideAnimation({
//             slideFrom: "bottom",
//           })
//         }

//         visible={modalVisible}
//         onTouchOutside={() => setModalVisible(!modalVisible)}
//       >
//         <ModalContent style={{ width: "100%", height: 400 }}>
//           <View style={{ marginBottom: 8 }}>
//             <Text style={{ fontSize: 16, fontWeight: "500" }}>
//               Choose your Location
//             </Text>

//             <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
//               Select a delivery location to see product availabilty and delivery
//               options
//             </Text>
//           </View>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>

//             {addresses?.map((item, index) => (
//               <Pressable
//               onPress={() => setSelectedAdress(item)}
//                 style={{
//                   width: 140,
//                   height: 140,
//                   borderColor: "#D0D0D0",
//                   borderWidth: 1,
//                   padding: 10,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: 3,
//                   marginRight: 15,
//                   marginTop: 10,
//                   backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
//                 }}
//               >
//                 <View
//                   style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
//                 >
//                   <Text style={{ fontSize: 13, fontWeight: "bold" }}>
//                     {item?.name}
//                   </Text>
//                   <Entypo name="location-pin" size={24} color="red" />
//                 </View>

//                 <Text
//                   numberOfLines={1}
//                   style={{ width: 130, fontSize: 13, textAlign: "center" }}
//                 >
//                   {item?.houseNo},{item?.landmark}
//                 </Text>

//                 <Text
//                   numberOfLines={1}
//                   style={{ width: 130, fontSize: 13, textAlign: "center" }}
//                 >
//                   {item?.street}
//                 </Text>
//                 <Text
//                   numberOfLines={1}
//                   style={{ width: 130, fontSize: 13, textAlign: "center" }}
//                 >
//                   India, Bangalore
//                 </Text>
//               </Pressable>
//             ))}

//             <Pressable
//               onPress={() => {
//                 setModalVisible(false);
//                 navigation.navigate("Address");
//               }}
//               style={{
//                 width: 140,
//                 height: 140,
//                 borderColor: "#D0D0D0",
//                 marginTop: 10,
//                 borderWidth: 1,
//                 padding: 10,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   color: "#0066b2",
//                   fontWeight: "500",
//                 }}
//               >
//                 Add an Address or pick-up point
//               </Text>
//             </Pressable>
//           </ScrollView>

//           <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
//             <View
//               style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
//             >
//               <Entypo name="location-pin" size={22} color="#0066b2" />
//               <Text style={{ color: "#0066b2", fontWeight: "400" }}>
//                 Enter an Indian pincode
//               </Text>
//             </View>

//             <View
//               style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
//             >
//               <Ionicons name="locate-sharp" size={22} color="#0066b2" />
//               <Text style={{ color: "#0066b2", fontWeight: "400" }}>
//                 Use My Currect location
//               </Text>
//             </View>

//             <View
//               style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
//             >
//               <AntDesign name="earth" size={22} color="#0066b2" />

//               <Text style={{ color: "#0066b2", fontWeight: "400" }}>
//                 Deliver outside India
//               </Text>
//             </View>
//           </View>
//         </ModalContent>
//       </BottomModal>

//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },

//   carouselItem: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   carouselImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//   },
// });

// export default Home;

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  BackHandler,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';


// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import {UserType} from '../UserContext';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import Search from '../components/Search';
import Categories from '../components/Categories';
import TrendingDeals from '../components/TrendingDeals';
import TodaysDeals from '../components/TodaysDeals';
import config from '../src/config';

const Home = () => {
  //const [products, setProducts] = useState([]);
  const [Products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('jewelery');

  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const backHandlerRef = useRef(null);
  const {width} = useWindowDimensions();
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('jewelery');
  const [items, setItems] = useState([
    {label: "Men's Clothing", value: "men's clothing"},
    {label: 'Jewelery', value: 'jewelery'},
    {label: 'Electronics', value: 'electronics'},
    {label: "Women's clothing", value: "women's clothing"},
  ]);







  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      return false;
    };

    // Clean up previous listener
    if (backHandlerRef.current) {
      backHandlerRef.current.remove();
    }

    // Add new listener
    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      if (backHandlerRef.current) {
        backHandlerRef.current.remove();
      }
    };
  }, [modalVisible]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.userId);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `${config.API_URL}/addresses/${userId}`,
          );
          setAddresses(response.data.addresses || []);
        }
      } catch (error) {
        console.log('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [userId, modalVisible]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  
  const categories = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
      name: 'Home',
    },
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
      name: 'Deals',
    },
    {
      id: '2',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Electronics',
    },
    {
      id: '3',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
      name: 'Music',
    },
    {
      id: '5',
      image: 'https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg',
      name: 'Fashion',
    },
  ];

  
  const bannerImages = [
    {
      id: '1',
      uri: 'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    },
    {
      id: '2',
      uri: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    },
    {
      id: '3',
      uri: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
    },
  ];

  const onGenderOpen = useCallback(() => {
    setOpen(false);
  }, []);

  const addToCart = product => {
    dispatch(addToCartAction(product));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView>
       
        <Search />

        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.addressContainer}>
          <Ionicons name="location-outline" size={24} color="black" />

          <View style={styles.addressTextContainer}>
            {selectedAddress ? (
              <Text style={styles.addressText}>
                Deliver to {selectedAddress.name} - {selectedAddress.street}
              </Text>
            ) : (
              <Text style={styles.addAddressText}>Add an Address</Text>
            )}
          </View>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>

       
        <Categories categories={categories} />

      
        <TrendingDeals />

       
        <TodaysDeals />


        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Choose Category"
            placeholderStyle={styles.placeholderStyles}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownList}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            onChangeValue={(value) => {
              setCategory(value);
            }}
          />
        </View>

        {/* Add this view to prevent content overlap when dropdown is open */}
        {open && <View style={styles.dropdownSpacer} />}

        <View style={styles.productsGrid}>
          {Products?.filter(item => item.category === value).map(
            (item, index) => (
              <ProductItem item={item} key={index} />
            ),
          )}
        </View>

        



      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.modalContent}
              onPress={e => e.stopPropagation()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Choose your Location</Text>
                <Text style={styles.modalSubtitle}>
                  Select a delivery location to see product availability and
                  delivery options
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.addressesScroll}>
                {addresses.map(item => (
                  <Pressable
                    key={item._id}
                    onPress={() => {
                      setSelectedAddress(item);
                      setModalVisible(false);
                    }}
                    style={[
                      styles.addressCard,
                      selectedAddress?._id === item._id &&
                        styles.selectedAddressCard,
                    ]}>
                    <View style={styles.addressCardHeader}>
                      <Text style={styles.addressName}>{item.name}</Text>
                      <Entypo name="location-pin" size={24} color="red" />
                    </View>

                    <Text numberOfLines={1} style={styles.addressText}>
                      {item.houseNo}, {item.landmark}
                    </Text>

                    <Text numberOfLines={1} style={styles.addressText}>
                      {item.street}
                    </Text>

                    <Text numberOfLines={1} style={styles.addressText}>
                      India, {item.city}
                    </Text>
                  </Pressable>
                ))}

                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Address');
                  }}
                  style={styles.addAddressCard}>
                  <Text style={styles.addAddressText}>
                    Add an Address or pick-up point
                  </Text>
                </Pressable>
              </ScrollView>

              <View style={styles.modalFooter}>
                <Pressable style={styles.footerOption}>
                  <Entypo name="location-pin" size={22} color="#0066b2" />
                  <Text style={styles.footerOptionText}>
                    Enter an Indian pincode
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.footerOption}
                  onPress={() => {
                    navigation.navigate('AutoAddressForm');
                  }}>
                  <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                  <Text style={styles.footerOptionText}>
                    Use My Current location
                  </Text>
                </Pressable>

                <Pressable style={styles.footerOption}>
                  <AntDesign name="earth" size={22} color="#0066b2" />
                  <Text style={styles.footerOptionText}>
                    Deliver outside India
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: '#AFEEEE',
  },
  addressTextContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 13,
  },
  addAddressText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0066b2',
  },
  placeholderStyles: {
    fontSize: 14,
    color: '#666',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  modalContent: {
    width: '100%',
    height: 400,
    padding: 15,
  },
  modalHeader: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalSubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
  },
  addressesScroll: {
    marginVertical: 10,
  },
  addressCard: {
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginRight: 15,
    marginTop: 10,
    backgroundColor: 'white',
  },
  selectedAddressCard: {
    backgroundColor: '#FBCEB1',
  },
  addressCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  addressName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  addAddressCard: {
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  footerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerOptionText: {
    color: '#0066b2',
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '100%',
    maxHeight: '80%',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  dropdownContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    zIndex: 1000, 
  },
  dropdown: {
    borderColor: '#B7B7B7',
    height: 40,
  },
  dropdownList: {
    borderColor: '#B7B7B7',
    marginTop: 2,
  },
  placeholderStyles: {
    fontSize: 14,
    color: '#666',
  },
  dropdownSpacer: {
    height: 200, // Adjust based on your dropdown content height
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 1, // Lower than dropdown
  },
});

export default Home;
