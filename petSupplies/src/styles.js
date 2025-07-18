import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/constants/Colors";

const baseCollapsibleContainer = {
  flex: 1,
};

const baseContentStyles = {
  flex: 1,
};

const baseSettingsButton = { padding: 5, width: "fit-content", border: 2 };

const baseSettingsLabelText = { fontSize: 18, padding: 5 };

const baseSettingsButtonContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "10px",
  marginBottom: "10px",
  width: "100%",
};

const baseAdminContainer = {
  flex: 1,
  alignItems: "stretch",
  justifyContent: "center",
  paddingHorizontal: 32,
};

const baseAdminNavItem = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 16,
  marginLeft: 4,
  marginRight: 4,
  width: "max-content",
};

const baseAdminText = {
  fontSize: 24,
  fontWeight: "bold",
  marginLeft: 12,
  color: "#5433EB",
};

const baseAdminSubText = { fontSize: 18, marginLeft: 12, color: "#333" };

const baseAdminDivider = {
  height: 1,
  marginVertical: 4,
};

const baseContainer = {
  height: 60,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#dddddd",
};

const baseCompanyName = {
  fontSize: 20,
  fontWeight: "bold",
  color: "#5433EB",
};

const baseRightGroup = {
  flexDirection: "row",
  alignItems: "center",
};

const baseIconButton = {
  marginLeft: 8,
  padding: 6,
  borderRadius: 20,
};

const baseTextInput = {
  ...baseSettingsLabelText,
  borderWidth: "1px",
  marginBottom: ".2em",
  marginTop: "em"
}

const baseTextInputLabel = {
  ...baseSettingsLabelText,
  alignContent: "center"
}

const mobileOverrides = Platform.OS === 'web' ? {} : {
  baseSettingsButton: { padding: 5, borderWidth: 1 },
  baseSettingsLabelText: { fontSize: 18, padding: 5 },
  baseSettingsButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  baseAdminNavItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    marginLeft: 4,
    marginRight: 4,
  },
  baseTextInput: {
    fontSize: 18,
    padding: 5,
    borderWidth: 1,
    marginBottom: 4,
    marginTop: 4,
  },
};

const baseTitlePageContainer = {
  padding: 24,
};

const baseTitlePageBanner = {
  paddingVertical: 12,
  borderRadius: 10,
  marginBottom: 20,
  alignItems: "center",
};

const baseTitlePageBannerText = {
  fontWeight: "bold",
  fontSize: 16,
};

const baseTitlePageCode = {
  fontWeight: "bold",
  fontSize: 16,
};
const baseTitlePageImage = {
  width: 140,
  height: 140,
  borderRadius: 18,
};

const baseTitlePageDesc = {
  marginTop: 4,
  fontSize: 14,
  textAlign: "center",
};

const baseTitlePageVendorLogoLarge = {
  width: 120,
  height: 60,
  padding: 16,
  borderRadius: 10,
};

const baseTitlePageTestimonialBox = {
  marginTop: 32,
  borderRadius: 12,
  padding: 20,
  alignItems: "center",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 2,
};

const baseTitlePageTestimonialText = {
  fontStyle: "italic",
  fontSize: 16,
  textAlign: "center",
  marginBottom: 8,
};

const baseTitlePageTestimonialName = {
  fontWeight: "bold",
  fontSize: 15,
  textAlign: "center",
};

const baseTitlePageTitle = {
  marginTop: 12,
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
};

const lightStyleSheet = StyleSheet.create({
  titlePageContainer: {
    ...baseTitlePageContainer,
    backgroundColor: Colors.light.background,
  },
  titlePageBanner: {
    ...baseTitlePageBanner,
    backgroundColor: Colors.light.background,
  },
  titlePageBannerText: {
    ...baseTitlePageBannerText,
    color: Colors.light.titlePageBannerText,
  },
  titlePageCode: {
    ...baseTitlePageCode,
    color: Colors.light.titlePageCode,
  },
  titlePageImage: {
    ...baseTitlePageImage,
    backgroundColor: Colors.light.titlePageImage,
  },
  titlePageDesc: {
    ...baseTitlePageDesc,
    color: Colors.light.titlePageDesc,
  },
  titlePageVendorLogoLarge: {
    ...baseTitlePageVendorLogoLarge,
    backgroundColor: Colors.light.titlePageVendorLogoLarge,
  },
  titlePageTestimonialBox: {
    ...baseTitlePageTestimonialBox,
    backgroundColor: Colors.light.titlePageTestimonialBoxBG,
    shadowColor: Colors.light.titlePageTestimonialBoxShadow,
  },
  titlePageTestimonialText: {
    ...baseTitlePageTestimonialText,
    color: Colors.light.text,
  },
  titlePageTestimonialName: {
    ...baseTitlePageTestimonialName,
    color: Colors.light.titlePageTestimonialName,
  },
  titlePageTitle: {
    ...baseTitlePageTitle,
    color: Colors.light.titlePageTitle,
  },
  collapsibleContainer: {
    ...baseCollapsibleContainer,
    backgroundColor: Colors.light.background,
  },
  content: {
    ...baseContentStyles,
    backgroundColor: Colors.light.background,
  },
  settingsButton: {
    ...baseSettingsButton,
    ...(mobileOverrides.baseSettingsButton || {}),
    color: Colors.light.text,
    backgroundColor: Colors.light.background,
  },
  settingsLabelText: {
    ...baseSettingsLabelText,
    ...(mobileOverrides.baseSettingsLabelText || {}),
    color: Colors.light.text,
    backgroundColor: Colors.light.background,
  },
  settingsButtonContainer: {
    ...baseSettingsButtonContainer,
    ...(mobileOverrides.baseSettingsButtonContainer || {}),
    backgroundColor: Colors.light.background,
  },
  adminContainer: {
    ...baseAdminContainer,
    backgroundColor: Colors.light.background,
  },
  adminNavItem: {
    ...baseAdminNavItem,
    ...(mobileOverrides.baseAdminNavItem || {}),
    backgroundColor: Colors.light.background,
  },
  adminText: {
    ...baseAdminText,
    color: Colors.light.text,
  },
  adminSubText: {
    ...baseAdminSubText,
    color: Colors.light.text,
  },
  adminDivider: {
    ...baseAdminDivider,
    backgroundColor: Colors.dark.background,
  },
  text: {
    color: Colors.light.text,
  },
  container: {
    ...baseContainer,
    backgroundColor: Colors.light.background
  },
  companyName: {
    ...baseCompanyName,
    backgroundColor: Colors.light.background
  },
  rightGroup: {
    ...baseRightGroup,
    backgroundColor: Colors.light.background
  },
  iconButton: {
    ...baseIconButton
  },
  textInputLabel: {
    ...baseTextInputLabel,
    color: Colors.light.text
  },
  textInput: {
    ...baseTextInput,
    ...(mobileOverrides.baseTextInput || {}),
    borderColor: Colors.dark.background,
    color: Colors.light.text
  },
  userContainer: {
    padding: 5,
    marginBottom: '5px',
    borderBottomWidth: '1px',
    borderBottomColor: Colors.light.tint,
  }
});

