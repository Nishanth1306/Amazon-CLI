import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 5000);
  };
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      ></Image>
      <Text style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating.rate} ratings{" "}
        </Text>
      </View>

      <Pressable
        onPress={() => {
          if (userType === "guest") {
            Alert.alert(
              "Guest Access",
              "You need to log in to add items to your cart.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Login", onPress: () => navigation.navigate("Login") },
              ]
            );
            return;
          }

          addItemToCart(item);
        }}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
