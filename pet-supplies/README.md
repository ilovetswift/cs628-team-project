# Pet Supplies App

This is a React application for a fictional pet supply store, designed to showcase various pet products across categories like dogs, cats, birds, reptiles, fish, and small animals.

---

## Features

- **Home Screen:**  
  Displays featured categories like Dog Supplies, Cat Supplies, Bird Supplies, and more, with images and descriptions.

- **Tab Navigation:**
  Bottom tab navigator with screens for:
  - Home
  - Products
  - Cart
  - Chat
  - Admin

- **Product Filtering:**
  The home screen lets you filter items by pet type.

---

## Project Structure

```
/src
├── components
│ ├── CategoryCard.js # Grid tiles used on the home page
│ ├── NavBar.js # Top navigation with links and cart indicator
│ └── ProductCard.js # Card layout for individual products
├── context
│ ├── AuthContext.js # Manages admin login state
│ └── CartContext.js # Manages cart state and actions
├── pages
│ ├── Home.js # Home page with category grid and promo banner
│ ├── Products.js # Lists products and allows filtering by pet type
│ ├── Cart.js # Displays cart contents and controls
│ ├── Admin.js # Admin dashboard for creating/editing/deleting products
│ ├── Chat.js # RAG chat interface with streaming responses
│ └── AddToCartRedirect.js # Helper route for adding items via chat links
├── App.js # Main entry point; sets up routing and layouts
├── index.js # ReactDOM bootstrapper
└── README.md # Project documentation
```

- `App.js`: Initializes the React Router, wraps pages with context providers, and defines top‑level routes.
- `NavBar.js`: The global navigation component displayed across pages, including links and a cart icon.
- `CategoryCard.js`, `ProductCard.js`: Reusable components for listing categories and products.
- Files under `pages/` correspond to individual routes (e.g. `/`, `/products`, `/cart`, `/admin`, `/chat`), encapsulating their own layout and logic.
- `AuthContext.js` and `CartContext.js` encapsulate global state for admin authentication and cart contents.

---

## How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm start
   ```

---

## Tech Stack

- React  
- Express
- MongoDB
- Ollama
- React Router

---
