import React from "react";
import { View, Text } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


const AddressActions = () => {
  return (
    <View style={{ flexDirection: "column", marginBottom: 30, gap: 7 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <EvilIcons name="location" size={24} color="#0066B2" />
        <Text style={{ color: "#0066B2", fontWeight: "400" }}>Enter Your PinCode</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="locate-sharp" size={24} color="#0066B2" />
        <Text style={{ color: "#0066B2", fontWeight: "400" }}>Use My Current Location</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Entypo name="globe" size={24} color="#0066B2" />
        <Text style={{ color: "#0066B2", fontWeight: "400" }}>Delivery to Abroad</Text>
      </View>
    </View>
  );
};

export default AddressActions;
