import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

/**
 * A simple navigation bar with links to the main pages. The current
 * route is highlighted to give users feedback about which page
 * they're on. The cart link also displays a badge when there are
 * items in the cart.
 */
export default function NavBar() {
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart' },
    { to: '/chat', label: 'Chat' },
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            style={{
              position: 'relative',
              color: isActive ? '#1abc9c' : '#ecf0f1',
              fontWeight: isActive ? 'bold' : 'normal',
              padding: '0.5rem 1rem',
            }}
          >
            {item.label}
            {item.to === '/cart' && cartItems.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: '#e74c3c',
                  borderRadius: '50%',
                  width: '1.2rem',
                  height: '1.2rem',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}