import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BottomModal, SlideAnimation, ModalContent } from 'react-native-modals';

import AddressItem from './AddressItem';
import AddressActions from './AddressActions';

const AddressModal = ({ selectedAddress, setSelectedAddress, addresses, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable style={styles.locationBar} onPress={() => setModalVisible(true)}>
        <Entypo name='location-pin' size={24} color='black' />
        <Pressable>
          {selectedAddress ? (
            <Text>
              Delivery To {selectedAddress?.name} - {selectedAddress?.street}
            </Text>
          ) : (
            <Text style={{ fontSize: 13, fontWeight: "500" }}>Add an Address</Text>
          )}
        </Pressable>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </Pressable>

      <BottomModal
        onBackdropPress={() => setModalVisible(false)}
        visible={modalVisible}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        onTouchOutside={() => setModalVisible(false)}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Choose Your Location</Text>
            <Text style={{ marginTop: 5, fontSize: 15, color: "gray" }}>
              Select a Delivery Location to see the Product Availability and Delivery Options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses.map((item, index) => (
              <AddressItem
                key={index}
                item={item}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            ))}
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("AddAddressScreen");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "500", color: "#0066B2" }}>
                Add an Address
              </Text>
            </Pressable>
          </ScrollView>

          <AddressActions />
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  locationBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "#AFEEEE",
  },
});
