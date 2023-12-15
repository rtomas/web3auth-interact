// address in Polygon Mumbai testnet
export const counterAddress = "0xbF6c44F37764ed9654A53d30b82FD29d5502F15f";

export const byteCode =
    "608060405234801561000f575f80fd5b506101778061001d5f395ff3fe608060405234801561000f575f80fd5b506004361061003f575f3560e01c806306661abd14610043578063371303c0146100615780636d4ce63c1461006b575b5f80fd5b61004b610089565b60405161005891906100c8565b60405180910390f35b61006961008e565b005b6100736100a8565b60405161008091906100c8565b60405180910390f35b5f5481565b60015f8082825461009f919061010e565b92505081905550565b5f8054905090565b5f819050919050565b6100c2816100b0565b82525050565b5f6020820190506100db5f8301846100b9565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610118826100b0565b9150610123836100b0565b925082820190508082111561013b5761013a6100e1565b5b9291505056fea2646970667358221220418b4d6d64c1298b9fbe3c1fe68c1f2133f7dba300776d7363837664fef3009f64736f6c63430008160033";
export const ABI = [
    {
        inputs: [],
        name: "inc",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "count",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "get",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
