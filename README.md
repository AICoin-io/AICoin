# AICoin
This repository contains the Solidity code used to create the AICoin.
It also contains the address of the coin and ABI, useful to add the contract to the Mist wallet.

## Javascript interface
The contract code has been kept intentionally simple, and a javascript library has been developed to provide higher-level access to contract information and to send transactions that will execute contract methods.
The two primary user methods are "transfer" to move AICoin from one address to another, and "vote" to participate in a ballot.

## Wallet application
We are also developing a standalone wallet, in pure HTML & Javascript.
This can be used to connect to a local node, or a remote node on, for example, http://infura.io.

## Website
To find out more about AICoin, please visit http://aicoin.io.
