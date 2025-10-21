# Project Overview

This project is a web-based desktop environment built with React and Vite. It simulates a desktop-like interface where users can interact with various applications within the browser window. The project uses TypeScript for static typing and features a component-based architecture.

The core of the application is the `Kernel` component, which manages the booting sequence and the overall desktop environment. The `WindowManager` is responsible for managing the different application windows, and each application is a separate React component. The project also utilizes `@tanstack/react-query` for data fetching and `jotai` for state management.

A notable feature of this project is the use of the `matter-js` physics engine to create interactive and animated elements, as seen in the "Seori" application.

## Building and Running

To build and run the project, use the following commands:

*   **Installation:**
    ```bash
    npm install
    ```

*   **Development:**
    ```bash
    npm run dev
    ```

*   **Build:**
    ```bash
    npm run build
    ```

*   **Lint:**
    ```bash
    npm run lint
    ```

*   **Preview:**
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Commit Style:** The project follows a conventional commit style. Please refer to the `README.md` file for more details.
*   **Code Style:** The project uses ESLint and Prettier for code linting and formatting. Please ensure that your code adheres to the rules defined in the `.eslintrc.js` and `.prettierrc` files.
*   **Component-Based Architecture:** The project follows a component-based architecture. Each application is a separate component located in the `src/applications` directory.
*   **State Management:** The project uses `jotai` for state management. Please follow the existing patterns for managing state.
*   **Data Fetching:** The project uses `@tanstack/react-query` for data fetching. Please use this library for all data fetching needs.
