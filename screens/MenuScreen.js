import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Search from "../components/Search";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

const MenuScreen = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Search />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "amazon" ? null : "amazon")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
                overflow: "hidden",
                marginBottom: 10,
                //position: "relative",
              }}
            >
              <Text style={styles.text}>Amazon Pay</Text>
              <Image
                source={require("../assets/AmazonPay.png")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "mobile" ? null : "mobile")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
              }}
            >
              <Text style={styles.text}>Mobiles, Electronics & Alexa</Text>
              <Image
                source={require("../assets/Mobile.jpg")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "deals" ? null : "deals")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
              }}
            >
              <Text style={styles.text}>Deals & Savings</Text>
              <Image
                source={require("../assets/deals.jpg")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          {["amazon", "mobile", "deals"].includes(activeCard) &&
            (activeCard === "amazon" ? (
              <View style={styles.fullWidthDropdown}>
                <View style={styles.modelText}>
                  <Text style={styles.modelTextOnly}>Scan any QR</Text>
                  <Text style={styles.modelTextOnly}>Send Money</Text>
                  <Text style={styles.modelTextOnly}>Mobile Recharge</Text>
                  <Text style={styles.modelTextOnly}>Bills & Recharge</Text>
                  <Text style={styles.modelTextOnly}>Daily Transit</Text>
                  <Text style={styles.modelTextOnly}>Gift Cards</Text>
                  <Text style={styles.modelTextOnly}>Car & Bike Insurance</Text>
                  <Text style={styles.modelTextOnly}>Subscriptions</Text>
                  <Text style={styles.modelTextOnly}>Add Money</Text>
                  <Text style={styles.modelTextOnly}>Rewards</Text>
                </View>
              </View>
            ) : activeCard === "mobile" ? (
              <View style={styles.fullWidthDropdown}>
                <View style={styles.modelText}>
                  <Text style={styles.modelTextOnly}>
                    Mobiles & Accessories
                  </Text>
                  <Text style={styles.modelTextOnly}>Electronics</Text>
                  <Text style={styles.modelTextOnly}>Laptops</Text>
                  <Text style={styles.modelTextOnly}>Home Appliances</Text>
                  <Text style={styles.modelTextOnly}>Television</Text>
                  <Text style={styles.modelTextOnly}>Echo, Kindle & More</Text>
                  <Text style={styles.modelTextOnly}>Smart Home</Text>
                  <Text style={styles.modelTextOnly}>Kitchen Appliances</Text>
                  <Text style={styles.modelTextOnly}>Headphones</Text>
                  <Text style={styles.modelTextOnly}>Amazon Live</Text>
                  <Text style={styles.modelTextOnly}>Smart Watches</Text>
                  <Text style={styles.modelTextOnly}>Video Games</Text>
                  <Text style={styles.modelTextOnly}>Software</Text>
                  <Text style={styles.modelTextOnly}>Amazon Business</Text>
                  <Text style={styles.modelTextOnly}>Amazon Launchpad</Text>
                  <Text style={styles.modelTextOnly}>Local Shops</Text>
                  <Text style={styles.modelTextOnly}>Internation Brands</Text>
                </View>
              </View>
            ) : activeCard === "deals" ? (
              <View style={styles.fullWidthDropdown}>
                <View style={styles.modelText}>
                  <Text style={styles.modelTextOnly}>Today's Deals</Text>
                  <Text style={styles.modelTextOnly}>Rewards</Text>
                  <Text style={styles.modelTextOnly}>Amazon Live</Text>
                  <Text style={styles.modelTextOnly}>Amazon Bazaar</Text>
                  <Text style={styles.modelTextOnly}>Buy more, Save More</Text>
                  <Text style={styles.modelTextOnly}>Amazon Renewed</Text>
                  <Text style={styles.modelTextOnly}>Subscribe & Save</Text>
                  <Text style={styles.modelTextOnly}>Clearance Store</Text>
                  <Text style={styles.modelTextOnly}>Amazon Coupons</Text>
                  <Text style={styles.modelTextOnly}>Amazon Combos</Text>
                </View>
              </View>
            ) : null)}

          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "Groceries" ? null : "Groceries")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
                marginBottom: 10,
              }}
            >
              <Text style={styles.text}>Groceries & Pet Supplies</Text>
              <Image
                source={require("../assets/Grocery.jpeg")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "MiniTv" ? null : "MiniTv")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
              }}
            >
              <Text style={styles.text}>MiniTv, Video & Music</Text>
              <Image
                source={require("../assets/minitv.png")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "Fashion" ? null : "Fashion")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
              }}
            >
              <Text style={styles.text}>Fashion & Beauty</Text>
              <Image
                source={require("../assets/fashion.jpg")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          {["Groceries", "MiniTv", "Fashion"].includes(activeCard) &&
            (activeCard === "Groceries" ? (
              <View style={styles.fullWidthDropdown}>
                <View style={styles.modelText}>
                  <Text style={styles.modelTextOnly}>Everyday Store</Text>
                  <Text style={styles.modelTextOnly}>Grooceries & Gourmet</Text>
                  <Text style={styles.modelTextOnly}>Pet Supplies</Text>
                  <Text style={styles.modelTextOnly}>Buy it Again</Text>
                  <Text style={styles.modelTextOnly}>Subscribe & Save</Text>
                
                </View>
              </View>
            ) : activeCard === "MiniTv" ? (
              <View style={styles.fullWidthDropdown}>
                <View style={styles.modelText}>
                  <Text style={styles.modelTextOnly}>Amazon MX Player</Text>
                  <Text style={styles.modelTextOnly}>Prime Video</Text>
                  <Text style={styles.modelTextOnly}>Amazon Live</Text>
                  <Text style={styles.modelTextOnly}>Speakers</Text>
                  <Text style={styles.modelTextOnly}>Musical Instruments</Text>
                  <Text style={styles.modelTextOnly}>Prime Music</Text>
                  <Text style={styles.modelTextOnly}>Movie Tickets</Text>
                </View>
              </View>
            ) : activeCard === "Fashion" ? (
              <View style={styles.fullWidthDropdown}>
                <View style={styles.modelText}>
                  <Text style={styles.modelTextOnly}>Women's Clothing</Text>
                  <Text style={styles.modelTextOnly}>Men's Clothng</Text>
                  <Text style={styles.modelTextOnly}>Amazon Bazaar</Text>
                  <Text style={styles.modelTextOnly}>Kids' Fashion</Text>
                  <Text style={styles.modelTextOnly}>Beauty & Makeup</Text>
                  <Text style={styles.modelTextOnly}>Amazon Live</Text>
                  <Text style={styles.modelTextOnly}>Shoes & Footwear</Text>
                  <Text style={styles.modelTextOnly}>Bags & Luggage</Text>
                  <Text style={styles.modelTextOnly}>Watches</Text>
                  <Text style={styles.modelTextOnly}>Jewellery</Text>
                  <Text style={styles.modelTextOnly}>Eyewear</Text> 
                  <Text style={styles.modelTextOnly}>Grooming Appliances</Text>
                  <Text style={styles.modelTextOnly}>Customers' Most Loved</Text>

                </View>
              </View>
            ) : null)}

          <TouchableOpacity
            onPress={() => setActiveCard(activeCard === "Home" ? null : "Home")}
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
                marginBottom: 10,
              }}
            >
              <Text style={styles.text}>Home, Furniture & Decor</Text>
              <Image
                source={require("../assets/home.jpeg")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "Prime" ? null : "Prime")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
              }}
            >
              <Text style={styles.text}>Prime</Text>
              <Image
                source={require("../assets/prime.jpg")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setActiveCard(activeCard === "Games" ? null : "Games")
            }
            style={{ paddingLeft: 10, paddingTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 10,
                height: 150,
                width: 120,
                backgroundColor: "white",
              }}
            >
              <Text style={styles.text}>Games & Live Shopping</Text>
              <Image
                source={require("../assets/games.png")}
                style={styles.Image}
              />
            </View>
          </TouchableOpacity>

          {["Home", "Prime", "Games"].includes(activeCard) &&
            (activeCard === "Home" ? (
              <View style={styles.fullWidthDropdown}>
                <Text style={styles.detailText}>
                  Explore Home, Furniture & Decor
                </Text>
              </View>
            ) : activeCard === "Prime" ? (
              <View style={styles.fullWidthDropdown}>
                <Text style={styles.detailText}>
                  Enjoy the best of Prime benefits!
                </Text>
              </View>
            ) : activeCard === "Games" ? (
              <View style={styles.fullWidthDropdown}>
                <Text style={styles.detailText}>
                  Welcome to Games & Live Shopping
                </Text>
              </View>
            ) : null)}
        </View>
      </ScrollView>

      <View style={styles.bottomSheet}>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
          <Pressable
          onPress={() => navigation.navigate('UserOrders')}
            style={{borderColor:"black",height:40,width:70,justifyContent:"center",alignItems:"center",borderRadius:10,borderWidth:1}}>
            <Text>Orders</Text>
            </Pressable>
            <Pressable
           onPress={() => navigation.navigate('UserAccount')}
            style={{borderColor:"black",width:80,justifyContent:"center",alignItems:"center",borderRadius:10,borderWidth:1}}>
            <Text>Accounts</Text>
            </Pressable>
            <Pressable
            onPress={() => navigation.navigate("Home")}
            style={{borderColor:"black",width:80,justifyContent:"center",alignItems:"center",borderRadius:10,borderWidth:1}}>
          
            <Text>Buy Again</Text>
            </Pressable>
            <Pressable
            style={{borderColor:"black",width:80,justifyContent:"center",alignItems:"center",borderRadius:10,borderWidth:1}}>
          
            <Text>List</Text>
            </Pressable>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  text: {
    padding: 10,
  },
  Image: {
    height: 50,
    width: 50,
    justifyContent: "center",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  modelText: {
    fontSize: 25,
    gap: 20,
  },
  modelTextOnly: {
    fontSize: 17,
  },

  fullWidthDropdown: {
    width: "98%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  bottomSheet: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },

  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
