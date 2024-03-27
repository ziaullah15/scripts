import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import Web3 from "https://cdn.jsdelivr.net/npm/web3@4.3.0/+esm";
// import {ethers} from "https://cdn.jsdelivr.net/npm/ethers@5.5.4/dist/ethers.umd.min.js";
// const ethers = require("ethers");
const { ethers } = window;
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
// import MerkleTree from 'https://cdn.jsdelivr.net/npm/merkletreejs@0.3.11/+esm'
// import keccak256 from 'https://cdn.jsdelivr.net/npm/keccak256@1.0.6/+esm'
// import {ethers} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/5.5.4/ethers.umd.min.js'
// import { parseGwei } from "https://cdn.jsdelivr.net/npm/viem";

// 0. Import wagmi dependencies
const { polygonMumbai, bscTestnet, bsc } = WagmiCoreChains;
const {
  signMessage,
  Address,
  configureChains,
  createConfig,
  getContract,
  getAccount,
  waitForTransaction,
  getWalletClient,
  prepareWriteContract,
  fetchBalance,
  fetchTransaction,
  estimateGas,
  readContract,
  writeContract,
  erc721ABI,
} = WagmiCore;

// 1. Define chains
const chains = [bscTestnet];
const projectId = "2aca272d18deb10ff748260da5f78bfd";

// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
console.log("publicClient:", publicClient);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ chains, version: 2, projectId }),
    new WagmiCoreConnectors.CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Craft and Redeem",
      },
    }),
  ],
  publicClient,
});
console.log("wagmiConfig:", wagmiConfig);

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);

console.log("ethereumClient:", ethereumClient);
export const web3Modal = new Web3Modal(
  {
    projectId,
  },
  ethereumClient
);

//4. Get connected account address
const account = getAccount();
const connectedAccount = account.address;
console.log("Account:", connectedAccount);
const contractAddress = "0x1f44F366d3F30203880195D50A9ca126c2D4985d";
const busd = "0x89E5dCbD03faD067E14044067402a2C31081091B";
const usdt = "0x04bFEcd3cd08c926AD1b9eBD3618c0125B6FA80b";
const wbnb = "0x21EC3c489d872dc26a87b25e2f15E29710a14A4D";
const ierc = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "_decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const Abi = [
  {
    inputs: [
      { internalType: "address", name: "_factoryV2", type: "address" },
      { internalType: "address", name: "_deployer", type: "address" },
      { internalType: "address", name: "_factoryV3", type: "address" },
      { internalType: "address", name: "_positionManager", type: "address" },
      { internalType: "address", name: "_stableFactory", type: "address" },
      { internalType: "address", name: "_stableInfo", type: "address" },
      { internalType: "address", name: "_WETH9", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "factory",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "info", type: "address" },
    ],
    name: "SetStableSwap",
    type: "event",
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveMax",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveZeroThenMax",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveZeroThenMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "callPositionManager",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "paths", type: "bytes[]" },
      { internalType: "uint128[]", name: "amounts", type: "uint128[]" },
      { internalType: "uint24", name: "maximumTickDivergence", type: "uint24" },
      { internalType: "uint32", name: "secondsAgo", type: "uint32" },
    ],
    name: "checkOracleSlippage",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "path", type: "bytes" },
      { internalType: "uint24", name: "maximumTickDivergence", type: "uint24" },
      { internalType: "uint32", name: "secondsAgo", type: "uint32" },
    ],
    name: "checkOracleSlippage",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
        ],
        internalType: "struct IV3SwapRouter.ExactInputParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInput",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160",
          },
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "uint256[]", name: "flag", type: "uint256[]" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "exactInputStableSwap",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMaximum", type: "uint256" },
        ],
        internalType: "struct IV3SwapRouter.ExactOutputParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactOutput",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMaximum", type: "uint256" },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160",
          },
        ],
        internalType: "struct IV3SwapRouter.ExactOutputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactOutputSingle",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "uint256[]", name: "flag", type: "uint256[]" },
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "exactOutputStableSwap",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factoryV2",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "getApprovalType",
    outputs: [
      {
        internalType: "enum IApproveAndCall.ApprovalType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
        ],
        internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "increaseLiquidity",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "int24", name: "tickLower", type: "int24" },
          { internalType: "int24", name: "tickUpper", type: "int24" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
        ],
        internalType: "struct IApproveAndCall.MintParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "mint",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "previousBlockhash", type: "bytes32" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "int256", name: "amount0Delta", type: "int256" },
      { internalType: "int256", name: "amount1Delta", type: "int256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "positionManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "pull",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "refundETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermitAllowed",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermitAllowedIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "selfPermitIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_info", type: "address" },
    ],
    name: "setStableSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stableSwapFactory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stableSwapInfo",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "swapExactTokensForTokens",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "swapTokensForExactTokens",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" },
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" },
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" },
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" },
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "wrapETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const privateKey = "da2eeb57a799d9fbc502e5513b2353919a3ed4bfbd4986b25ade01f0aa0cf29d";
const rpc = "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
const provider = new ethers.providers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(privateKey)
const signer = wallet.connect(provider);

