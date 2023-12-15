import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, UserCredential, OAuthProvider } from "firebase/auth";

// initialize the web3AuthNoModal SDK
import { Web3AuthNoModal, Web3AuthNoModalOptions } from "@web3auth/no-modal";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";

import Web3 from "web3";
import { RegisteredSubscription } from "web3-eth";

// import configuration files
import { firebaseConfig } from "@/config/firebase";
import { web3AuthConfig, openloginAdapter } from "@/config/web3auth";
import { ABI, counterAddress, byteCode } from "@/config/counterSC";

import { Button } from "@/components/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
    const domain = process.env.NEXT_PUBLIC_DOMAIN!;

    // state variables
    const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const [address, setAddress] = useState<string>("");
    const [web3, setWeb3] = useState<Web3<RegisteredSubscription> | null>(null);
    const [balance, setBalance] = useState<string>("");

    useEffect(() => {
        // execute on page load
        initOnPageLoad();
    }, []);

    useEffect(() => {
        if (provider != null) setWeb3(new Web3(provider));
    }, [provider]);

    useEffect(() => {
        if (loggedIn && provider) {
            getAddresses();
        }
    }, [web3]);

    useEffect(() => {
        if (loggedIn && provider) {
            getBalance();
        }
    }, [address]);

    // get address of the connected wallet
    const getAddresses = async () => {
        if (!web3) return;
        const addresses = await web3.eth?.getAccounts();
        setAddress(addresses[0]);
    };

    // get balance of the address
    const getBalance = async () => {
        if (!web3) return;
        const balance = await web3.eth?.getBalance(address);
        setBalance(parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(3));
    };

    // conect to polygon testnet network on page load
    const initOnPageLoad = async () => {
        const web3auth = new Web3AuthNoModal(web3AuthConfig);

        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
            // set login status to true
            setLoggedIn(true);
        }
    };

    // Call sign-in with microsoft popup throw firebase
    const signInWithMicrosoft = async (): Promise<UserCredential> => {
        try {
            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            const oAuthProvider = new OAuthProvider("microsoft.com");
            console.log("oAuthProvider", oAuthProvider);
            oAuthProvider.setCustomParameters({
                prompt: "consent",
            });

            const res = await signInWithPopup(auth, oAuthProvider);
            return res;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    // Login with web3auth
    const login = async () => {
        if (!web3auth) {
            console.error("web3auth not initialized");
            return;
        }
        const loginRes = await signInWithMicrosoft();
        const idToken = await loginRes.user.getIdToken(true);

        const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "jwt",
            extraLoginOptions: {
                id_token: idToken,
                verifierIdField: "email",
                domain: domain,
            },
        });
        setProvider(web3authProvider);
    };

    // check if user is logged in and web3 is initialized
    const checkLogged = () => {
        if (!loggedIn) throw new Error("Not logged in");
        if (!web3) throw new Error("Web3 not initialized");
    };

    // sign a message with the private key of the connected wallet
    const signMessage = async () => {
        checkLogged();

        const originalMessage = "You can check with my public-key and the signature that I own the address.";

        const signedMessage = await web3!.eth.personal.sign(originalMessage, address, "some_password");
        console.log("signedMessage", signedMessage);
    };

    // send a transaction of 0.001matic to the blockchain from the connected wallet
    const sendTransaction = async () => {
        checkLogged();

        const destination = "0xcbBf0E57fe2fB1877f18f84990691ab9E23043C9";

        // Convert 0.001 ether to wei
        const amount = web3!.utils.toWei("0.001", "ether");

        // Submit transaction to the blockchain and wait for it to be mined
        const receipt = await web3!.eth
            .sendTransaction({
                from: address,
                to: destination,
                value: amount,
            })
            .on("confirmation", function (confirmationNumber) {
                if (confirmationNumber.confirmations === BigInt(5)) {
                    getBalance();
                }
            });
    };

    // Read a smart contract and get the value of the counter
    const getCounterValueFromSmartContract = async () => {
        checkLogged();

        const contract = new web3!.eth.Contract(JSON.parse(JSON.stringify(ABI)), counterAddress);

        // Read message from smart contract
        const count = await contract.methods.get().call();
        console.log("count", count);
    };

    // Update state of smart contract, incrementing the counter
    const incrementCounterValueFromSmartContract = async () => {
        checkLogged();

        const contract = new web3!.eth.Contract(JSON.parse(JSON.stringify(ABI)), counterAddress);

        // Read message from smart contract
        await contract.methods.inc().send({
            from: address,
        });

        console.log("increment Ok");
    };

    // deploy a smart contract
    const deploySmartContract = async () => {
        checkLogged();

        const contract = new web3!.eth.Contract(JSON.parse(JSON.stringify(ABI)));

        const contractInstance = await contract
            .deploy({
                data: byteCode,
            })
            .send({
                from: address,
            });

        console.log("Contract deployed to ", contractInstance.options.address);
    };

    // Logout
    const logout = async () => {
        checkLogged();
        await web3auth?.logout();
        setLoggedIn(false);
    };

    return (
        <section className="w-full h-screen flex justify-center items-center bg-[#000000]">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-center">
                        Web3Auth Interact with Polygon Testnet
                    </h3>
                </div>
                {loggedIn ? (
                    <>
                        <div className="p-6 space-y-4">
                            <div className="flex flex-col">
                                <span className="text-gray-500">Address:</span>
                                <span className="font-medium">{address}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-500">Balance:</span>
                                <span className="font-medium">{balance} Matic</span>
                            </div>
                        </div>

                        <Button onClick={signMessage} label="Sign message" />
                        <Button onClick={sendTransaction} label="Send Transaction" />
                        <Button onClick={getCounterValueFromSmartContract} label="Read SC" />
                        <Button onClick={deploySmartContract} label="Smart contract deploy" />
                        <Button onClick={incrementCounterValueFromSmartContract} label="Write SC" />
                        <Button onClick={logout} label="LogOut" />
                    </>
                ) : (
                    <Button onClick={login} label="Login with Microsoft" />
                )}
            </div>
        </section>
    );
}
