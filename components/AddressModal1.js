import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import { useContext } from 'react';
import axios from 'axios';
import config from '../src/config';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddressModal1 = ({ visible, onClose, onAddressSelect }) => {
  const navigation = useNavigation();
  const { userId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (userId && visible) {
          const response = await axios.get(`${config.API_URL}/addresses/${userId}`);
          setAddresses(response.data.addresses || []);
        }
      } catch (error) {
        console.log('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [userId, visible]);

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    if (onAddressSelect) {
      onAddressSelect(address);
    }
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
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
              style={styles.addressesScroll}
            >
              {addresses.map((item) => (
                <Pressable
                  key={item._id}
                  onPress={() => handleAddressSelect(item)}
                  style={[
                    styles.addressCard,
                    selectedAddress?._id === item._id &&
                      styles.selectedAddressCard,
                  ]}
                >
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
                  onClose();
                  navigation.navigate('Address');
                }}
                style={styles.addAddressCard}
              >
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
                  onClose();
                  navigation.navigate('AutoAddressForm');
                }}
              >
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
  );
};

const styles = StyleSheet.create({
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
  addressText: {
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },
  addAddressCard: {
    width: 140,
    height: 140,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  addAddressText: {
    textAlign: 'center',
    color: '#0066b2',
    fontWeight: '500',
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
});

export default AddressModal1;