async function encodeExactInputSingleParams(
) {
  const abirouter = [
    {
      inputs: [
        { internalType: "address", name: "_factoryV2", type: "address" },
        { internalType: "address", name: "_deployer", type: "address" },
        { internalType: "address", name: "_factoryV3", type: "address" },
        { internalType: "address", name: "_positionManager", type: "address" },
        { internalType: "address", name: "_stableFactory", type: "address" },
        { internalType: "address", name: "_stableInfo", type: "address" },
        { internalType: "address", name: "_WETH9", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "factory",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "info",
          type: "address",
        },
      ],
      name: "SetStableSwap",
      type: "event",
    },
    {
      inputs: [],
      name: "WETH9",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "approveMax",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "approveMaxMinusOne",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "approveZeroThenMax",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "approveZeroThenMaxMinusOne",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
      name: "callPositionManager",
      outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes[]", name: "paths", type: "bytes[]" },
        { internalType: "uint128[]", name: "amounts", type: "uint128[]" },
        {
          internalType: "uint24",
          name: "maximumTickDivergence",
          type: "uint24",
        },
        { internalType: "uint32", name: "secondsAgo", type: "uint32" },
      ],
      name: "checkOracleSlippage",
      outputs: [],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes", name: "path", type: "bytes" },
        {
          internalType: "uint24",
          name: "maximumTickDivergence",
          type: "uint24",
        },
        { internalType: "uint32", name: "secondsAgo", type: "uint32" },
      ],
      name: "checkOracleSlippage",
      outputs: [],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "deployer",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "bytes", name: "path", type: "bytes" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "uint256", name: "amountIn", type: "uint256" },
            {
              internalType: "uint256",
              name: "amountOutMinimum",
              type: "uint256",
            },
          ],
          internalType: "struct IV3SwapRouter.ExactInputParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "exactInput",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "tokenIn", type: "address" },
            { internalType: "address", name: "tokenOut", type: "address" },
            { internalType: "uint24", name: "fee", type: "uint24" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "uint256", name: "amountIn", type: "uint256" },
            {
              internalType: "uint256",
              name: "amountOutMinimum",
              type: "uint256",
            },
            {
              internalType: "uint160",
              name: "sqrtPriceLimitX96",
              type: "uint160",
            },
          ],
          internalType: "struct IV3SwapRouter.ExactInputSingleParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "exactInputSingle",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "uint256[]", name: "flag", type: "uint256[]" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "exactInputStableSwap",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "bytes", name: "path", type: "bytes" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "uint256", name: "amountOut", type: "uint256" },
            {
              internalType: "uint256",
              name: "amountInMaximum",
              type: "uint256",
            },
          ],
          internalType: "struct IV3SwapRouter.ExactOutputParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "exactOutput",
      outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "tokenIn", type: "address" },
            { internalType: "address", name: "tokenOut", type: "address" },
            { internalType: "uint24", name: "fee", type: "uint24" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "uint256", name: "amountOut", type: "uint256" },
            {
              internalType: "uint256",
              name: "amountInMaximum",
              type: "uint256",
            },
            {
              internalType: "uint160",
              name: "sqrtPriceLimitX96",
              type: "uint160",
            },
          ],
          internalType: "struct IV3SwapRouter.ExactOutputSingleParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "exactOutputSingle",
      outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "uint256[]", name: "flag", type: "uint256[]" },
        { internalType: "uint256", name: "amountOut", type: "uint256" },
        { internalType: "uint256", name: "amountInMax", type: "uint256" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "exactOutputStableSwap",
      outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "factory",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "factoryV2",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getApprovalType",
      outputs: [
        {
          internalType: "enum IApproveAndCall.ApprovalType",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "token0", type: "address" },
            { internalType: "address", name: "token1", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "amount0Min", type: "uint256" },
            { internalType: "uint256", name: "amount1Min", type: "uint256" },
          ],
          internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "increaseLiquidity",
      outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "token0", type: "address" },
            { internalType: "address", name: "token1", type: "address" },
            { internalType: "uint24", name: "fee", type: "uint24" },
            { internalType: "int24", name: "tickLower", type: "int24" },
            { internalType: "int24", name: "tickUpper", type: "int24" },
            { internalType: "uint256", name: "amount0Min", type: "uint256" },
            { internalType: "uint256", name: "amount1Min", type: "uint256" },
            { internalType: "address", name: "recipient", type: "address" },
          ],
          internalType: "struct IApproveAndCall.MintParams",
          name: "params",
          type: "tuple",
        },
      ],
      name: "mint",
      outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "previousBlockhash", type: "bytes32" },
        { internalType: "bytes[]", name: "data", type: "bytes[]" },
      ],
      name: "multicall",
      outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "bytes[]", name: "data", type: "bytes[]" },
      ],
      name: "multicall",
      outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
      name: "multiCall",
      outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "int256", name: "amount0Delta", type: "int256" },
        { internalType: "int256", name: "amount1Delta", type: "int256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "pancakeV3SwapCallback",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "positionManager",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "pull",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "refundETH",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "selfPermit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "nonce", type: "uint256" },
        { internalType: "uint256", name: "expiry", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "selfPermitAllowed",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "nonce", type: "uint256" },
        { internalType: "uint256", name: "expiry", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "selfPermitAllowedIfNecessary",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "selfPermitIfNecessary",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_factory", type: "address" },
        { internalType: "address", name: "_info", type: "address" },
      ],
      name: "setStableSwap",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "stableSwapFactory",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "stableSwapInfo",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountIn", type: "uint256" },
        { internalType: "uint256", name: "amountOutMin", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "swapExactTokensForTokens",
      outputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
        { internalType: "uint256", name: "amountInMax", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "swapTokensForExactTokens",
      outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountMinimum", type: "uint256" },
        { internalType: "address", name: "recipient", type: "address" },
      ],
      name: "sweepToken",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      ],
      name: "sweepToken",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountMinimum", type: "uint256" },
        { internalType: "uint256", name: "feeBips", type: "uint256" },
        { internalType: "address", name: "feeRecipient", type: "address" },
      ],
      name: "sweepTokenWithFee",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amountMinimum", type: "uint256" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "feeBips", type: "uint256" },
        { internalType: "address", name: "feeRecipient", type: "address" },
      ],
      name: "sweepTokenWithFee",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountMinimum", type: "uint256" },
        { internalType: "address", name: "recipient", type: "address" },
      ],
      name: "unwrapWETH9",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountMinimum", type: "uint256" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "feeBips", type: "uint256" },
        { internalType: "address", name: "feeRecipient", type: "address" },
      ],
      name: "unwrapWETH9WithFee",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amountMinimum", type: "uint256" },
        { internalType: "uint256", name: "feeBips", type: "uint256" },
        { internalType: "address", name: "feeRecipient", type: "address" },
      ],
      name: "unwrapWETH9WithFee",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
      name: "wrapETH",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];
  const contractAddress = "0x9a489505a00cE272eAa5e07Dba6491314CaE3796"
  const router = new ethers.Contract(contractAddress, abirouter, signer);

  // Example usage
 const params = {
    tokenIn : "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", // Token address
    tokenOut : "0x52D374705B70B8a40bDAD544DBC83F0B1185284d", // Token address
    fee : 10000, // Fee (uint24)
    recipient : "0x783D04B585d8b1738e1813b6656a0e049A289E02", // Recipient address
    amountIn : 100000000000000, // Amount in (uint256)
    amountOutMinimum : 0,
    sqrtPriceLimitX96 : 0// sqrtPriceLimitX96 (uint160)
    }

    console.log("...................................................")
  const iface = new ethers.utils.Interface(abirouter);
  const data = iface.encodeFunctionData("exactInputSingle", [params])

  const call = iface.encodeFunctionData("multiCall", [[data]]);

