import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Image,
  } from 'react-native';
  import React from 'react';
  import { useNavigation } from '@react-navigation/native';

  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];
  const TodaysDeals = () => {
    const navigation = useNavigation();
  
    return (
      <View>
        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
          Today's Deals
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((item) => (
            <Pressable
              key={item.id}
              onPress={() =>
                navigation.navigate('Info', {
                  id: item.id,
                  title: item.title,
                  price: item?.price,
                  carouselImages: item.carouselImages,
                  color: item?.color,
                  size: item?.size,
                  oldPrice: item?.oldPrice,
                //   item: item,
                })
              }
              style={{
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Image
                style={{ width: 150, height: 150, resizeMode: 'contain' }}
                source={{ uri: item?.image }}
              />
              <View
                style={{
                  backgroundColor: '#E31837',
                  paddingVertical: 5,
                  width: 130,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}
                >
                  Upto {item?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  export default TodaysDeals;
  
  const styles = StyleSheet.create({});
  