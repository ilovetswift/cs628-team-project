import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from './CartContext';

const HomeBar = ({styles}) => {
  const { items, openCart } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.companyName}>Pawsh Pet Supplies</Text>
      <View style={styles.rightGroup}>
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityLabel="Cart"
          onPress={openCart}
        >
          <MaterialCommunityIcons name="cart-outline" size={24} color="#888" />
          {count > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeBar;
