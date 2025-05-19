import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Image,
  FlatList
} from 'react-native';
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
        
        if (data.orders?.[0]?.products?.[0]) {
          console.log('Sample product data:', data.orders[0].products[0]);
        }
        const sortedOrders = (data.orders || []).sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Order fetch error:", err);
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const formatPrice = (price) => {
    if (!price) return '0.00';
    return parseFloat(price.toString().replace(/[^\d.]/g, '')).toFixed(2);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/80' }}
        style={styles.productImage}
        onError={() => console.log('Image load failed')}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title || 'No product name'}
        </Text>
        <Text style={styles.productPrice}>
          ₹{formatPrice(item.price)}
        </Text>
        <Text style={styles.productQuantity}>
          Quantity: {item.quantity || 1}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No orders found</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>
      
      {orders.map((order) => (
        <View key={order._id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>
              Order #{order._id?.substring(18, 24).toUpperCase()}
            </Text>
            <View style={[
              styles.paymentBadge,
              { backgroundColor: order.paymentMethod === 'cash' ? '#FFA000' : '#4CAF50' }
            ]}>
              <Text style={styles.paymentText}>
                {order.paymentMethod === 'cash' ? 'COD' : 'Paid'}
              </Text>
            </View>
          </View>

          <Text style={styles.orderDate}>
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
          <Text style={styles.sectionTitle}>Shipping Address:</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressText}>{order.shippingAddress?.name}</Text>
            <Text style={styles.addressText}>Phone: {order.shippingAddress?.mobileNo}</Text>
            <Text style={styles.addressText}>
              {order.shippingAddress?.houseNo}, {order.shippingAddress?.street}
            </Text>
            <Text style={styles.addressText}>Landmark: {order.shippingAddress?.landmark}</Text>
            <Text style={styles.addressText}>Postal Code: {order.shippingAddress?.postalCode}</Text>
          </View>
          <Text style={styles.sectionTitle}>Products ({order.products?.length || 0}):</Text>
          {order.products?.length > 0 ? (
            <FlatList
              data={order.products}
              renderItem={renderProductItem}
              keyExtractor={(item, index) => item._id || `product-${index}`}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noProductsText}>No products in this order</Text>
          )}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Order Total:</Text>
            <Text style={styles.totalAmount}>₹{formatPrice(order.totalPrice)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  paymentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  paymentText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#333',
  },
  addressBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  productItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    color: '#222',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  noProductsText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e53935',
  },
  errorText: {
    color: '#e53935',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default OrdersScreen;