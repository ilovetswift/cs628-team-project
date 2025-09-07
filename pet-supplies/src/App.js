import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AddToCartRedirect from './pages/AddToCartRedirect';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Chat from './pages/Chat';

/**
 * The root component wires together the CartProvider and the router.
 * It lays out a navigation bar at the top and renders the
 * appropriate page below based on the current route. Additional
 * persistent UI elements could be added here (for example a
 * footer).
 */
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/cart/add/:id" element={<AddToCartRedirect />} />
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
