import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData, fetchCartData } from './store/cartSlice';

var isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const changed = useSelector(state => state.cart.changed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    else if(changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch])

  return (
    <Layout>
      {showCart &&
        <Cart />
      }
      <Products />
    </Layout>
  );
}

export default App;
