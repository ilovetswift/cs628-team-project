import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const vendorLogos = [
  { uri: 'https://logo.clearbit.com/purina.com' },
  { uri: 'https://logo.clearbit.com/hartz.com' },
  { uri: 'https://logo.clearbit.com/kongcompany.com' },
  { uri: 'https://logo.clearbit.com/pedigree.com' },
  { uri: 'https://logo.clearbit.com/bluebuffalo.com' },
];

const testimonial = {
  text: 'Great service! My pets love their products.',
  name: 'Jane Doe',
};

function getRows(arr, itemsPerRow) {
  const rows = [];
  for (let i = 0; i < arr.length; i += itemsPerRow) {
    rows.push(arr.slice(i, i + itemsPerRow));
  }
  return rows;
}

export default function TitlePage({styles}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  const navigation = useNavigation();

  const categoryRows = getRows(categories, 3);

  const onPressCategory = (cat) => {
    navigation.jumpTo('Products', {
      category: cat.value,
      categoryLabel: cat.title,
    });
  };

  return (
    <ScrollView
      style={styles.titlePageContainer}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
    >
      {/* Banner */}
      <View style={styles.titlePageBanner}>
        <Text style={styles.titlePageBannerText}>
          15% OFF your first order! Use code{' '}
          <Text style={styles.titlePageCode}>WELCOME15</Text>
        </Text>
      </View>

      {/* Categories Grid */}
      {categoryRows.map((row, rowIdx) => (
        <View
          style={[titleStyles.row, rowIdx === 1 && { marginTop: 10 }]}
          key={rowIdx}
        >
          {row.map((cat, idx) => (
            <TouchableOpacity
              key={idx}
              style={titleStyles.col}
              activeOpacity={0.8}
              onPress={() => onPressCategory(cat)}
            >
              <Image
                source={{ uri: cat.uri }}
                style={[titleStyles.image, isMobile && titleStyles.imageMobile]}
              />
              <Text style={styles.titlePageTitle}>{cat.title}</Text>
              <Text style={styles.titlePageDesc}>{cat.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Spacer to push footer down */}
      <View style={{ flex: 1 }} />

      {/* Vendor Logos */}
      <View style={titleStyles.vendorLogoRow}>
        {vendorLogos.map((vendor, idx) => (
          <View key={idx} style={titleStyles.vendorLogoBox}>
            <Image
              source={{
                uri: vendor.uri,
                headers: {
                  Accept: 'image/webp,image/*,*/*;q=0.8',
                  'User-Agent': 'Mozilla/5.0',
                },
              }}
              style={[styles.titlePageVendorLogoLarge, isMobile && titleStyles.vendorLogoMobile]}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>

      {/* Testimonial */}
      <View style={styles.titlePageTestimonialBox}>
        <Text style={styles.titlePageTestimonialText}>"{testimonial.text}"</Text>
        <Text style={styles.titlePageTestimonialName}>- {testimonial.name}</Text>
      </View>
    </ScrollView>
  );
}

const titleStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  col: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  imageMobile: {
    width: 90,
    height: 90,
  },
  vendorLogoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 40,
  },
  vendorLogoBox: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 120,
  },
  vendorLogoMobile: {
    width: 150,
    height: 80,
    marginVertical: 10,
  },
});