//   const txArgs = {
//     to: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
//     from: "0x8eEb5a3ec6dE7BDCad2d72C9d0AEd302011d2E7D",
//     data: call,
//     value: ethers.utils.parseEther("0.0001"),
//     gasLimit: ethers.BigNumber.from("10000000000"), // Increase gas limit
//   }
  
//   const tx = await signer.sendTransaction(txArgs);

const { transfer, hash } = await writeContract({
  address: contractAddress,
  abi: abirouter,
  functionName: "multiCall",
  args: [[data]],
  chainId: 97,
});
  // const tx = await router.multiCall([data], { value: ethers.utils.parseEther("0.0001") });
  // await tx.wait();
  
  
  console.log("encoded:", data)
  console.log("call:", call)
  console.log("tx:", tx)
  
  // const receipt = await tx.wait();
  // console.log("receipt:", receipt);
}

// encodeExactInputSingleParams()





// debugger
//for balance fetching of both smart contract and token holder
async function readData() {
  try {
    const read = await readContract({
      address: contractAddress,
      abi: Abi,
      functionName: "getSmartContractBalance",
      args: [busd],
      chainId: 97,
    });
    console.log("balance:", Number(read));
  } catch (err) {
    console.error(err); // Corrected from err to console.error(err)
  }

  const balance = await fetchBalance({
    address: "0x8eEb5a3ec6dE7BDCad2d72C9d0AEd302011d2E7D",
    token: "0x04bFEcd3cd08c926AD1b9eBD3618c0125B6FA80b",
    chainId: 97,
  })

  const Receipt = await waitForTransaction({
    hash: "0x6f72088ccf02ae945ba77f0395b556f38990ace1755667d3946f1681c18ca1d8",
  })
  console.log("receipt:", Receipt);

  console.log("token address:", Receipt.logs[0].address);
  console.log("Amount :", parseInt(Receipt.logs[0].data, 16));
  console.log("From address:", Receipt.logs[0].topics[1].slice(0, 2) + Receipt.logs[0].topics[1].slice(2).replace(/^0+/, ''));
  console.log("To address:", Receipt.logs[0].topics[2].slice(0, 2) + Receipt.logs[0].topics[2].slice(2).replace(/^0+/, ''));
}