const darkStyleSheet = StyleSheet.create({
  titlePageContainer: {
    ...baseTitlePageContainer,
    backgroundColor: Colors.dark.background,
  },
  titlePageBanner: {
    ...baseTitlePageBanner,
    backgroundColor: Colors.dark.background,
  },
  titlePageBannerText: {
    ...baseTitlePageBannerText,
    color: Colors.dark.titlePageBannerText,
  },
  titlePageCode: {
    ...baseTitlePageCode,
    color: Colors.dark.titlePageCode,
  },
  titlePageImage: {
    ...baseTitlePageImage,
    backgroundColor: Colors.dark.titlePageImage,
  },
  titlePageDesc: {
    ...baseTitlePageDesc,
    color: Colors.dark.titlePageDesc,
  },
  titlePageVendorLogoLarge: {
    ...baseTitlePageVendorLogoLarge,
    backgroundColor: Colors.dark.titlePageVendorLogoLarge,
  },
  titlePageTestimonialBox: {
    ...baseTitlePageTestimonialBox,
    backgroundColor: Colors.dark.titlePageTestimonialBoxBG,
    shadowColor: Colors.dark.titlePageTestimonialBoxShadow,
  },
  titlePageTestimonialText: {
    ...baseTitlePageTestimonialText,
    color: Colors.dark.text,
  },
  titlePageTestimonialName: {
    ...baseTitlePageTestimonialName,
    color: Colors.dark.titlePageTestimonialName,
  },
  titlePageTitle: {
    ...baseTitlePageTitle,
    color: Colors.dark.titlePageTitle,
  },
  collapsibleContainer: {
    ...baseCollapsibleContainer,
    backgroundColor: Colors.dark.background,
  },
  content: {
    ...baseContentStyles,
    backgroundColor: Colors.dark.background,
  },
  settingsButton: {
    ...baseSettingsButton,
    ...(mobileOverrides.baseSettingsButton || {}),
    color: Colors.dark.text,
    backgroundColor: Colors.dark.background,
  },
  settingsLabelText: {
    ...baseSettingsLabelText,
    ...(mobileOverrides.baseSettingsLabelText || {}),
    color: Colors.dark.text,
    backgroundColor: Colors.dark.background,
  },
  settingsButtonContainer: {
    ...baseSettingsButtonContainer,
    ...(mobileOverrides.baseSettingsButtonContainer || {}),
    backgroundColor: Colors.dark.background,
  },
  adminContainer: {
    ...baseAdminContainer,
    backgroundColor: Colors.dark.background,
  },
  adminNavItem: {
    ...baseAdminNavItem,
    ...(mobileOverrides.baseAdminNavItem || {}),
    backgroundColor: Colors.dark.background,
  },
  adminText: {
    ...baseAdminText,
    color: Colors.dark.text,
  },
  adminSubText: {
    ...baseAdminSubText,
    color: Colors.dark.text,
  },
  adminDivider: {
    ...baseAdminDivider,
    backgroundColor: Colors.light.background,
  },
  text: {
    color: Colors.dark.text,
  },
  container: {
    ...baseContainer,
    backgroundColor: Colors.dark.background
  },
  companyName: {
    ...baseCompanyName,
    backgroundColor: Colors.dark.background
  },
  rightGroup: {
    ...baseRightGroup,
    backgroundColor: Colors.dark.background
  },
  iconButton: {
    ...baseIconButton
  },
  textInputLabel: {
    ...baseTextInputLabel,
    color: Colors.dark.text
  },
  textInput: {
    ...baseTextInput,
    ...(mobileOverrides.baseTextInput || {}),
    borderColor: Colors.light.background,
    color: Colors.dark.text
  },
  userContainer: {
    padding: 5,
    marginBottom: '5px',
    borderBottomWidth: '1px',
    borderBottomColor: Colors.dark.tint,
  },
});

export function getStyleSheet(useDarkTheme) {
  return useDarkTheme ? darkStyleSheet : lightStyleSheet;
}
