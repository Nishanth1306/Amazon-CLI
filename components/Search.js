import { StyleSheet, TextInput,Text, View, Pressable ,Platform,ScrollView} from 'react-native';
import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';


const Search = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Pressable
       onPress={() => navigation.navigate('ProductListScreen')}>

    <View style={styles.searchBar}>
      <View 
      style={styles.searchInput}>
        <AntDesign name="search1" size={24} color="black" />
        <Text>Search</Text> 
        {/* placeholder="Search" style={styles.input} /> */}
        </View>
      
      <Entypo name="mic" size={24} color="black" />
    </View>
    </Pressable>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  input: {
    flex: 1,
    fontSize: 16,
  },
});
