import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

/**
 * A helper route that adds a product to the cart based on its ID
 * and then redirects the user to the cart page. It fetches the
 * current product list from the backend to retrieve the product
 * details (name, price, image). Without these details the cart
 * would display undefined values which cause errors when rendering.
 */
export default function AddToCartRedirect() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAndAdd() {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const res = await fetch(`${baseUrl}/products/${id}`);
      const prod = await res.json();
      const price = prod.variants?.[0]?.price ?? 0;
      const image = prod.variants[0].image_url
      addToCart({ id: prod._id, name: prod.name, price, image });
      navigate('/cart', { replace: true });
    }
    fetchAndAdd();
  }, []);

  return null;
}
