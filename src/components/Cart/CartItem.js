import { useDispatch } from 'react-redux';

import classes from './CartItem.module.css';
import { cartActions } from '../../store/cartSlice';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, total, price } = props.item;

  const incrementProductHandler = () => {
    dispatch(cartActions.incrementProduct(props.id))
  }

  const decrementProductHandler = () => {
    dispatch(cartActions.decrementProduct(props.id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementProductHandler}>-</button>
          <button onClick={incrementProductHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
