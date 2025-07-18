import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeBar from "./src/HomeBar";
import TitlePage from "./src/TitlePage";
import ProductsScreen from "./src/ProductsScreen";
import AdminScreen from "./src/Admin";
import CartPanel from "./src/CartPanel";
import { CartProvider } from "./src/CartContext";
import { getStyleSheet } from "./src/styles";
import { defaultSettings, usersKey, settingsKey } from "./src/Settings";

const Tab = createBottomTabNavigator();

function Tabs({ settings, setSettings, users, setUsers, styles }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home">
        {() => <TitlePage styles={styles} />}
      </Tab.Screen>

      <Tab.Screen
        name="Products"
        options={{
          title: "All Products",
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Clear any old filter params when the tab is pressed
            navigation.setParams({
              category: null,
              categoryLabel: undefined,
            });
          },
        })}
      >
        {() => <ProductsScreen styles={styles} />}
      </Tab.Screen>

      <Tab.Screen name="Admin">
        {() => (
          <AdminScreen
            settings={settings}
            setSettings={setSettings}
            users={users}
            setUsers={setUsers}
            styles={styles}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [users, setUsers] = useState([{ uname: "test", password: "testaroo" }]);
  const [settings, setSettings] = useState(defaultSettings);
  const styles = getStyleSheet(settings.darkMode);
  useEffect(() => {
    try {
      AsyncStorage.getItem(usersKey, (err, storedUsers) => {
        if (storedUsers !== null) setUsers(JSON.parse(storedUsers));
      });
    } catch (error) {
      console.error(error);
      console.log(
        "Failed to get users from AsyncStorage. Creating new record."
      );
      AsyncStorage.setItem(usersKey, JSON.stringify(users));
    }
    try {
      AsyncStorage.getItem(settingsKey, (err, storedSettings) => {
        if (storedSettings !== null) setSettings(JSON.parse(storedSettings));
      });
    } catch (error) {
      console.log(
        "Failed to get settings from AsyncStorage. Creating new record."
      );
      AsyncStorage.setItem(settingsKey, JSON.stringify(settings));
    }
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CartProvider>
          <NavigationContainer>
            <HomeBar users={users} settings={settings} styles={styles} />
            <Tabs
              settings={settings}
              setSettings={setSettings}
              users={users}
              setUsers={setUsers}
              styles={styles}
            />
            <CartPanel />
          </NavigationContainer>
        </CartProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
