import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Utility to map server results into the shape expected by ProductCard.
function mapProduct(doc) {
  // Attempt to derive a price and image from the first variant.
  const firstVariant = Array.isArray(doc.variants) && doc.variants.length > 0 ? doc.variants[0] : null;
  return {
    id:
      doc.sku + (firstVariant && firstVariant.variant_id ? `-${firstVariant.variant_id}` : ''),
    category: doc.pet_type || '',
    name: doc.name || '',
    description: doc.description || '',
    price: firstVariant && firstVariant.price ? Number(firstVariant.price) : 0,
    image:
      (firstVariant && firstVariant.image_url) || doc.image_url ||
      'https://via.placeholder.com/300x200.png?text=No+Image',
    stock: firstVariant && typeof firstVariant.stock !== 'undefined' ? Number(firstVariant.stock) : undefined,
    serverId: doc._id, // preserve MongoDB identifier for updates/deletes
  };
}

/**
 * Displays a catalogue of products. Accepts an optional `category`
 * query parameter which filters the list down to a single
 * category. A simple heading indicates which category is being
 * viewed, or defaults to "All Products". Products are arranged
 * responsively in a grid.
 */
export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Build query string for pet type if provided. Map our slug for
    // small animals to the singular form used by the API.
    let petType = category;
    if (petType === 'small-animals') petType = 'small-animal';
    const params = petType ? `?petType=${encodeURIComponent(petType)}` : '';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    const url = `${baseUrl}/products${params}`;
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data.map((doc) => mapProduct(doc)));
        } else {
          setItems([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  // Derive a heading from the category slug
  const heading = category
    ? category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Supplies'
    : 'All Products';

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>{heading}</h2>
      {loading && <p>Loading products…</p>}
      {error && !loading && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && items.length === 0 && !error && <p>No products found.</p>}
      {!loading && items.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {items.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onDelete={(id) =>
                setItems((prev) => prev.filter((p) => p.id !== id))
              }
              onUpdate={(updated) =>
                setItems((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}