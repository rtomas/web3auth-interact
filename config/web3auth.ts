import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3AuthNoModalOptions } from "@web3auth/no-modal";

export const chainConfig = {
    chainId: "0x13881", // hex of 137, polygon mainnet
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Polygon Mumbai Testnet",
    blockExplorer: "https://mumbai.polygonscan.com/",
    ticker: "MATIC",
    tickerName: "Matic",
};

export const web3AuthConfig: Web3AuthNoModalOptions = {
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
    web3AuthNetwork: "sapphire_devnet",
    chainConfig: chainConfig,
};
