import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from "./redux/CartReducer";
import {useNavigation} from '@react-navigation/native';



export const useCartActions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);

  const addItemToCart = (product) => {
    dispatch(addToCart(product));
  };

  const buyNow = () => {
    navigation.navigate('ConfirmationScreen');
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return { addItemToCart, buyNow, isProductInCart };
};