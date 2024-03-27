const ethers = require("ethers");

const privateKey = "da2eeb57a799d9fbc502e5513b2353919a3ed4bfbd4986b25ade01f0aa0cf29d";
const rpc = "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
const provider = new ethers.providers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(privateKey)
const signer = wallet.connect(provider);

async function encodeExactInputSingleParams(
) {
  const abi = [
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
  const router = new ethers.Contract(contractAddress, abi, signer);

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


  const iface = new ethers.utils.Interface(abi);
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
  const tx = await router.multiCall([data], { value: ethers.utils.parseEther("0.0001") });
  await tx.wait();
  
  
  console.log("encoded:", data)
  console.log("call:", call)
  console.log("tx:", tx)
  
  const receipt = await tx.wait();
  console.log("receipt:", receipt);
}

encodeExactInputSingleParams()


