// components/Address/AddressItem.js
import React from "react";
import { View, Text, Pressable } from "react-native";


import EvilIcons from 'react-native-vector-icons/EvilIcons';


const AddressItem = ({ item, selectedAddress, setSelectedAddress }) => {
  return (
    <Pressable
      onPress={() => setSelectedAddress(item)}
      style={{
        width: 140,
        height: 140,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        marginRight: 15,
        backgroundColor: selectedAddress === item ? "#FBCEB1" : "white",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item?.name}</Text>
        <EvilIcons name="location" size={24} color="red" />
      </View>
      <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>
        {item?.houseNo}, {item?.landmark}
      </Text>
      <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>
        {item?.street}
      </Text>
    </Pressable>
  );
};

export default AddressItem;
