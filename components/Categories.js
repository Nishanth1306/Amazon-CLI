import { StyleSheet, Text, View , Image, FlatList, TouchableOpacity,} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const Categories = () => {
  const [Products, setProducts] = useState([]);
  const [aproducts, setaProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Phone");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responce = await axios.get("https://fakestoreapi.com/products");
        setProducts(responce.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const fetched = await fetchAmazonProducts(selectedCategory);
      setProducts(fetched);
    };

    loadProducts();
  }, [selectedCategory]);

  const categories = [
    {
      // id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      id: "Home",
    },
    {
      // id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      id: "Deals",
    },
    {
      // id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      id: "Electronics",
    },
    {
      // id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      id: "Mobiles",
    },
    {
      // id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      id: "Music",
    },
    {
      // id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      id: "Fashion",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ alignItems: "center", marginRight: 15 }}
            onPress={() =>
              navigation.navigate("CategoryProductsScreen", {
                query: item.id,
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <Text>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoryItem: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  categoryText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
});
