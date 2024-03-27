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
const chains = [bsc];
const projectId = "84a1370067bc0e349ac0999a800ffe26";

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
const contractAddress = "0x164b26a74946b0755bDF64eCea09235f1f8E9B91";
const pricefeed = "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526"

const Abi = [
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      {
        internalType: "address[]",
        name: "_allowedStableCoins",
        type: "address[]",
      },
      { internalType: "uint256", name: "_startingTime", type: "uint256" },
      { internalType: "address payable", name: "_pWallet", type: "address" },
      {
        components: [
          { internalType: "uint256", name: "r1HardCap", type: "uint256" },
          { internalType: "uint256", name: "r2HardCap", type: "uint256" },
          { internalType: "uint256", name: "r3HardCap", type: "uint256" },
        ],
        internalType: "struct Presale.RoundHardCapInfo",
        name: "_capInfo",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "presale1", type: "uint256" },
          { internalType: "uint256", name: "presale2", type: "uint256" },
          { internalType: "uint256", name: "presale3", type: "uint256" },
        ],
        internalType: "struct Presale.TokenPriceInUSD",
        name: "_price",
        type: "tuple",
      },
      { internalType: "address", name: "_oracle", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AlreadyEnabled", type: "error" },
  { inputs: [], name: "AlreadySet", type: "error" },
  { inputs: [], name: "AmountNotAvailableForSale", type: "error" },
  { inputs: [], name: "AmountZero", type: "error" },
  { inputs: [], name: "ClaimNotEnabled", type: "error" },
  { inputs: [], name: "DelayNotOver", type: "error" },
  { inputs: [], name: "Invalid", type: "error" },
  { inputs: [], name: "LengthError", type: "error" },
  { inputs: [], name: "NeedGreaterThanCurrent", type: "error" },
  { inputs: [], name: "NoAmountToClaim", type: "error" },
  { inputs: [], name: "NotStarted", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "Round3NotFinished", type: "error" },
  { inputs: [], name: "RoundAlreadyStarted", type: "error" },
  { inputs: [], name: "RoundNotMatch", type: "error" },
  { inputs: [], name: "SCNotAllowed", type: "error" },
  { inputs: [], name: "TransferFailed", type: "error" },
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
        internalType: "uint256",
        name: "amountclaimed",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
    ],
    name: "TokenClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amountPaidInUSD",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "purchaser",
        type: "address",
      },
    ],
    name: "TokenPurchased",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_coins", type: "address[]" },
      { internalType: "bool[]", name: "_status", type: "bool[]" },
    ],
    name: "addAllowedStableCoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Presale.PaymentType",
        name: "_type",
        type: "uint8",
      },
      { internalType: "uint256", name: "_amountToPay", type: "uint256" },
      { internalType: "address", name: "_paymentToken", type: "address" },
    ],
    name: "buy",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getClaimPercentages",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "presale1", type: "uint256" },
          { internalType: "uint256", name: "presale2", type: "uint256" },
          { internalType: "uint256", name: "presale3", type: "uint256" },
        ],
        internalType: "struct Presale.ClaimPercentages",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClaimStartAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "getIsAllowedStableCoin",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMinDaysBetweenClaims",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPresaleInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "raisedTotalBNB", type: "uint256" },
          {
            internalType: "uint256",
            name: "raisedTotalSCToken",
            type: "uint256",
          },
          { internalType: "uint256", name: "soldToken", type: "uint256" },
        ],
        internalType: "struct Presale.PresaleInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRoundHardCapInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "r1HardCap", type: "uint256" },
          { internalType: "uint256", name: "r2HardCap", type: "uint256" },
          { internalType: "uint256", name: "r3HardCap", type: "uint256" },
        ],
        internalType: "struct Presale.RoundHardCapInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRoundTimeInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "r1StartTime", type: "uint256" },
          { internalType: "uint256", name: "r1EndTime", type: "uint256" },
          { internalType: "uint256", name: "r2StartTime", type: "uint256" },
          { internalType: "uint256", name: "r2EndTime", type: "uint256" },
          { internalType: "uint256", name: "r3StartTime", type: "uint256" },
          { internalType: "uint256", name: "r3EndTime", type: "uint256" },
        ],
        internalType: "struct Presale.RoundTimeInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRoundTokenSaleInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "r1SoldToken", type: "uint256" },
          { internalType: "uint256", name: "r1TokenForSale", type: "uint256" },
          { internalType: "uint256", name: "r2SoldToken", type: "uint256" },
          { internalType: "uint256", name: "r2TokenForSale", type: "uint256" },
          { internalType: "uint256", name: "r3SoldToken", type: "uint256" },
          { internalType: "uint256", name: "r3TokenForSale", type: "uint256" },
        ],
        internalType: "struct Presale.RoundTokenSaleInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenPriceInUSD",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "presale1", type: "uint256" },
          { internalType: "uint256", name: "presale2", type: "uint256" },
          { internalType: "uint256", name: "presale3", type: "uint256" },
        ],
        internalType: "struct Presale.TokenPriceInUSD",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "r1Purchased", type: "uint256" },
          { internalType: "uint256", name: "r2Purchased", type: "uint256" },
          { internalType: "uint256", name: "r3Purchased", type: "uint256" },
          { internalType: "uint256", name: "r1Claimed", type: "uint256" },
          { internalType: "uint256", name: "r2Claimed", type: "uint256" },
          { internalType: "uint256", name: "r3Claimed", type: "uint256" },
          { internalType: "uint256", name: "totalSCInvested", type: "uint256" },
          {
            internalType: "uint256",
            name: "totalBNBInvested",
            type: "uint256",
          },
          { internalType: "uint256", name: "lastClaimedAt", type: "uint256" },
          { internalType: "uint256", name: "totalPurchased", type: "uint256" },
          { internalType: "uint256", name: "totalClaimed", type: "uint256" },
          { internalType: "uint256", name: "remainToClaim", type: "uint256" },
        ],
        internalType: "struct Presale.UserInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOverRound1",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOverRound2",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOverRound3",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_tokenAddr", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_toWallet", type: "address" },
      { internalType: "bool", name: "_eth", type: "bool" },
    ],
    name: "retrieveStuckedAsset",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "round",
    outputs: [
      { internalType: "string", name: "_round", type: "string" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
      { internalType: "uint256", name: "_hardcap", type: "uint256" },
      { internalType: "uint256", name: "_soldToken", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
    ],
    stateMutability: "view",
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
    inputs: [{ internalType: "address", name: "_new", type: "address" }],
    name: "updateOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_startTime", type: "uint256" }],
    name: "updateRound1Time",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_startTime", type: "uint256" }],
    name: "updateRound2Time",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_startTime", type: "uint256" }],
    name: "updateRound3Time",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_new", type: "address" }],
    name: "updateToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "presale1", type: "uint256" },
          { internalType: "uint256", name: "presale2", type: "uint256" },
          { internalType: "uint256", name: "presale3", type: "uint256" },
        ],
        internalType: "struct Presale.TokenPriceInUSD",
        name: "_price",
        type: "tuple",
      },
    ],
    name: "updateTokenPrice",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
