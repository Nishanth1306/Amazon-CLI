// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './redux/CartReducer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist';
// import { combineReducers } from 'redux';
// import WishReducer from './redux/WishReducer';


// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['cart'], 
// };

// const rootReducer = combineReducers({ 
//   cart: cartReducer,
// });


// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);


import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/CartReducer';
import WishReducer from './redux/WishReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'wishlist'], // ✅ Add wishlist here
};

// Combine all reducers
const rootReducer = combineReducers({ 
  cart: cartReducer,
  wishlist: WishReducer, // ✅ Register wishlist reducer
});

// Apply persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necessary for redux-persist with AsyncStorage
    }),
});

export const persistor = persistStore(store);
