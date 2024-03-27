import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import Web3 from 'https://cdn.jsdelivr.net/npm/web3@4.3.0/+esm'

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
import {MerkleTree} from 'https://cdn.jsdelivr.net/npm/merkletreejs@0.3.11/+esm'
// import keccak256 from 'https://cdn.jsdelivr.net/npm/keccak256@1.0.6/+esm'
import { ethers } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/5.5.4/ethers.esm.js'
// import { parseGwei } from "https://cdn.jsdelivr.net/npm/viem";

// 0. Import wagmi dependencies
const { polygonMumbai, sepolia } = WagmiCoreChains;
const {
  signMessage,
  Address,
  configureChains,
  createConfig,
  getContract,
  getAccount,
  getWalletClient,
  fetchBalance,
  estimateGas,
  readContract,
  writeContract,
  erc721ABI,
} = WagmiCore;

// 1. Define chains
const chains = [ sepolia ];
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
const contractAddress = "0xc9d45b1B8025B5b172f415435d9cb27AC295be56";
const Abi = [
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "id",
				"type": "bytes4"
			}
		],
		"name": "lockFunction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_royaltyReceiver",
				"type": "address"
			},
			{
				"internalType": "uint96",
				"name": "_royaltyFraction",
				"type": "uint96"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AlreadyReservedTokens",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ApprovalQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BalanceQueryForZeroAddress",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32[]",
				"name": "merkleProof",
				"type": "bytes32[]"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FunctionLocked",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintERC2309QuantityExceedsLimit",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MintZeroQuantity",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnerQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OwnershipNotInitializedForExtraData",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ProvenanceHashAlreadySet",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferCallerNotOwnerNorApproved",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferFromIncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToNonERC721ReceiverImplementer",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TransferToZeroAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "URIQueryForNonexistentToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "WithdrawFailed",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "toTokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "ConsecutiveTransfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "reserve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "secondaryReserve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_merkleRoot",
				"type": "bytes32"
			}
		],
		"name": "setMerkleRoot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setOperatorFilteringEnabled",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_provenanceHash",
				"type": "string"
			}
		],
		"name": "setProvenanceHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint96",
				"name": "royaltyFraction",
				"type": "uint96"
			}
		],
		"name": "setRoyalties",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_claimSupply",
				"type": "uint256"
			}
		],
		"name": "updateClaimSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			}
		],
		"name": "updateSecondaryReserveAmt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "users",
				"type": "address[]"
			},
			{
				"internalType": "bool",
				"name": "_hasClaimed",
				"type": "bool"
			}
		],
		"name": "updateUserClaimStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Claimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimSupply",
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
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"name": "functionLocked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
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
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_SUPPLY",
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
		"name": "merkleRoot",
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
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "numberMinted",
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
		"name": "operatorFilteringEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
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
		"name": "provenanceHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RESERVED",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_salePrice",
				"type": "uint256"
			}
		],
		"name": "royaltyInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
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
		"name": "secReserved",
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
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimed",
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
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// async function mintPublic() {
//   console.log("heloo")
//   const ukCheckbox = document.getElementById("ukCheckbox");
//   const quantextField = document.getElementById("quantity");

//   // Check if the checkbox is checked and get the value from the text field
//   const isChecked = ukCheckbox.checked;
//   const Value = parseInt(quantextField.value);

//   // Import the web3 library
//   // (Assuming that the 'Web3' and 'writeContract' functions are defined elsewhere in your code)

//   // Create a web3 instance
//   const web3 = new Web3("https://rpc.ankr.com/polygon_mumbai"); // Replace with your Ethereum node URL

//   // Create a contract instance
//   const myContract = new web3.eth.Contract(Abi, contractAddress);

//   // Input parameters for the function
//   const to = connectedAccount; // Replace with the receiver's address
//   const quantity = Value; // Replace with the quantity
//   const isUk = isChecked; // Replace with the value of _isUk
//   const price = await myContract.methods.mintPrice().call();
//   console.log(".............", price)
//   var totalCost = price * BigInt(quantity)
//   console.log("............ccccc.", totalCost)

//   // Estimate gas for the function
//   try {
// 	var estimatedGas = await myContract.methods.publicMint(quantity, isUk)
//     .estimateGas({ from: to, value: totalCost.toString() });

//   console.log('Gas Estimate:', estimatedGas);
//   alert(estimatedGas)
//   } catch (error) {
// 	console.log(error)
//   }
  
//   try {
// 	//   const result = await estimateGas({
// 	// 	gas: parseGwei('20'), 
// 	// 	to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
// 	// 	value: parseEther('0.01'),
// 	//   })
// 	//   console.log("estimated Gas:", result);
//     const { publicMint } = await estimateGas({
//       address: contractAddress,
//       abi: Abi,
//       functionName: "publicMint",
//       args: [quantity, isUk], // Pass the value and checkbox state
//       chainId: 80001,
// 	  gas: 200000000000, 
// 	  to: connectedAccount,
//       value: totalCost,
//     });

// 	const { Mint } = await writeContract({
// 		address: contractAddress,
// 		abi: Abi,
// 		functionName: "publicMint",
// 		args: [quantity, isUk], // Pass the value and checkbox state
// 		chainId: 80001,
// 		value: totalCost,
// 		gas: publicMint, 
// 	  });
//   } catch (err) {
// 	const trimmedError = err.message.split("\n").slice(0, 2);// Get the first line of the error message
//     console.log(trimmedError);
//     alert(trimmedError.join("\n"));
//   }
// }

// readData();
let hexProof = [];

