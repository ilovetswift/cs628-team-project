import React from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useCart } from './CartContext';
import { getStyleSheet } from './styles';

export default function CartPanel() {
  const { items, removeItem, updateQuantity, isOpen, closeCart } = useCart();
  const styles = getStyleSheet();

  const renderItem = ({ item }) => {
    const imageUrl = item.imageUrl || item.image_url || item.variants?.[0]?.image_url;

    return (
      <View style={panelStyles.item}>
        {imageUrl && (
          <Image source={{ uri: imageUrl }} style={panelStyles.image} />
        )}
        <View style={panelStyles.info}>
          <Text style={panelStyles.title}>{item.name}</Text>
          <Text>${item.price}</Text>
          <View style={panelStyles.qtyRow}>
            <TouchableOpacity
              style={panelStyles.qtyButton}
              onPress={() => updateQuantity(item.sku, Math.max(item.quantity - 1, 1))}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={panelStyles.qty}>{item.quantity}</Text>
            <TouchableOpacity
              style={panelStyles.qtyButton}
              onPress={() => updateQuantity(item.sku, item.quantity + 1)}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeItem(item.sku)}>
              <Text style={panelStyles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={closeCart}
    >
      <Pressable style={panelStyles.overlay} onPress={closeCart}>
        <Pressable style={panelStyles.container} onPress={() => {}}>
          {items.length === 0 ? (
            <Text style={panelStyles.empty}>Cart is empty</Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item.sku}
              renderItem={renderItem}
              contentContainerStyle={{ padding: 16 }}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const panelStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#5433EB',
    marginBottom: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    paddingHorizontal: 8,
  },
  qty: {
    marginHorizontal: 4,
  },
  remove: {
    color: '#d00',
    marginLeft: 16,
  },
  empty: {
    padding: 16,
    textAlign: 'center',
  },
});
