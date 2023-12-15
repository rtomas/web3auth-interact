# Next.js Web3Auth Integration with Microsoft Authentication

This Next.js application demonstrates the integration of Web3Auth with Microsoft authentication using Firebase. The application interacts with the Polygon Testnet blockchain, allowing users to log in with their Microsoft accounts, perform blockchain transactions and interact with a smart contract.

## Prerequisites

Before running the application, ensure you have the following:

-   [Node.js](https://nodejs.org/) installed
-   [Web3Auth](https://web3auth.dev/) project set up and the verifier enabled
-   [Firebase](https://firebase.google.com/) project set up with Microsoft authentication enabled
-   [Entra Microsoft](https://entra.microsoft.com/) project set up as a web plarform with the correct redirect URIs

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rtomas/web3auth-interact
    cd web3auth-interact
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory and add the following variables:

    ```dotenv
     NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=[Your Web3Auth Client ID]
     NEXT_PUBLIC_FIREBASE_API_KEY=[Firebase API Key]
     NEXT_PUBLIC_DOMAIN=[Your Domain]
    ```

4. **Configure Firebase:**

    Update the `firebaseConfig` object in `config/firebase.ts` with your Firebase project configuration.

5. **Run the application:**

    ```bash
    npm run dev
    ```

    The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Features

-   **Login with Microsoft:** Click the "Login with Microsoft" button to authenticate with your Microsoft account through Firebase.

-   **Blockchain Interactions:**

    -   View connected wallet address and balance on Polygon Testnet.
    -   Sign a message using the connected wallet's private key.
    -   Send a transaction to another address on the blockchain.
    -   Read and write to a smart contract deployed on the blockchain.

-   **Smart Contract Deployment:**

    -   Deploy a smart contract to the blockchain.

-   **Logout:**
    -   Click the "Logout" button to log out of the application.

## Notes

-   Ensure your Polygon Testnet wallet is funded for transactions. (You can use the [Polygon Faucet](https://faucet.polygon.technology/) to get some testnet MATIC tokens.)
-   Security: This is a sample application and should be enhanced for production use, including proper error handling and security measures.
-   You are using sapphire_devnet. Please set network: 'mainnet' or 'sapphire_mainnet' in production
