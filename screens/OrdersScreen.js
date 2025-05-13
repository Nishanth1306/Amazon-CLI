import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import config from '../src/config.js';

const OrdersScreen = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${config.API_URL}/orders/${userId}`);
        console.log('Orders:', data);
        setOrders(data.orders || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>No orders found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>
      
      {orders.map((order) => (
        <View key={order._id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order ID: {order._id}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: order.paymentMethod === 'cash' ? '#FFA000' : '#4CAF50' }
            ]}>
              <Text style={styles.statusText}>
                {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Paid Online'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.orderText}>
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          
          <Text style={styles.sectionTitle}>Customer Details:</Text>
          <Text style={styles.orderText}>Name: {order.user?.name}</Text>
          <Text style={styles.orderText}>Email: {order.user?.email}</Text>
          
          <Text style={styles.sectionTitle}>Shipping Address:</Text>
          <Text style={styles.orderText}>Name: {order.shippingAddress.name}</Text>
          <Text style={styles.orderText}>Mobile: {order.shippingAddress.mobileNo}</Text>
          <Text style={styles.orderText}>
            Address: {order.shippingAddress.houseNo}, {order.shippingAddress.street}
          </Text>
          <Text style={styles.orderText}>Landmark: {order.shippingAddress.landmark}</Text>
          <Text style={styles.orderText}>Postal Code: {order.shippingAddress.postalCode}</Text>
          
          <Text style={styles.sectionTitle}>Payment Method:</Text>
          <Text style={styles.orderText}>
            {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment'}
          </Text>
          
          <Text style={styles.sectionTitle}>Products:</Text>
          {order.products && order.products.length > 0 ? (
            order.products.map((product, index) => (
              <View key={index} style={styles.productItem}>
                {product.image && (
                  <Image 
                    source={{ uri: product.image }} 
                    style={styles.productImage} 
                    resizeMode="contain"
                  />
                )}
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product?.title}</Text>
                  <Text style={styles.productPrice}>Price: ₹ {product?.price || '0.00'}</Text>
                  <Text style={styles.productQuantity}>Quantity: {product.quantity || 1}</Text>
                  {product.color && <Text style={styles.productColor}>Color: {product.color}</Text>}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noProductsText}>No products in this order</Text>
          )}
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Price:</Text>
            <Text style={styles.summaryValue}>₹{order.totalPrice?.toFixed(2) || '0.00'}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
  },
  orderText: {
    marginBottom: 6,
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  productPrice: {
    color: '#E91E63',
    marginBottom: 4,
  },
  productQuantity: {
    color: '#555',
    marginBottom: 4,
  },
  productSize: {
    color: '#555',
    marginBottom: 4,
  },
  productColor: {
    color: '#555',
  },
  noProductsText: {
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  summaryValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E91E63',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    color: '#555',
  },
});

export default OrdersScreen;