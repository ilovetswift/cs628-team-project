import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a single category on the home page. When clicked it navigates
 * to the products page, pre-filtered by category. The card displays
 * an image, a title and a short description.
 */
export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/products?category=${encodeURIComponent(category.value)}`);
  }
  return (
    <div
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.1s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <img
        src={category.uri}
        alt={category.title}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <div style={{ padding: '0.5rem' }}>
        <h3 style={{ marginBottom: '0.25rem' }}>{category.title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>{category.description}</p>
      </div>
    </div>
  );
}