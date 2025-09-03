import React, { useState, useEffect } from 'react';

/**
 * The admin page provides two simple management functions: a
 * dark‑mode toggle and a user management interface. Users are
 * persisted to localStorage. Each user consists of a username and
 * password. Simple validation enforces minimum lengths and alerts
 * the admin if a field is too short.
 */
export default function Admin() {
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
    </div>
  );
}