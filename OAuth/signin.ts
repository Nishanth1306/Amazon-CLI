//   import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';
// import { Web_ClientId } from './key';
  
//   GoogleSignin.configure({
//     webClientId: Web_ClientId, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
//     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     hostedDomain: '', // specifies a hosted domain restriction
//     forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
//     accountName: '', // [Android] specifies an account name on the device that should be used
//     //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//     // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
//     // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//     // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
//   });
  
  
 
//   export const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();
//       if (response) {
//         console.log({userInfo: response.data});
//       } else {
//         console.log("error Occured");
//       }
//     } catch (error) {
//       if (error) {
//         switch (error.code) {
//           case statusCodes.IN_PROGRESS:
           
//             break;
//           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            
//             break;
//           default:
       
//         }
//       } else {
        
//       }
//     }
//   };


import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
  import { Web_ClientId } from './key';
  
  GoogleSignin.configure({
    webClientId: Web_ClientId, // Web client ID from Firebase console
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // optional, adjust as needed
    offlineAccess: true, // allows server access (useful for Firebase)
  });
  
  export const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({ userInfo }); // You had `response.data`, but `signIn()` returns the user info directly
      // You can now send userInfo.idToken to Firebase or your backend
    } catch (error) {
      console.error('Google Sign-In error:', error);
  
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('User cancelled the sign-in');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('Sign-in already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Google Play Services not available');
          break;
        default:
          console.log('Some other error:', error);
          break;
      }
    }
  };
  