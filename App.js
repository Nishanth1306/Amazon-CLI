import React, { useEffect } from 'react';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

const App = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted!');
      } else {
        console.log('Notification permission not granted!');
      }
    };

    const displayNotification = async (remoteMessage) => {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Notification',
        body: remoteMessage.notification?.body || 'You have a new message',
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    };

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground FCM message:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    requestUserPermission();

    return unsubscribe; 
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
        </UserContext>
      </PersistGate>
    </Provider>
  );
};
export default App;
