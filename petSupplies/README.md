# Pet Supplies Mobile App

This is a React Native mobile application for a fictional pet supply store, designed to showcase various pet products across categories like dogs, cats, birds, reptiles, fish, and small animals.

---

## Features

- **Home Screen:**  
  Displays featured categories like Dog Supplies, Cat Supplies, Bird Supplies, and more, with images and descriptions.

- **Promotions Banner:**  
  Highlights discount codes and special offers.

- **Tab Navigation:**
  Bottom tab navigator with screens for:
  - Home
  - Products
  - Admin
- **Product Filtering:**
  The products screen lets you filter items by pet type.

- **Reusable Components:**  
  Includes a top navigation bar (`HomeBar`) for quick access to notifications and cart.

---

## Project Structure

```
/src
  ├── HomeBar.js
  ├── TitlePage.js
  ├── styles.js
App.js
```

- `App.js`: Main entry point, sets up the navigation container and tab navigator.
- `HomeBar.js`: Top navigation bar with app title and icons.
- `TitlePage.js`: Displays the main home content and promotional sections.
- `styles.js`: Centralized styles used across components.

---

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npx expo start
   ```

3. Open in Expo Go on your device or in an emulator.

---

## ⚙ Tech Stack

- React Native  
- Expo  
- React Navigation

---

## 💡 Future Improvements

- Add product detail screens.
- Implement real shopping cart functionality.
- Connect to a backend for live product data.
- Implement Admin page for adding, editing and deleting products.

---

## 📸 Screenshots

*(Optional: Insert screenshots here if available)*

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).