# AICoin
This repository contains the Solidity code used to create the AICoin.
It also contains the address of the coin and ABI, useful to add the contract to the Mist wallet.

## TEST-NET
The beta version of the code exists already as a smart contract on the Ethereum Test-Net (Ropsten). To add this to your own contracts page, you can use the address and ABI code that are in files under the contracts folder of this repository.

## Javascript interface
The contract code has been kept intentionally simple, and a javascript library has been developed to provide higher-level access to contract information and to send transactions that will execute contract methods.
The two primary user methods are "transfer" to move AICoin from one address to another, and "vote" to participate in a ballot.

## Website
To find out more about AICoin, please visit http://aicoin.io.
