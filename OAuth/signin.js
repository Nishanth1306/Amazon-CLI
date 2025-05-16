// import { useState } from 'react';
// import { View, Pressable } from 'react-native';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';


// GoogleSignin.configure({
// 	webClientId: 534135288686-c39dv0vl3tfiv6mrpi876ebtadtdsr5c.apps.googleusercontent.com,
// 	androidClientId: 534135288686-1u2uha26gm8kdtdne0r3ekhcd9uh8u32.apps.googleusercontent.com,
// 	//iosClientId: GOOGLE_IOS_CLIENT_ID,
// 	scopes: ['profile', 'email'],
// });

// const GoogleLogin = async () => {
// 	await GoogleSignin.hasPlayServices();
// 	const userInfo = await GoogleSignin.signIn();
// 	return userInfo;
// };

// export default function App() {
// 	const [error, setError] = useState('');
// 	const [loading, setLoading] = useState(false);

// 	const handleGoogleLogin = async () => {
// 		setLoading(true);
// 		try {
// 			const response = await GoogleLogin();
// 			const { idToken, user } = response;

// 			if (idToken) {
// 				const resp = await authAPI.validateToken({
// 					token: idToken,
// 					email: user.email,
// 				});
// 				await handlePostLoginData(resp.data);
// 			}
// 		} catch (apiError) {
// 			setError(
// 				apiError?.response?.data?.error?.message || 'Something went wrong'
// 			);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<View>
// 			<Pressable onPress={handleGoogleLogin}>Continue with Google</Pressable>
// 		</View>
// 	);
// }


import React, { useState } from 'react';
import { View, Pressable, Text, ActivityIndicator } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// ✅ Configure Google Sign-In once
GoogleSignin.configure({
  webClientId: '534135288686-c39dv0vl3tfiv6mrpi876ebtadtdsr5c.apps.googleusercontent.com',
  androidClientId: '534135288686-1u2uha26gm8kdtdne0r3ekhcd9uh8u32.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

// ✅ Google sign-in function
const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

// ✅ Reusable SignIn component
export function SignIn({ onLoginSuccess, authAPI, handlePostLoginData }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;

      if (idToken) {
        const resp = await authAPI.validateToken({
          token: idToken,
          email: user.email,
        });
        await handlePostLoginData(resp.data);
        onLoginSuccess?.(resp.data); // optional callback if needed
      }
    } catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Pressable onPress={handleGoogleLogin} disabled={loading}>
        <Text>{loading ? 'Signing in...' : 'Continue with Google'}</Text>
      </Pressable>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      {loading && <ActivityIndicator />}
    </View>
  );
}
