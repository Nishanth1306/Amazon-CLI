import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../redux/CartReducer';

export const useCartActions = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 5000);
  };

  const buyNow = () => {
    navigation.navigate('ConfirmationScreen');
  };

  return {
    addItemToCart,
    buyNow,
    addedToCart,
  };
};
