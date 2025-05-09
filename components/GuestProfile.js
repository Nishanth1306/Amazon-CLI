import { StyleSheet, Text, View,SafeAreaView,ScrollView ,Pressable,Image} from 'react-native'
import React ,{ useState,useEffect} from 'react';
import { useNavigation } from "@react-navigation/native";


const greetings = [
    { text: "Hello", language: "English" },
    { text: "नमस्ते", language: "Hindi" },
    { text: "ഹലോ", language: "Malayalam" },
    { text: "வணக்கம்", language: "Tamil" },
  ];

const GuestProfile = () => {
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    
      useEffect(() => {
        const timer = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 2000); 
    
        return () => clearInterval(timer); 
      }, []);
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
        <ScrollView style={{ height: "100%", width: "100%" }}>
          <View
            style={{ backgroundColor: "#74E0DE", width: "100%", height: 60 }}
          ></View>
          <View style={{ marginLeft: 10, marginTop: 10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text>{greetings[index].text}</Text>
            <Pressable onPress={() =>{
                navigation.navigate("Language");
            }}>
            <Image source={require("../assets/IndianFlag.png")}
            style={{marginRight:10,width:20,height:20}} />
            </Pressable> 
            </View>
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>Welcome to Amazon</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("Register");
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  width: "90%",
                  height:40,
                  backgroundColor: "#FACC62",
                  borderBlockColor: "black",
                  borderWidth: 1,
                }}
              >
                <Text>Creat account</Text>
              </Pressable>

              <Pressable
              onPress={() =>{
                navigation.navigate("Login")
              }}
                style={{
                  backgroundColor: "#EFF0F4",
                  marginTop: 10,
                  width: "90%",
                  height: 40,
                  borderColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
              >
                <Text>Sign in</Text>
              </Pressable>


              <View style={{marginTop:30,gap:40}}>
                <Text>Upto $100 cashback on your first order</Text>
                <Text>Free Delivery on first order - for top categories</Text>
                <Text>Easy Return</Text>
                <Text>Pay on Delivery</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  )
}

export default GuestProfile

const styles = StyleSheet.create({})