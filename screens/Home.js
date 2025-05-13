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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserType} from '../UserContext';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import Search from '../components/Search';
import Categories from '../components/Categories';
import TrendingDeals from '../components/TrendingDeals';
import TodaysDeals from '../components/TodaysDeals';
import config from '../src/config';
import { cleanCart } from '../redux/CartReducer';
import messaging from '@react-native-firebase/messaging';

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const backHandlerRef = useRef(null);
  const {width} = useWindowDimensions();
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


    if (backHandlerRef.current) {
      backHandlerRef.current.remove();
    }

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

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
const getFcmToken = async (userId) => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        await AsyncStorage.setItem('fcmToken', token);

        try {
          await axios.post(`${config.API_URL}/user/${userId}/fcmtoken`, {
            token: token,
          });
        } catch (error) {
          console.error('Error saving FCM token to backend:', error);
        }
      } else {
        console.log('No token returned by messaging().getToken()');
      }
    } else {
      console.log('Existing FCM Token:', fcmToken);
      const token = fcmToken;
      try {
        await axios.post(`${config.API_URL}/user/${userId}/fcmtoken`, {
          token: token,
        });
      } catch (error) {
        console.error('Error saving FCM token to backend:', error);
      }
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

useEffect(() => {
  requestUserPermission();
  if (userId) {
    getFcmToken(userId);
  }
}, [userId]);

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
                <Pressable 
                onPress={() => (navigation.navigate("AutoPinScreen"))}
                style={styles.footerOption}>
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
    height: 200, 
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    zIndex: 1, 
  },
});

export default Home;
