import {useDispatch, useSelector} from 'react-redux';
import { addToWish } from './redux/WishReducer';

export const useWishlistActions = () => {
    const dispatch = useDispatch();
    const wishItems = useSelector(state => state.wishlist.wishlist);

    const addItemToWish = (product) => {
        dispatch(addToWish(product));
    }

    return {addItemToWish};
}