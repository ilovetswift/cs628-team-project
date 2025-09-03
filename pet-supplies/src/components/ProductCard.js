import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Displays an individual product. Provides a button to add the
 * product to the cart by invoking the CartContext handler.
 */
export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />
      <div style={{ padding: '0.75rem', flexGrow: 1 }}>
        <h4 style={{ marginBottom: '0.5rem' }}>{product.name}</h4>
        <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.5rem' }}>
          {product.description}
        </p>
        <span style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={() => addToCart(product)}
          style={{
            marginTop: 'auto',
            padding: '0.5rem 1rem',
            backgroundColor: '#1abc9c',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}