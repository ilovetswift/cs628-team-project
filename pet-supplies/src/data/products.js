// A small catalogue of products used by the web application. Each item
// includes a unique identifier, category, name, description, price
// and an image URL. In a real application this data could come from
// an API or database. Here it's kept inline for simplicity.

export const products = [
  // Dog supplies
  {
    id: 'dog-1',
    category: 'dog',
    name: 'Premium Dog Food',
    description: 'Nutritious kibble for adult dogs. Packed with vitamins and minerals.',
    price: 29.99,
    image:
      'https://images.unsplash.com/photo-1558944353-5c76b462d3ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dog-2',
    category: 'dog',
    name: 'Chew Toy',
    description: 'Durable rubber chew toy to keep your dog entertained.',
    price: 9.99,
    image:
      'https://images.unsplash.com/photo-1602528142839-f8bea7a7392b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dog-3',
    category: 'dog',
    name: 'Reflective Collar',
    description: 'Adjustable collar with reflective stitching for night-time safety.',
    price: 14.99,
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80',
  },
  // Cat supplies
  {
    id: 'cat-1',
    category: 'cat',
    name: 'Cat Tree',
    description: 'Multi-level cat tree with scratching posts and cozy hideaway.',
    price: 49.99,
    image:
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cat-2',
    category: 'cat',
    name: 'Feather Wand',
    description: 'Interactive feather toy for chasing and pouncing fun.',
    price: 6.49,
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cat-3',
    category: 'cat',
    name: 'Litter Box',
    description: 'Hooded litter box with carbon filter to reduce odours.',
    price: 24.99,
    image:
      'https://images.unsplash.com/photo-1576511459111-cf6bc8304e83?auto=format&fit=crop&w=400&q=80',
  },
  // Small animal supplies
  {
    id: 'small-1',
    category: 'small-animals',
    name: 'Hamster Cage',
    description: 'Spacious wire cage with tunnels and exercise wheel.',
    price: 39.99,
    image:
      'https://images.unsplash.com/photo-1504203703009-90e13fd7a51f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'small-2',
    category: 'small-animals',
    name: 'Bedding Pack',
    description: 'Soft, absorbent bedding made from recycled paper.',
    price: 7.99,
    image:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'small-3',
    category: 'small-animals',
    name: 'Food Pellets',
    description: 'Balanced diet formula for hamsters, gerbils and mice.',
    price: 4.99,
    image:
      'https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=400&q=80',
  },
  // Bird supplies
  {
    id: 'bird-1',
    category: 'bird',
    name: 'Bird Seed Mix',
    description: 'Premium seed blend for small and medium sized birds.',
    price: 12.49,
    image:
      'https://images.unsplash.com/photo-1510936111840-2c4fbaa1d89e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bird-2',
    category: 'bird',
    name: 'Cage Perch',
    description: 'Natural wood perch to keep your bird’s feet healthy.',
    price: 5.49,
    image:
      'https://images.unsplash.com/photo-1452573996663-1b8d3b5a9467?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bird-3',
    category: 'bird',
    name: 'Bird Bath',
    description: 'Clip-on bath for parakeets and finches to splash around.',
    price: 8.99,
    image:
      'https://images.unsplash.com/photo-1555685812-4b743bc98510?auto=format&fit=crop&w=400&q=80',
  },
  // Fish supplies
  {
    id: 'fish-1',
    category: 'fish',
    name: 'Aquarium Starter Kit',
    description: '10-gallon glass tank with filter, light and heater.',
    price: 74.99,
    image:
      'https://images.unsplash.com/photo-1516715094483-0f560fc40584?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fish-2',
    category: 'fish',
    name: 'Fish Flakes',
    description: 'Complete flake food for tropical fish.',
    price: 3.49,
    image:
      'https://images.unsplash.com/photo-1513944144817-04274b43b2fa?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fish-3',
    category: 'fish',
    name: 'Gravel Pack',
    description: 'Decorative aquarium gravel in assorted colours.',
    price: 14.99,
    image:
      'https://images.unsplash.com/photo-1548158293-08c9cdf9735c?auto=format&fit=crop&w=400&q=80',
  },
  // Reptile supplies
  {
    id: 'reptile-1',
    category: 'reptile',
    name: 'Heat Lamp',
    description: 'Adjustable heat lamp for desert reptiles.',
    price: 19.99,
    image:
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'reptile-2',
    category: 'reptile',
    name: 'Cave Hide',
    description: 'Natural looking hideaway for snakes and lizards.',
    price: 9.99,
    image:
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'reptile-3',
    category: 'reptile',
    name: 'Water Dish',
    description: 'Shallow water dish for easy access and cleaning.',
    price: 4.49,
    image:
      'https://images.unsplash.com/photo-1527176930608-09cb256ab504?auto=format&fit=crop&w=400&q=80',
  },
];