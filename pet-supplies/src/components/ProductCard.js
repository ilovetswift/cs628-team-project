import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

/**
 * Displays an individual product. Provides a button to add the
 * product to the cart by invoking the CartContext handler.
 */
export default function ProductCard({ product, onDelete, onUpdate }) {
  const { addToCart } = useContext(CartContext);
  const { isAdmin } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    stock: product.stock,
    pet_type: product.category,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function saveEdit() {
    // Build update payload matching the server schema
    // Generate random 24‑char hex string for ids when missing
    const randomObjectId = () =>
      Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const warehouseId = product.warehouse_id || randomObjectId();
    const supplierIds =
      product.supplier_ids && product.supplier_ids.length > 0
        ? product.supplier_ids
        : [randomObjectId()];
    const payload = {
      // keep original serverId to locate document
      _id: product.serverId,
      pet_type: form.pet_type,
      name: form.name,
      description: form.description,
      sku: product.id.split('-')[0] || '',
      variants: [
        {
          variant_id: product.id.split('-')[1] || product.id.split('-')[0],
          price: parseFloat(form.price),
          stock: parseInt(form.stock || '0', 10),
          warehouse_id: warehouseId,
          image_url: form.image,
          attributes: {},
        },
      ],
      supplier_ids: supplierIds,
      tags: product.tags || [],
      reorder_level: product.reorder_level || 0,
    };
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const res = await fetch(`${baseUrl}/products/${product.serverId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const updated = await res.json();
      // Map updated product using same mapping logic
      const updatedMapped = {
        ...product,
        name: updated.name || form.name,
        description: updated.description || form.description,
        price: form.price,
        image: form.image,
        stock: form.stock,
        category: form.pet_type,
      };
      onUpdate && onUpdate(updatedMapped);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update product', err);
      alert('Failed to update product');
    }
  }

  async function deleteItem() {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const res = await fetch(`${baseUrl}/products/${product.serverId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      onDelete && onDelete(product.id);
    } catch (err) {
      console.error('Failed to delete product', err);
      alert('Failed to delete product');
    }
  }

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
      {/* Display edit form or static view */}
      {!editMode ? (
        <>
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
            <span
              style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}
            >
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
            {isAdmin && (
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    backgroundColor: '#f39c12',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={deleteItem}
                  style={{
                    padding: '0.4rem 0.8rem',
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
            )}
          </div>
        </>
      ) : (
        // Edit mode
        <div style={{ padding: '0.75rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.25rem' }}>
            Pet Type:
            <select
              name="pet_type"
              value={form.pet_type}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            >
              <option value="dog">dog</option>
              <option value="cat">cat</option>
              <option value="small-animal">small-animal</option>
              <option value="bird">bird</option>
              <option value="fish">fish</option>
              <option value="reptile">reptile</option>
            </select>
          </label>
          <label style={{ marginBottom: '0.25rem' }}>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
          <label style={{ marginBottom: '0.25rem' }}>
            Description:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
          <label style={{ marginBottom: '0.25rem' }}>
            Price:
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              step="0.01"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
          <label style={{ marginBottom: '0.25rem' }}>
            Image URL:
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
          <label style={{ marginBottom: '0.25rem' }}>
            Stock:
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              step="1"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </label>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={saveEdit}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: '#2ecc71',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: '#95a5a6',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}