//for approval and deposit
async function writeData() {
  try {
    // Assuming quantity is obtained from the input field with id "quantity"
    // const quantity = document.getElementById("quantity").value;
    // const to = document.getElementById("to").value;
    // const isUk = document.getElementById("ukCheckbox").value;
    const { transfer, hash } = await writeContract({
      address: busd,
      abi: ierc,
      functionName: "transfer",
      args: [contractAddress, 300000000000000000000],
      chainId: 97,
    });

    // const { approvehash } = await writeContract(approve)

    const Receipt = await fetchTransaction({
      hash: hash,
    });

    console.log("Receipt:", Receipt);
    // console.log("approvel done", Receipt);
    // const { write, hash } = await writeContract({
    //   address: contractAddress,
    //   abi: Abi,
    //   functionName: "depositTokens",
    //   args: [busd, 300000000000000000000],
    //   chainId: 97,
    // });

    // console.log("Transaction Receipt:", transactionReceipt.logs[0].address);
    // console.log("Transaction successful:", write);
  } catch (err) {
    console.error(err);
  }
}
//for withdraw deposited tokens
async function withdraw() {
  try {
    const { write, hash } = await writeContract({
      address: contractAddress,
      abi: Abi,
      functionName: "ownerWithdraw",
      args: [usdt, 100000000000000000000],
      chainId: 97,
    });

    const transactionReceipt = await waitForTransaction({
      hash: hash,
    });

    console.log("Transaction Receipt:", transactionReceipt.logs[0].address);
    console.log("Transaction successful:", write);
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("writeButton").addEventListener("click", encodeExactInputSingleParams);
document.getElementById("withdrawButton").addEventListener("click", withdraw);
document.getElementById("readButton").addEventListener("click", readData);
