import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const dummyProducts = [
    {
      id: 1,
      title: 'Test',
      price: 5,
      description: 'This is a first product - amazing!'
    },
    {
      id: 2,
      title: 'Test 2',
      price: 10,
      description: 'This is a second product - awesome!'
    }
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          dummyProducts.map(product => 
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          )
        }
      </ul>
    </section>
  );
};

export default Products;