const inputs = [
  { address: "0x8eEb5a3ec6dE7BDCad2d72C9d0AEd302011d2E7D", quantity: 2 },
  { address: "0xb8A6f3F49D43258A7bBC737c7feCc23a82a230b4", quantity: 0 },
  { address: "0x8C826a0dAFb295788E71E15feaC90b09d7C48936", quantity: 0 },
  { address: "0x487db7293CE82f3dd9485cc6594b6a2055Cb9828", quantity: 0 },
  { address: "0x87F00532C65c4789baF88D81dAeEbB65d4b92E04", quantity: 1 },
  { address: "0x06A85356DCb5b307096726FB86A78c59D38e08ee", quantity: 0 },
]
// create leaves from users' address and amount
const leaves = inputs.map((x) =>
    ethers.utils.solidityKeccak256(
        ["address", "uint256"],
        [x.address, x.quantity]
    )
);
// create a Merkle tree
const tree = new MerkleTree(leaves, keccak256, { sort: true });
console.log(tree.toString());
const rootHash = tree.getRoot();


const buf2hex = x => '0x' + x.toString('hex')

console.log("root:", buf2hex(tree.getRoot()))

var spender = "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE";
var owner = connectedAccount;
// debugger
// async function readData(){
// 	try
// 	{const { read } = await readContract({
// 		address: contractAddress,
// 		abi: Abi,
// 		functionName: "allowance",
// 		args: [owner, spender], // Pass the value and checkbox state
// 		chainId: 56,
// 	});
// 	console.log("balance:", read);
// 	}
// 	catch(err){
// 		console.err
// 	}
// }

// async function writeData(){
// 	try
// 	{const { write } = await writeContract({
// 		address: contractAddress,
// 		abi: Abi,
// 		functionName: "approve",
// 		args: [spender, quantity], // Pass the value and checkbox state
// 		chainId: 56,
// 	});
// 	console.log("hellllllllloooooooo:");
// 	}
// 	catch(err){
// 		console.err
// 	}
// }

    // Get the address from the input field
    // const _address = address.value;
    // const amount = 1;

    // // Generate the leaf using solidityKeccak256
    // const leaf = ethers.utils.solidityKeccak256(["address", "uint256"], [_address, amount]);

    // // Now you can use this 'leaf' to update your Merkle proof and payment button
    // hexProof = tree.getHexProof(leaf);
    // const bytes32Proof = hexProof.map(hex => "0x" + hex.slice(2));
    // console.log("Generated leaf:", leaf);
    // console.log("Generated proof:", hexProof);

async function mintPrivate() {
  console.log("helo")
  const address = document.getElementById("address")
  const ukCheckbox = document.getElementById("ukCheckbox");
  const quantextField = document.getElementById("quantityPrivate");

  // Check if the checkbox is checked and get the value from the text field
  const isChecked = ukCheckbox.checked;
  const Value = parseInt(quantextField.value);

  const _address = address.value;
    // const amount = 1;

    // Generate the leaf using solidityKeccak256
    const leaf = ethers.utils.solidityKeccak256(["address", "uint256"], [connectedAccount, 2]);

    // Now you can use this 'leaf' to update your Merkle proof and payment button
    hexProof = tree.getHexProof(leaf);
    console.log("Generated leaf:", leaf);
    console.log("Generated proof:", hexProof);
  // Import the web3 library
  // (Assuming that the 'Web3' and 'writeContract' functions are defined elsewhere in your code)

  // Create a web3 instance
  const web3 = new Web3("https://rpc.ankr.com/polygon_mumbai"); // Replace with your Ethereum node URL

  // Create a contract instance
  // const myContract = new web3.eth.Contract(Abi, contractAddress);

  // Input parameters for the function
  const to = address.value; // Replace with the receiver's address
  console.log(to)
  const quantity = parseInt(Value); // Replace with the quantity
  const isUk = isChecked; // Replace with the value of _isUk
  // const price = await myContract.methods.mintPrice().call();
  // console.log(".............", price)
  // var totalCost = price * BigInt(quantity)
  // console.log("............ccccc.", totalCost)

  // Estimate gas for the function
  // var estimatedGas = await myContract.methods.whiteListMint(to, quantity, isUk, hexProof)
  // .estimateGas({ from: to, value: totalCost.toString() })
  // .then((gasEstimate) => {
  //   console.log('Gas Estimate:', gasEstimate);
  // })
  // .catch((error) => {
  //   console.error('Error estimating gas:', error);
  // });

  // console.log('Gas Estimate:', estimatedGas);

  try {
    const { whiteListMint } = await writeContract({
      address: contractAddress,
      abi: Abi,
      functionName: "claim",
      args: [2,hexProof], // Pass the value and checkbox state
      chainId: 11155111,
    });
  } catch (err) {
    const trimmedError = err.message.split("\n").slice(0, 2);// Get the first line of the error message
    console.log(trimmedError);
    alert(trimmedError.join("\n"));
  }
}

// document.getElementById("Mint").addEventListener("click", writeData);
document.getElementById("MintPrivate").addEventListener("click", mintPrivate);

// Get a reference to the HTML button element
//   const signButton = document.getElementById('signButton');

//   // Add a click event listener to the button
//   signButton.addEventListener('click', async () => {
//       try {
//           // Sign the message when the button is clicked
//           const signature = await getWalletClient();
//           // const address = signature.getAddress();
//           // Log the signature to the console (you can do something else with it)
//           console.log('Signature:', signature);
//       } catch (error) {
//           // Handle errors here
//           console.error('Error:', error);
//       }
//   });
