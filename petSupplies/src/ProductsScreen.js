import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_BASE_URL } from '@/constants/Config';
import { getStyleSheet } from './styles';
import { useCart } from './CartContext';

export default function ProductsScreen() {
  const route = useRoute();
  const initialCategory = route.params?.category ?? null;

  const [petType, setPetType] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const styles = getStyleSheet();
  const { addItem } = useCart();

  useEffect(() => {
    const newCat = route.params?.category ?? null;
    if (newCat !== petType) {
      setPetType(newCat);
    }
  }, [route.params?.category]);

  useEffect(() => {
    const url = petType
      ? `${API_BASE_URL}/products?petType=${encodeURIComponent(petType)}`
      : `${API_BASE_URL}/products`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setError(null);
      })
      .catch(err => {
        console.error('Failed to load products', err);
        setError('Failed to load products');
      });
  }, [petType]);

  if (error) {
    return (
      <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={screenStyles.error}>{error}</Text>
      </View>
    );
  }

  const petTypes = [
    { label: 'All', value: null },
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Small Animals', value: 'small-animals' },
    { label: 'Bird', value: 'bird' },
    { label: 'Fish', value: 'fish' },
    { label: 'Reptile', value: 'reptile' },
  ];

  const renderItem = ({ item }) => {
    const imageUrl = item.variants?.[0]?.image_url;
    const price = item.variants?.[0]?.price;
    return (
      <View style={screenStyles.item}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={screenStyles.image} />}
        <View style={screenStyles.details}>
          <Text style={screenStyles.title}>{item.name}</Text>
          <Text>{item.description}</Text>
          {price != null && <Text style={screenStyles.price}>${price}</Text>}
          <TouchableOpacity
            style={screenStyles.addButton}
            onPress={() =>
              addItem({
                sku: item.sku,
                name: item.name,
                price,
                imageUrl,
              })
            }
          >
            <Text style={screenStyles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.content}>
      {initialCategory && petType === initialCategory && (
        <Text style={screenStyles.inPageTitle}>
          {route.params.categoryLabel}
        </Text>
      )}
      {/* Filter bar */}
      <View style={screenStyles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={screenStyles.filtersContent}
        >
          {petTypes.map(t => {
            const active = petType === t.value;
            return (
              <TouchableOpacity
                key={t.value ?? 'all'}
                style={[
                  screenStyles.filterButton,
                  active && screenStyles.filterButtonActive,
                ]}
                onPress={() => setPetType(t.value)}
              >
                <Text
                  style={[
                    screenStyles.filterButtonText,
                    active && screenStyles.filterButtonTextActive,
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.sku}-${index}`}
        contentContainerStyle={screenStyles.list}
        renderItem={renderItem}
      />
    </View>
  );
}

const screenStyles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#5433EB',
  },
  price: {
    marginTop: 4,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#5433EB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filtersContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginBottom: 8,
    zIndex: 1,
  },
  filtersContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    paddingVertical: 8,
    marginTop: 8,
  },
  filterButton: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  filterButtonActive: {
    backgroundColor: '#5433EB',
  },
  filterButtonText: {
    color: '#333',
    textTransform: 'capitalize',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  error: {
    color: 'red',
    padding: 16,
  },
  inPageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    color: '#5433EB',
    textAlign: 'center',
  },
});
