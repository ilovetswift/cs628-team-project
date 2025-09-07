import React from 'react';
import CategoryCard from '../components/CategoryCard';

// Static category definitions reused from the original React Native
// TitlePage. Each entry holds an image URL, a human friendly title,
// descriptive text and a slug value used for filtering products.
const categories = [
  {
    uri: 'https://i.ebayimg.com/images/g/vAgAAOSwwzdlWVIB/s-l400.jpg',
    title: 'Dog Supplies',
    description: 'Everything your canine companion needs.',
    value: 'dog',
  },
  {
    uri: 'https://m.media-amazon.com/images/I/81KeIEZxn0L.jpg',
    title: 'Cat Supplies',
    description: 'Spoil your feline friend with our curated selection.',
    value: 'cat',
  },
  {
    uri: 'https://m.media-amazon.com/images/I/717aF64VhSL._AC_UF1000,1000_QL80_.jpg',
    title: 'Small Animal Supplies',
    description: 'Discover products for all your furry companions.',
    value: 'small-animals',
  },
  {
    uri: 'https://m.media-amazon.com/images/I/61w+Xq0K-ZL._AC_UF1000,1000_QL80_.jpg',
    title: 'Bird Supplies',
    description: 'Feed and care for your feathered friends.',
    value: 'bird',
  },
  {
    uri: 'https://m.media-amazon.com/images/I/81bwBeErdyL._AC_UF1000,1000_QL80_.jpg',
    title: 'Fish & Aquatic Supplies',
    description: 'Aquariums, food, and accessories for your fish.',
    value: 'fish',
  },
  {
    uri: 'https://i.ebayimg.com/images/g/KEQAAOSwAr1k9weF/s-l1200.jpg',
    title: 'Reptile Supplies',
    description: 'Enclosures, heating, hides, and accessories for snakes.',
    value: 'reptile',
  },
];

// Vendor logos displayed near the bottom of the page
const vendorLogos = [
  { uri: 'https://logo.clearbit.com/purina.com', alt: 'Purina' },
  { uri: 'https://logo.clearbit.com/hartz.com', alt: 'Hartz' },
  { uri: 'https://logo.clearbit.com/kongcompany.com', alt: 'Kong' },
  { uri: 'https://logo.clearbit.com/pedigree.com', alt: 'Pedigree' },
  { uri: 'https://logo.clearbit.com/bluebuffalo.com', alt: 'Blue Buffalo' },
];

export default function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      {/* Categories grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.value} category={cat} />
        ))}
      </div>

      {/* Vendor logos */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {vendorLogos.map((vendor) => (
          <img
            key={vendor.uri}
            src={vendor.uri}
            alt={vendor.alt}
            style={{ width: '120px', height: '60px', objectFit: 'contain' }}
          />
        ))}
      </div>

      {/* Testimonial */}
      <div style={{ marginTop: '2rem', textAlign: 'center', fontStyle: 'italic' }}>
        "Great service! My pets love their products." – Jane Doe
      </div>
    </div>
  );
}