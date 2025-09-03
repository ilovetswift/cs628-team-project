import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Displays the current contents of the shopping cart. Users can
 * increment or decrement quantities or remove items entirely. The
 * page also calculates the total cost. In a real application this
 * would feed into a checkout process.
 */
export default function Cart() {
  const { cartItems, addToCart, removeFromCart, removeItemCompletely } =
    useContext(CartContext);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '1rem',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '1rem', borderRadius: '4px' }}
              />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ marginBottom: '0.25rem' }}>{item.name}</h4>
                <p style={{ fontSize: '0.85rem', color: '#555' }}>
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    backgroundColor: '#e74c3c',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    marginRight: '0.5rem',
                  }}
                >
                  –
                </button>
                <span style={{ minWidth: '1.5rem', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    backgroundColor: '#1abc9c',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => removeItemCompletely(item.id)}
                  style={{
                    marginLeft: '1rem',
                    padding: '0.3rem 0.6rem',
                    backgroundColor: '#95a5a6',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}