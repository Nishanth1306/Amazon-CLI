import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/CartReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'], 
};

const rootReducer = combineReducers({ 
  cart: cartReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
