import {
  View,
  Button,
  Text,
  TextInput,
  TouchableHighlight
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";

const darkBG = Colors.dark.background;
const lightBG = Colors.light.background;
const darkText = Colors.dark.text;
const lightText = Colors.light.text;

export const defaultSettings = {
  darkMode: false,
  passwordMinLength: 8,
  usernameMinLength: 8,
};
export const settingsKey = "settings";

export default function Settings({ settings, setSettings, styles }) {
  function saveSettings() {
    try {
      AsyncStorage.setItem(settingsKey, settings);
    } catch (error) {
      console.error("Failed to persist settings.", error);
    }
  }

  function revertSettings() {
    setSettings(defaultSettings);
  }

  return (
    <View>
      <View>
        <TouchableHighlight
          onPress={() =>
            setSettings({ ...settings, darkMode: !settings.darkMode })
          }
          style={{ width: "fit-content" }}
        >
          <View>
            <Text
              style={{
                ...styles.settingsLabelText,
                backgroundColor: settings.darkMode ? lightBG : darkBG,
                color: settings.darkMode ? lightText : darkText,
              }}
            >
              Dark Mode {settings.darkMode ? "ON" : "OFF"}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <View>
        <Text style={styles.settingsLabelText}>Password Minimum Length</Text>
        <TextInput
          keyboardType="numeric"
          inputMode="numeric"
          borderColor="black"
          value={settings.passwordMinLength}
          maxLength={2}
          onChangeText={(val) =>
            setSettings({
              ...settings,
              passwordMinLength: val.replace(/[^0-9]/g, ""),
            })
          }
          style={{...styles.textInput, width: '2em'}}
        />
      </View>
      <View>
        <Text style={styles.settingsLabelText}>Username Minimum Length</Text>
        <TextInput
          keyboardType="numeric"
          inputMode="numeric"
          borderColor="black"
          value={settings.usernameMinLength}
          maxLength={2}
          onChangeText={(val) =>
            setSettings({
              ...settings,
              usernameMinLength: val.replace(/[^0-9]/g, ""),
            })
          }
          style={{...styles.textInput, width: '2em'}}
        />
      </View>
      <View style={styles.settingsButtonContainer}>
        <Button title="Save" onPress={saveSettings} />
        <Button title="Revert to default" onPress={revertSettings} />
      </View>
    </View>
  );
}
