# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Test React

This project is built using React, TypeScript, Vite, Redux Toolkit (with RTK Query), Material UI, and React Router DOM. It demonstrates a user management system with features to list users, view user details, and manage user limits (including adding new limits).

### Key Features

- **User Management:** View a list of users (with basic details) and navigate to user detail pages.
- **User Limits:** Retrieve limits data from an external API ([dummyjson.com](https://dummyjson.com/c/a022-21ef-4179-910f)), format currency and dates using custom utilities, and display data in a table. An "Add Limit" form is provided to update the RTK Query cache and immediately reflect new entries.
- **State Management:** Utilizes Redux Toolkit Query to efficiently fetch and cache data.
- **UI Components:** Built with Material UI for responsive design.

### Environment Variables

This project uses a `.env` file (placed at the project root) to configure API endpoints. Key variables include:

- **VITE_BASE_URL**  
  The base URL for the primary API (e.g., `https://dummyjson.com/`).

- **VITE_BASE_URL_PICSUM**  
  The base URL for getting random images, such as from [Picsum](https://picsum.photos).

When Vite builds the project, these environment variables are injected into the code via `import.meta.env`.

### Project Structure Overview

```
test-react/
├── public/
│   └── vite.svg                 // Default Vite asset
├── src/
│   ├── app/
│   │   ├── router.tsx           // Routing configuration using React Router DOM
│   │   └── store.ts             // Redux store configuration including RTK Query setup
│   ├── assets/                  // Project assets (e.g., images, icons)
│   ├── components/              // Reusable components (e.g., Navbar)
│   ├── features/
│   │   ├── pages/
│   │   │   ├── UsersListPage.tsx  
│   │   │   ├── UserDetailsPage.tsx
│   │   │   └── UserLimitsPage.tsx   // Displays limits table and includes the AddLimitSection form
│   │   └── users/
│   │       └── usersApi.ts      // API slice using Redux Toolkit Query
│   ├── hooks/                   // Custom React hooks
│   ├── layouts/                 // Layout components (e.g., MainLayout)
│   ├── types/                   // TypeScript interfaces (User, Limit, etc.)
│   └── utils/                   // Helper functions (formatCurrency, formatDate)
├── index.html
├── .env.example
├── package.json
└── vite.config.ts
```

### NPM Dependencies and Their Roles

- **React (^19.1.0):** Core library for building UI.
- **React-DOM (^19.1.0):** Renders React components to the DOM.
- **React Router DOM (^7.5.3):** Provides client-side routing.
- **@reduxjs/toolkit (^2.8.0):** Simplifies Redux store setup and state management; RTK Query is used for data fetching.
- **React Redux (^9.2.0):** Connects Redux state with React components.
- **Material UI (^7.1.0):** UI library for building responsive and modern interfaces.
- **@emotion/react & @emotion/styled (^11.14.0):** Enables styled components and theming with Material UI.
- **Axios (^1.9.0):** (Optional) Can be used for additional API calls.
- **Zod (^3.24.4):** For schema validation (optional enhancement).
- **Vite (^6.3.5):** A fast development server and modern build tool.

### How It Works

1. **Data Fetching:**  
   The `usersApi` slice (in `src/features/users/usersApi.ts`) uses RTK Query to manage API calls and cache data. Endpoints include fetching users, user details, avatars, and limits. The limits endpoint transforms data (using utilities for currency and date formatting) after fetching from `https://dummyjson.com/c/a022-21ef-4179-910f`.

2. **State Updates:**  
   The "Add Limit" form (in `src/features/pages/AddLimitSection.tsx`) validates input, generates unique IDs, and then uses `updateQueryData` to update the RTK Query cache—so new limits are immediately reflected in the limits table without needing a full refresh.

3. **Routing:**  
   React Router (configured in `src/app/router.tsx`) handles navigation between pages like Users List, User Details, and User Limits.

### Getting Started

   **Create Project**

   ```bash
   npm create vite@latest test-react -- --template react-ts
   ```

1. **Install Dependencies:**  
   In your project root, run:
   ```bash
   npm install
   ```

2. **Create a `.env` File:**  
   At the root of your project, create a file named `.env` containing:
   ```env
   VITE_BASE_URL=https://dummyjson.com/
   VITE_BASE_URL_PICSUM=https://picsum.photos/v2/list?page=2&limit=10
   ```

3. **Run the Development Server:**  
   Start the project with:
   ```bash
   npm run dev
   ```

4. **Build for Production:**  
   Create a production build with:
   ```bash
   npm run build
   ```

5. **Preview the Production Build:**  
   Preview the build using:
   ```bash
   npm run preview
   ```

### Short Description

This scalable, modular user management system is built using modern React and TypeScript practices. It leverages Redux Toolkit Query for efficient API data fetching and caching, Material UI for a responsive design, and React Router for seamless navigation. The project also uses custom utility functions for formatting currency and dates.

---

![Cute Puppy](https://placedog.net/500)