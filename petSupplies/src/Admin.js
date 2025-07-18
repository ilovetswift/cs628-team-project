import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Collapsible } from "@/components/Collapsible";
import Settings from "./Settings";
import UserManagement from "./UserManagement";

export default function AdminScreen({
  settings,
  setSettings,
  users,
  setUsers,
  styles,
}) {
  return (
    <View style={styles.content}>
      <View style={styles.adminNavItem}>
        <MaterialCommunityIcons name="account-cog" size={28} color="#5433EB" />
        <Text style={styles.text}>Admin Page</Text>
      </View>
      <View style={styles.adminadminDivider} />
      <View style={styles.adminNavItem}>
        <MaterialCommunityIcons name="account" size={24} color="#888" />
        <Collapsible
          title="User Management"
          theme={settings.darkMode ? "dark" : "light"}
          style={styles}
        >
          <UserManagement users={users} setUsers={setUsers} styles={styles} settings={settings} />
        </Collapsible>
      </View>
      <View style={styles.adminDivider} />
      <View style={styles.adminNavItem}>
        <MaterialCommunityIcons
          name="application-settings-outline"
          size={24}
          color="#888"
        />
        <Collapsible
          title="Settings"
          theme={settings.darkMode ? "dark" : "light"}
          style={styles}
        >
          <Settings
            settings={settings}
            setSettings={setSettings}
            styles={styles}
          />
        </Collapsible>
      </View>
    </View>
  );
}
