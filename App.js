import React from 'react';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

const App = () => {
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
