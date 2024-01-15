## RUNNING THE BACKEND SERVER

This README provides essential information for setting up and running the server.ts file in this project.

### Prerequisites

Before running the server.ts file, make sure you have the following prerequisites installed:

-   **Node.js:** Ensure that you have Node.js installed on your machine. You can download it from [Node](https://nodejs.org/).

-   **TypeScript:** Install TypeScript globally using the following command:

    ```bash
    npm install -g typescript
    ```

-   **Project dependencies:** You can install them using the following command:

    ```bash
    npm install
    ```

### Configuration

-   Create a .env file in the backend folder and define the following variable:

    ```env
    VITE_PRODUCTS_BACKEND_SERVER_PORT=your_desired_port_number
    ```

### Running the Server

-   To run the server, use the following command:

    ```bash
    npm run server
    ```
