// UserOrdersScreen.js
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import config from "../src/config";

const UserOrdersScreen = () => {
  const { userId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/orders/${userId}`);
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Orders</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : orders.length === 0 ? (
        <Text>No orders found</Text>
      ) : (
        orders.map((order) => (
          <View key={order._id} style={styles.orderCard}>
            <Text style={styles.orderTitle}>Order ID: {order._id}</Text>
            {order.products.map((product) => (
              <View key={product._id} style={styles.productContainer}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productTitle}>{product.title}</Text>
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  orderCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  orderTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },
  productTitle: {
    flex: 1,
  },
});

export default UserOrdersScreen;
