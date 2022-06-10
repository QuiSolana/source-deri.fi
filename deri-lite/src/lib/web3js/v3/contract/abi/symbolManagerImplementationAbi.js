// this file is generated by script, don't modify it !!!
export const symbolManagerImplementationAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool_",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "symbolId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "symbol",
                "type": "address"
            }
        ],
        "name": "AddSymbol",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "NewAdmin",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }
        ],
        "name": "NewImplementation",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "symbolId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "symbol",
                "type": "address"
            }
        ],
        "name": "RemoveSymbol",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "pTokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "symbolId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "indexPrice",
                "type": "int256"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "tradeVolume",
                "type": "int256"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "tradeCost",
                "type": "int256"
            },
            {
                "indexed": false,
                "internalType": "int256",
                "name": "tradeFee",
                "type": "int256"
            }
        ],
        "name": "Trade",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "activeSymbols",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "symbol",
                "type": "address"
            }
        ],
        "name": "addSymbol",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pTokenId",
                "type": "uint256"
            }
        ],
        "name": "getActiveSymbols",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getSymbolsLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "implementation",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "indexedSymbols",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "initialMarginRequired",
        "outputs": [
            {
                "internalType": "int256",
                "name": "",
                "type": "int256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nameId",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pool",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "symbolId",
                "type": "bytes32"
            }
        ],
        "name": "removeSymbol",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "setAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "int256",
                "name": "liquidity",
                "type": "int256"
            }
        ],
        "name": "settleSymbolsOnAddLiquidity",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "int256",
                        "name": "funding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "deltaTradersPnl",
                        "type": "int256"
                    }
                ],
                "internalType": "struct ISymbolManager.SettlementOnAddLiquidity",
                "name": "ss",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pTokenId",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "liquidity",
                "type": "int256"
            }
        ],
        "name": "settleSymbolsOnLiquidate",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "int256",
                        "name": "funding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "deltaTradersPnl",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderFunding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderPnl",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderMaintenanceMarginRequired",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderRealizedCost",
                        "type": "int256"
                    }
                ],
                "internalType": "struct ISymbolManager.SettlementOnLiquidate",
                "name": "ss",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "int256",
                "name": "liquidity",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "removedLiquidity",
                "type": "int256"
            }
        ],
        "name": "settleSymbolsOnRemoveLiquidity",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "int256",
                        "name": "funding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "deltaTradersPnl",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "initialMarginRequired",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "removeLiquidityPenalty",
                        "type": "int256"
                    }
                ],
                "internalType": "struct ISymbolManager.SettlementOnRemoveLiquidity",
                "name": "ss",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pTokenId",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "liquidity",
                "type": "int256"
            }
        ],
        "name": "settleSymbolsOnRemoveMargin",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "int256",
                        "name": "funding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "deltaTradersPnl",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderFunding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderPnl",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderInitialMarginRequired",
                        "type": "int256"
                    }
                ],
                "internalType": "struct ISymbolManager.SettlementOnRemoveMargin",
                "name": "ss",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "pTokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "symbolId",
                "type": "bytes32"
            },
            {
                "internalType": "int256",
                "name": "tradeVolume",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "liquidity",
                "type": "int256"
            }
        ],
        "name": "settleSymbolsOnTrade",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "int256",
                        "name": "funding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "deltaTradersPnl",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "initialMarginRequired",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderFunding",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderPnl",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "traderInitialMarginRequired",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "tradeFee",
                        "type": "int256"
                    },
                    {
                        "internalType": "int256",
                        "name": "tradeRealizedCost",
                        "type": "int256"
                    }
                ],
                "internalType": "struct ISymbolManager.SettlementOnTrade",
                "name": "ss",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "symbols",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "versionId",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

