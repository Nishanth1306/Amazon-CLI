import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import config from '../src/config.js';
import {CommonActions} from '@react-navigation/native';
<<<<<<< HEAD
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signIn } from '../OAuth/signin.ts';


=======

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '534135288686-c39dv0vl3tfiv6mrpi876ebtadtdsr5c.apps.googleusercontent.com',
  androidClientId: '534135288686-1u2uha26gm8kdtdne0r3ekhcd9uh8u32.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});
>>>>>>> 0e03bad458ea318d0d3971c8371694d800c08ab5

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Main'}],
            }),
          );
        }
      } catch (err) {
        console.log('error message', err);
      }
    };
    checkLoginStatus();
  }, []);

<<<<<<< HEAD
=======

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };
  

>>>>>>> 0e03bad458ea318d0d3971c8371694d800c08ab5
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`${config.API_URL}/login`, user)
      .then(async response => {
        const token = response.data.token;
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userType', 'registered');

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Main'}],
          }),
        );
      })
      .catch(error => {
        const errorMessage =
          error.response?.data?.message || 'Something went wrong during login';

        Alert.alert('Login Error', errorMessage);
        console.log('Login failed:', error);
      });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View>
        <Image
          style={{width: 150, height: 100, marginTop: 15}}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
          onError={e => console.log('Image Load Error:', e.nativeEvent.error)}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42',
            }}>
            Login to Your Account
          </Text>
        </View>

        <View style={{marginTop: 70}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <MaterialCommunityIcons
              style={{marginLeft: 8}}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={{
                color: 'grey',
                marginVertical: 7,
                width: 300,
                fontSize: 16,
              }}
              placeholder="Enter Email"
            />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#D0D0D0',
              borderRadius: 5,
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <MaterialIcons name="password" size={24} color="black" />

            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              style={{
                color: 'grey',
                marginVertical: 7,
                width: 240,
                fontSize: 16,
                marginLeft: 10,
                flex: 1,
              }}
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
  
         
          ;
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{color: '#007fff', fontWeight: '500'}}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>

        <View style={{marginTop: 50}} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: '#febe10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}>
          <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
            Login
          </Text>
        </Pressable>

       

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center'}}>
            Don't have an account? Sign up
          </Text>
        </Pressable>

        <GoogleSigninButton
<<<<<<< HEAD
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            //disabled={isInProgress}
          />
=======
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
>>>>>>> 0e03bad458ea318d0d3971c8371694d800c08ab5
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Login;
