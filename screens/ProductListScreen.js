import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://192.168.0.107:5000';

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/search`);
      const data = await response.json();
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const searchProducts = async text => {
    setKeyword(text);
    if (text.trim() === '') {
      setFiltered(products);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/search?keyword=${text}`);
      const data = await response.json();
      setFiltered(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleMicPress = async () => {
    try {
      const permissionType =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.RECORD_AUDIO
          : PERMISSIONS.IOS.MICROPHONE;
  
      const status = await check(permissionType);
  
      if (status === RESULTS.GRANTED) {
        Alert.alert('Already Granted', 'You can use the mic.');
      } else {
        const result = await request(permissionType);
  
        if (result === RESULTS.GRANTED) {
          Alert.alert('Permission Granted', 'You can now use the microphone.');
        } else {
          Alert.alert('Permission Denied', 'Microphone access is required.');
        }
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>
        {item.price} {item.currency}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <View style={styles.searchInput}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            placeholder="Search products..."
            value={keyword}
            onChangeText={searchProducts}
            style={{ flex: 1 }}
          />
        </View>

        <TouchableOpacity >
          <Entypo name="mic" size={24} color="black" onPress={handleMicPress}/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
   
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  searchBar: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 40 : 0,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    flex: 1,
    paddingLeft: 10,
  },
});

export default ProductListScreen;