const agree = [{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"},{"internalType":"address","name":"_accessController","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"int256","name":"current","type":"int256"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"}],"name":"AnswerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"startedBy","type":"address"},{"indexed":false,"internalType":"uint256","name":"startedAt","type":"uint256"}],"name":"NewRound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accessController","outputs":[{"internalType":"contract AccessControllerInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aggregator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"confirmAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"phaseAggregators","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phaseId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"proposeAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proposedAggregator","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"proposedGetRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposedLatestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_accessController","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

// async function encodeExactInputSingleParams() {
//   const abirouter = [
//     {
//       inputs: [
//         { internalType: "address", name: "_factoryV2", type: "address" },
//         { internalType: "address", name: "_deployer", type: "address" },
//         { internalType: "address", name: "_factoryV3", type: "address" },
//         { internalType: "address", name: "_positionManager", type: "address" },
//         { internalType: "address", name: "_stableFactory", type: "address" },
//         { internalType: "address", name: "_stableInfo", type: "address" },
//         { internalType: "address", name: "_WETH9", type: "address" },
//       ],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "previousOwner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "newOwner",
//           type: "address",
//         },
//       ],
//       name: "OwnershipTransferred",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "factory",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "info",
//           type: "address",
//         },
//       ],
//       name: "SetStableSwap",
//       type: "event",
//     },
//     {
//       inputs: [],
//       name: "WETH9",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "address", name: "token", type: "address" }],
//       name: "approveMax",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "address", name: "token", type: "address" }],
//       name: "approveMaxMinusOne",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "address", name: "token", type: "address" }],
//       name: "approveZeroThenMax",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "address", name: "token", type: "address" }],
//       name: "approveZeroThenMaxMinusOne",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
//       name: "callPositionManager",
//       outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "bytes[]", name: "paths", type: "bytes[]" },
//         { internalType: "uint128[]", name: "amounts", type: "uint128[]" },
//         {
//           internalType: "uint24",
//           name: "maximumTickDivergence",
//           type: "uint24",
//         },
//         { internalType: "uint32", name: "secondsAgo", type: "uint32" },
//       ],
//       name: "checkOracleSlippage",
//       outputs: [],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "bytes", name: "path", type: "bytes" },
//         {
//           internalType: "uint24",
//           name: "maximumTickDivergence",
//           type: "uint24",
//         },
//         { internalType: "uint32", name: "secondsAgo", type: "uint32" },
//       ],
//       name: "checkOracleSlippage",
//       outputs: [],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "deployer",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           components: [
//             { internalType: "bytes", name: "path", type: "bytes" },
//             { internalType: "address", name: "recipient", type: "address" },
//             { internalType: "uint256", name: "amountIn", type: "uint256" },
//             {
//               internalType: "uint256",
//               name: "amountOutMinimum",
//               type: "uint256",
//             },
//           ],
//           internalType: "struct IV3SwapRouter.ExactInputParams",
//           name: "params",
//           type: "tuple",
//         },
//       ],
//       name: "exactInput",
//       outputs: [
//         { internalType: "uint256", name: "amountOut", type: "uint256" },
//       ],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           components: [
//             { internalType: "address", name: "tokenIn", type: "address" },
//             { internalType: "address", name: "tokenOut", type: "address" },
//             { internalType: "uint24", name: "fee", type: "uint24" },
//             { internalType: "address", name: "recipient", type: "address" },
//             { internalType: "uint256", name: "amountIn", type: "uint256" },
//             {
//               internalType: "uint256",
//               name: "amountOutMinimum",
//               type: "uint256",
//             },
//             {
//               internalType: "uint160",
//               name: "sqrtPriceLimitX96",
//               type: "uint160",
//             },
//           ],
//           internalType: "struct IV3SwapRouter.ExactInputSingleParams",
//           name: "params",
//           type: "tuple",
//         },
//       ],
//       name: "exactInputSingle",
//       outputs: [
//         { internalType: "uint256", name: "amountOut", type: "uint256" },
//       ],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address[]", name: "path", type: "address[]" },
//         { internalType: "uint256[]", name: "flag", type: "uint256[]" },
//         { internalType: "uint256", name: "amountIn", type: "uint256" },
//         { internalType: "uint256", name: "amountOutMin", type: "uint256" },
//         { internalType: "address", name: "to", type: "address" },
//       ],
//       name: "exactInputStableSwap",
//       outputs: [
//         { internalType: "uint256", name: "amountOut", type: "uint256" },
//       ],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           components: [
//             { internalType: "bytes", name: "path", type: "bytes" },
//             { internalType: "address", name: "recipient", type: "address" },
//             { internalType: "uint256", name: "amountOut", type: "uint256" },
//             {
//               internalType: "uint256",
//               name: "amountInMaximum",
//               type: "uint256",
//             },
//           ],
//           internalType: "struct IV3SwapRouter.ExactOutputParams",
//           name: "params",
//           type: "tuple",
//         },
//       ],
//       name: "exactOutput",
//       outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           components: [
//             { internalType: "address", name: "tokenIn", type: "address" },
//             { internalType: "address", name: "tokenOut", type: "address" },
//             { internalType: "uint24", name: "fee", type: "uint24" },
//             { internalType: "address", name: "recipient", type: "address" },
//             { internalType: "uint256", name: "amountOut", type: "uint256" },
//             {
//               internalType: "uint256",
//               name: "amountInMaximum",
//               type: "uint256",
//             },
//             {
//               internalType: "uint160",
//               name: "sqrtPriceLimitX96",
//               type: "uint160",
//             },
//           ],
//           internalType: "struct IV3SwapRouter.ExactOutputSingleParams",
//           name: "params",
//           type: "tuple",
//         },
//       ],
//       name: "exactOutputSingle",
//       outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address[]", name: "path", type: "address[]" },
//         { internalType: "uint256[]", name: "flag", type: "uint256[]" },
//         { internalType: "uint256", name: "amountOut", type: "uint256" },
//         { internalType: "uint256", name: "amountInMax", type: "uint256" },
//         { internalType: "address", name: "to", type: "address" },
//       ],
//       name: "exactOutputStableSwap",
//       outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "factory",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "factoryV2",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "amount", type: "uint256" },
//       ],
//       name: "getApprovalType",
//       outputs: [
//         {
//           internalType: "enum IApproveAndCall.ApprovalType",
//           name: "",
//           type: "uint8",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           components: [
//             { internalType: "address", name: "token0", type: "address" },
//             { internalType: "address", name: "token1", type: "address" },
//             { internalType: "uint256", name: "tokenId", type: "uint256" },
//             { internalType: "uint256", name: "amount0Min", type: "uint256" },
//             { internalType: "uint256", name: "amount1Min", type: "uint256" },
//           ],
//           internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
//           name: "params",
//           type: "tuple",
//         },
//       ],
//       name: "increaseLiquidity",
//       outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           components: [
//             { internalType: "address", name: "token0", type: "address" },
//             { internalType: "address", name: "token1", type: "address" },
//             { internalType: "uint24", name: "fee", type: "uint24" },
//             { internalType: "int24", name: "tickLower", type: "int24" },
//             { internalType: "int24", name: "tickUpper", type: "int24" },
//             { internalType: "uint256", name: "amount0Min", type: "uint256" },
//             { internalType: "uint256", name: "amount1Min", type: "uint256" },
//             { internalType: "address", name: "recipient", type: "address" },
//           ],
//           internalType: "struct IApproveAndCall.MintParams",
//           name: "params",
//           type: "tuple",
//         },
//       ],
//       name: "mint",
//       outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "bytes32", name: "previousBlockhash", type: "bytes32" },
//         { internalType: "bytes[]", name: "data", type: "bytes[]" },
//       ],
//       name: "multicall",
//       outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "deadline", type: "uint256" },
//         { internalType: "bytes[]", name: "data", type: "bytes[]" },
//       ],
//       name: "multicall",
//       outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
//       name: "multiCall",
//       outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "owner",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "int256", name: "amount0Delta", type: "int256" },
//         { internalType: "int256", name: "amount1Delta", type: "int256" },
//         { internalType: "bytes", name: "_data", type: "bytes" },
//       ],
//       name: "pancakeV3SwapCallback",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "positionManager",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "value", type: "uint256" },
//       ],
//       name: "pull",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "refundETH",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "renounceOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "value", type: "uint256" },
//         { internalType: "uint256", name: "deadline", type: "uint256" },
//         { internalType: "uint8", name: "v", type: "uint8" },
//         { internalType: "bytes32", name: "r", type: "bytes32" },
//         { internalType: "bytes32", name: "s", type: "bytes32" },
//       ],
//       name: "selfPermit",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "nonce", type: "uint256" },
//         { internalType: "uint256", name: "expiry", type: "uint256" },
//         { internalType: "uint8", name: "v", type: "uint8" },
//         { internalType: "bytes32", name: "r", type: "bytes32" },
//         { internalType: "bytes32", name: "s", type: "bytes32" },
//       ],
//       name: "selfPermitAllowed",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "nonce", type: "uint256" },
//         { internalType: "uint256", name: "expiry", type: "uint256" },
//         { internalType: "uint8", name: "v", type: "uint8" },
//         { internalType: "bytes32", name: "r", type: "bytes32" },
//         { internalType: "bytes32", name: "s", type: "bytes32" },
//       ],
//       name: "selfPermitAllowedIfNecessary",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "value", type: "uint256" },
//         { internalType: "uint256", name: "deadline", type: "uint256" },
//         { internalType: "uint8", name: "v", type: "uint8" },
//         { internalType: "bytes32", name: "r", type: "bytes32" },
//         { internalType: "bytes32", name: "s", type: "bytes32" },
//       ],
//       name: "selfPermitIfNecessary",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "_factory", type: "address" },
//         { internalType: "address", name: "_info", type: "address" },
//       ],
//       name: "setStableSwap",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "stableSwapFactory",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "stableSwapInfo",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "amountIn", type: "uint256" },
//         { internalType: "uint256", name: "amountOutMin", type: "uint256" },
//         { internalType: "address[]", name: "path", type: "address[]" },
//         { internalType: "address", name: "to", type: "address" },
//       ],
//       name: "swapExactTokensForTokens",
//       outputs: [
//         { internalType: "uint256", name: "amountOut", type: "uint256" },
//       ],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "amountOut", type: "uint256" },
//         { internalType: "uint256", name: "amountInMax", type: "uint256" },
//         { internalType: "address[]", name: "path", type: "address[]" },
//         { internalType: "address", name: "to", type: "address" },
//       ],
//       name: "swapTokensForExactTokens",
//       outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "amountMinimum", type: "uint256" },
//         { internalType: "address", name: "recipient", type: "address" },
//       ],
//       name: "sweepToken",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "amountMinimum", type: "uint256" },
//       ],
//       name: "sweepToken",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "amountMinimum", type: "uint256" },
//         { internalType: "uint256", name: "feeBips", type: "uint256" },
//         { internalType: "address", name: "feeRecipient", type: "address" },
//       ],
//       name: "sweepTokenWithFee",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "token", type: "address" },
//         { internalType: "uint256", name: "amountMinimum", type: "uint256" },
//         { internalType: "address", name: "recipient", type: "address" },
//         { internalType: "uint256", name: "feeBips", type: "uint256" },
//         { internalType: "address", name: "feeRecipient", type: "address" },
//       ],
//       name: "sweepTokenWithFee",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
//       name: "transferOwnership",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "amountMinimum", type: "uint256" },
//         { internalType: "address", name: "recipient", type: "address" },
//       ],
//       name: "unwrapWETH9",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "amountMinimum", type: "uint256" },
//         { internalType: "address", name: "recipient", type: "address" },
//         { internalType: "uint256", name: "feeBips", type: "uint256" },
//         { internalType: "address", name: "feeRecipient", type: "address" },
//       ],
//       name: "unwrapWETH9WithFee",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "amountMinimum", type: "uint256" },
//         { internalType: "uint256", name: "feeBips", type: "uint256" },
//         { internalType: "address", name: "feeRecipient", type: "address" },
//       ],
//       name: "unwrapWETH9WithFee",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
//       name: "wrapETH",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     { stateMutability: "payable", type: "receive" },
//   ];
//   const contractAddress = "0x9a489505a00cE272eAa5e07Dba6491314CaE3796";
//   const router = new ethers.Contract(contractAddress, abirouter, signer);

//   // Example usage
//   const params = {
//     tokenIn: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", // Token address
//     tokenOut: "0x52D374705B70B8a40bDAD544DBC83F0B1185284d", // Token address
//     fee: 10000, // Fee (uint24)
//     recipient: "0x783D04B585d8b1738e1813b6656a0e049A289E02", // Recipient address
//     amountIn: 100000000000000, // Amount in (uint256)
//     amountOutMinimum: 0,
//     sqrtPriceLimitX96: 0, // sqrtPriceLimitX96 (uint160)
//   };

//   console.log("...................................................");
//   const iface = new ethers.utils.Interface(abirouter);
//   const data = iface.encodeFunctionData("exactInputSingle", [params]);

//   const call = iface.encodeFunctionData("multiCall", [[data]]);

//   //   const txArgs = {
//   //     to: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
//   //     from: "0x8eEb5a3ec6dE7BDCad2d72C9d0AEd302011d2E7D",
//   //     data: call,
//   //     value: ethers.utils.parseEther("0.0001"),
//   //     gasLimit: ethers.BigNumber.from("10000000000"), // Increase gas limit
//   //   }

//   //   const tx = await signer.sendTransaction(txArgs);

//   const { transfer, hash } = await writeContract({
//     address: contractAddress,
//     abi: abirouter,
//     functionName: "multiCall",
//     args: [[data]],
//     chainId: 97,
//   });
//   // const tx = await router.multiCall([data], { value: ethers.utils.parseEther("0.0001") });
//   // await tx.wait();

//   console.log("encoded:", data);
//   console.log("call:", call);
//   console.log("tx:", tx);

//   // const receipt = await tx.wait();
//   // console.log("receipt:", receipt);
// }

// encodeExactInputSingleParams()

// debugger
//for balance fetching of both smart contract and token holder
async function readData() {
  try {
    const roundinfo = await readContract({
      address: contractAddress,
      abi: Abi,
      functionName: "round",
      chainId: 97,
    });
    console.log("roundName:", roundinfo[0])
    const userinfo = await readContract({
      address: contractAddress,
      abi: Abi,
      functionName: "getUserInfo",
      args: [connectedAccount],
      chainId: 97,
    });
    console.log("balancetowithdraw", userinfo.remainToClaim)
    console.log("claimablebalance", userinfo.totalClaimed)
    console.log("currentbalance", userinfo.totalPurchased)
    const tokenInfo = await readContract({
      address: contractAddress,
      abi: Abi,
      functionName: "getRoundTokenSaleInfo",
      chainId: 97,
    });
    console.log("tokenInfo", tokenInfo)
    const price = await readContract({
      address: pricefeed,
      abi: agree,
      functionName: "latestRoundData",
      chainId: 97,
    });
    console.log("conversionRate", BigInt(price[1]) / BigInt(10 ** 8));

  } catch (err) {
    console.error(err); // Corrected from err to console.error(err)
  }

}

//for approval and deposit
async function writeData() {
  try {
    const { hash } = await writeContract({
      address: contractAddress,
      abi: Abi,
      functionName: "buy",
      args: [0, 1, "0x0000000000000000000000000000000000000000"],
      value: parseGwei(1),
      chainId: 97,
    });

    console.log("hash:", hash);
  } catch (err) {
    console.error(err);
  }
}

document
  .getElementById("writeButton")
  .addEventListener("click", writeData);
document.getElementById("readButton").addEventListener("click", readData);
