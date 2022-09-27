export default {
  domain: {
    // Defining the chain aka Rinkeby testnet or Ethereum Main Net
    chainId: 1,
    name: "rarewear.club",
    version: "1"
  },

  // Defining the message signing data content.
  message: {
    /*
     - Anything you want. Just a JSON Blob that encodes the data you want to send
     - No required fields
     - This is DApp Specific
     - Be as explicit as possible when building out the message schema.
    */
    nonce: "12345"
  },
  // Refers to the keys of the *types* object below.
  primaryType: "signature",
  types: {
    // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" }
    ],
    // Refer to PrimaryType
    signature: [{ name: "nonce", type: "string" }]
  }
};
