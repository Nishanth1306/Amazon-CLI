import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import ProductInfo from '../screens/ProductInfo';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import Profile from '../screens/Profile';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import LandingPage from '../screens/LandingPage';
import Language from '../screens/Language';
import MenuScreen from '../screens/MenuScreen';
import ProductListScreen from '../screens/ProductListScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import UserOrdersScreen from '../screens/UserOrdersScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AutoAddressForm from '../screens/AutoAddressForm';
import AutoPinScreen from '../screens/AutoPinScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="home" size={24} color="#008E97" />
            ) : (
              <Entypo name="home" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="You"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="person" size={24} color="#008E97" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <AntDesign name="shoppingcart" size={24} color="#008E97" />
            ) : (
              <AntDesign name="shoppingcart" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: 'Menu',
          tabBarLabelStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="menu" size={24} color="#008E97" />
            ) : (
              <Entypo name="menu" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Language"
          component={Language}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EditAddress"
          component={EditAddressScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AutoPinScreen"
          component={AutoPinScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UserOrders"
          component={UserOrdersScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{headerShown: false}}
      />

        <Stack.Screen
          name="UserAccount"
          component={UserAccountScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AutoAddressForm"
          component={AutoAddressForm}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CategoryProductsScreen"
          component={CategoryProductsScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default StackNavigator;
