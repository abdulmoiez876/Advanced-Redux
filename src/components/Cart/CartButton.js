import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(state => state.cart.cartTotal);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartTotal}</span>
    </button>
  );
};

export default CartButton;
