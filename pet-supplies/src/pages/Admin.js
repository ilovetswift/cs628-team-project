import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * The admin page provides two simple management functions: a
 * dark‑mode toggle and a user management interface. Users are
 * persisted to localStorage. Each user consists of a username and
 * password. Simple validation enforces minimum lengths and alerts
 * the admin if a field is too short.
 */
export default function Admin() {
  const { isAdmin, login, logout } = useContext(AuthContext);
  // Read initial users from localStorage or seed with a default entry
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('users');
      return stored ? JSON.parse(stored) : [{ uname: 'test', password: 'testaroo' }];
    } catch (err) {
      return [{ uname: 'test', password: 'testaroo' }];
    }
  });
  // Dark mode setting
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch (err) {
      return false;
    }
  });
  // Persist users whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (err) {
      // no‑op
    }
  }, [users]);
  // Persist dark mode whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', darkMode.toString());
    } catch (err) {
      // no‑op
    }
    document.body.style.backgroundColor = darkMode ? '#222' : '#f7f7f7';
    document.body.style.color = darkMode ? '#ecf0f1' : '#333';
  }, [darkMode]);

  function addUser() {
    setUsers((prev) => [...prev, { uname: '', password: '' }]);
  }
  function updateUser(index, field, value) {
    setUsers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }
  function saveUser(index) {
    const u = users[index];
    const usernameMinLength = 3;
    const passwordMinLength = 5;
    if (!u.uname || u.uname.length < usernameMinLength) {
      alert(`Username is below the minimum length of ${usernameMinLength}`);
      return;
    }
    if (!u.password || u.password.length < passwordMinLength) {
      alert(`Password is below the minimum length of ${passwordMinLength}`);
      return;
    }
    // Nothing more to do because state already updated
    alert('User saved successfully');
  }
  function deleteUser(index) {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  }
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Admin</h2>
      {/* If not logged in, show login form */}
      {!isAdmin ? (
        <LoginForm onLogin={login} />
      ) : (
        <>
          <button
            onClick={logout}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#e74c3c',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Log Out
          </button>
          {/* Dark mode toggle */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              Enable dark mode
            </label>
          </div>
          {/* User management */}
          <h3>Users</h3>
          {users.map((user, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '0.75rem',
                borderRadius: '4px',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem' }}>Username:</label>
                  <input
                    type="text"
                    value={user.uname}
                    onChange={(e) => updateUser(index, 'uname', e.target.value)}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem' }}>Password:</label>
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) => updateUser(index, 'password', e.target.value)}
                    style={{ width: '100%', padding: '0.5rem' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => saveUser(index)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3498db',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => deleteUser(index)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#e74c3c',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addUser}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1abc9c',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Add User
          </button>
          {/* New product creation */}
          <h3 style={{ marginTop: '2rem' }}>Create New Product</h3>
          <NewProductForm />
        </>
      )}
    </div>
  );
}

// Login form for admin authentication
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid credentials');
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3498db',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Log In
      </button>
    </form>
  );
}

// Form to create a new product. Only collects the user‑provided
// fields; other fields are randomly generated on submit.
function NewProductForm() {
  const [petType, setPetType] = useState('dog');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('0');
  const [status, setStatus] = useState('');
  function randomObjectId() {
    return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // Build new product document
    const sku = 'SKU-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const variantId = 'VAR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const warehouseId = randomObjectId();
    const supplierId = randomObjectId();
    const payload = {
      pet_type: petType,
      name: name,
      description: description,
      sku: sku,
      variants: [
        {
          variant_id: variantId,
          price: parseFloat(price),
          stock: parseInt(stock || '0', 10),
          warehouse_id: warehouseId,
          image_url: imageUrl,
          attributes: {},
        },
      ],
      supplier_ids: [supplierId],
      tags: [],
      reorder_level: 0,
    };
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const res = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      await res.json();
      setStatus('Product created successfully');
      // reset form
      setName('');
      setDescription('');
      setPrice('0');
      setImageUrl('');
      setStock('0');
    } catch (err) {
      console.error('Failed to create product', err);
      setStatus('Failed to create product');
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Pet Type:</label>
        <select
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        >
          <option value="dog">dog</option>
          <option value="cat">cat</option>
          <option value="small-animal">small-animal</option>
          <option value="bird">bird</option>
          <option value="fish">fish</option>
          <option value="reptile">reptile</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          step="1"
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2ecc71',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Create
      </button>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </form>
  );
}