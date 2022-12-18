import {
  DAPP_ADDRESS,
  APTOS_FAUCET_URL,
  APTOS_NODE_URL
} from "../config/constants";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { MoveResource } from "@martiandao/aptos-web3-bip44.js/dist/generated";
import { useState, useEffect } from "react";
import React from "react";
import {
  AptosAccount,
  WalletClient,
  HexString,
  AptosClient,
} from "@martiandao/aptos-web3-bip44.js";

import { CodeBlock } from "../components/CodeBlock";

import newAxios from "../utils/axios_utils";

// import { TypeTagVector } from "@martiandao/aptos-web3-bip44.js/dist/aptos_types";
// import {TypeTagParser} from "@martiandao/aptos-web3-bip44.js/dist/transaction_builder/builder_utils";
export default function Home() {

  const { account, signAndSubmitTransaction, connected } = useWallet();
  const client = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
  const [mintTx, setMintTx] = useState('');
  const [stakeTx, setStakeTx] = useState('');
  const [claimTx, setClaimTx] = useState('');
  const [tokens, setTokens] = useState<string[]>([]);
  const [stakedWolf, setStakedWolf] = useState(0);
  const [stakedSheep, setStakedSheep] = useState(0);
  const [collectionSupply, setCollectionSupply] = useState(0);
  const [cost, setCost] = useState('');

  const MAX_TOKEN = 100;
  const PAID_TOKENS = 20;
  const MINT_PRICE = 1;

  const [mintInput, updateMintInput] = useState<{
    stake: number;
    amount: number;
  }>({
    stake: 0,
    amount: 1,
  });

  const [tokenInput, updateTokenInput] = useState<{
    tokenId: number;
  }>({
    tokenId: 0,
  });

  function check_if_connected() {
    if (!connected) {
      alert("Please connect wallet first")
    }
  }

  async function mint_nft() {
    check_if_connected()
    const result = await signAndSubmitTransaction(
      mint(false),
      { gas_unit_price: 100 }
    );
    if (result) {
      setMintTx(result.hash);
    }
  }

  async function mint_nft_stake() {
    check_if_connected()
    const result = await signAndSubmitTransaction(
      mint(true),
      { gas_unit_price: 100 }
    );
    if (result) {
      setMintTx(result.hash);
    }
  }

  async function stake_nft() {
    check_if_connected()
    const result = await signAndSubmitTransaction(
      stake(),
      { gas_unit_price: 100 }
    );
    if (result) {
      setStakeTx(result.hash);
    }
  }

  async function unstake_nft() {
    check_if_connected()
    const result = await signAndSubmitTransaction(
      unstake(),
      { gas_unit_price: 100 }
    );
    if (result) {
      setClaimTx(result.hash);
    }
  }

  async function claim_wool() {
    check_if_connected()
    const result = await signAndSubmitTransaction(
      claim(),
      { gas_unit_price: 100 }
    );
    if (result) {
      setClaimTx(result.hash);
    }
  }

  async function register_coin() {
    check_if_connected()
    const result = await signAndSubmitTransaction(
      register(),
      { gas_unit_price: 100 }
    );
    if (result) {
      console.log(result);
    }
  }

  async function getTokens() {
    const result = await client.getTokens(account!.address!.toString());
    if (result) {
      console.log(result);
      setTokens(result.map(e => e.token.name))
    }
  }

  async function getCollectionSupply() {
    const result = await client.getAccountResource(DAPP_ADDRESS, DAPP_ADDRESS + "::token_helper::Data");
    if (result) {
      console.log(1)
      setCollectionSupply(result.data.collection_supply)
    }
  }

  async function getStaked() {
    console.log(await client.getTokenIds(account!.address!.toString()));
  }

  function mint(stake: boolean) {
    const { amount } = mintInput;
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::woolf::mint",
      type_arguments: [],
      arguments: [
        amount,
        stake
      ],
    };
  }

  function stake() {
    const { tokenId } = tokenInput;
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::add_many_to_barn_and_pack_with_index",
      type_arguments: [],
      arguments: [
        tokenId,
      ],
    };
  }

  function unstake() {
    const { tokenId } = tokenInput;
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::claim_many_from_barn_and_pack_with_index",
      type_arguments: [],
      arguments: [
        tokenId,
        true
      ],
    };
  }

  function claim() {
    const { tokenId } = tokenInput;
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::claim_many_from_barn_and_pack_with_index",
      type_arguments: [],
      arguments: [
        tokenId,
        false
      ],
    };
  }

  function register() {
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::wool::register_coin",
      type_arguments: [],
      arguments: [],
    };
  }

  useEffect(() => {
    let { amount } = mintInput;
    if (Number.isNaN(amount)) {
      amount = 0
    }
    if (collectionSupply < PAID_TOKENS) {
      setCost(`${(MINT_PRICE * amount).toFixed(3)} APT`)
    } else if (collectionSupply <= MAX_TOKEN * 2 / 5) {
      setCost(`${20000 * amount} WOOL`)
    } else if (collectionSupply <= MAX_TOKEN * 4 / 5) {
      setCost(`${40000 * amount} WOOL`)
    } else {
      setCost(`${80000 * amount} WOOL`)
    }

  }, [collectionSupply, mintInput]);

  useEffect(() => {
    const fetchData = async () => {
      await getCollectionSupply();
    }
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 10000)
    return () => clearInterval(interval)
  }, []);

  return (
    <div style={{ paddingTop: '1px' }}>
      <div className="mb-5 text-center title">Wolf Game</div>
      <div className="flex flex-row items-center space-x-2 justify-center">
        <div className="mb-5 text-sm font-console basis-2/5 " style={{ maxWidth: "100%" }}>
          <div className="relative flex justify-center w-full h-full p-1 overflow-hidden md:p-5" style={{ borderImage: "url('/wood-frame.svg') 30 / 1 / 0 stretch", borderWidth: "30px", background: "rgb(237, 227, 209);" }}>
            <div className="absolute" style={{ width: "120%", height: "120%", top: "-20px", left: "-20px", opacity: "0.04", backgroundImage: "url('/wood-mask.svg')", backgroundRepeat: "repeat", backgroundSize: "400px 268px" }}></div>
            <div className="relative w-full h-full z-index:5">
              <div className="flex flex-col items-center">
                <div className="text-center font-console pt-1 text-red text-2xl">MINTING</div>
                <div className="h-4"></div>
                <div className="gen">
                  <div className="flex flex-row justify-between w-full">
                    <span style={{borderRight: "4px solid #000000", width: "20%"}} className="flex-initial">GEN 0</span>
                    <span style={{borderRight: "4px solid #000000", width: "20%"}} className="flex-initial">20,000 $WOOL</span>
                    <span style={{borderRight: "4px solid #000000", width: "40%"}} className="flex-initial">40,000 $WOOL</span>
                    <span className="flex-initial" style={{width: "20%"}}>80,000 $WOOL</span>
                  </div>
                  <div className="progress-bar" style={{ width: `${collectionSupply / 100 * 100}%` }}></div>
                </div>
                <div><span className="text-red">{collectionSupply} MINTED</span></div>
                <div><span className="text-red">Cost: {cost}</span></div>
                <input
                  placeholder="Enter mint amount"
                  className="relative mt-4 p-4"
                  style={{ height: "3rem", fontSize: "1rem", userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px", textAlign: "center" }}
                  onChange={(e) =>
                    updateMintInput({ ...mintInput, amount: parseInt(e.target.value) })
                  }
                />
                <div className="h-4"></div>
                <div className="flex flex-row space-x-4">
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={mint_nft}>Mint</div>
                  </div>
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={mint_nft_stake}>Mint & Stake</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5 text-sm font-console basis-2/5" style={{ maxWidth: "50%" }}>
          <div className="relative flex justify-center w-full h-full p-1 overflow-hidden md:p-5" style={{ borderImage: "url('./wood-frame.svg') 30 / 1 / 0 stretch", borderWidth: "30px", background: "rgb(237, 227, 209);" }}>
            <div className="absolute" style={{ width: "120%", height: "120%", top: "-20px", left: "-20px", opacity: "0.04", backgroundImage: "url('/wood-mask.svg')", backgroundRepeat: "repeat", backgroundSize: "400px 268px" }}></div>
            <div className="relative w-full h-full z-index:5">
              <div className="flex flex-col items-center">
                <div className="text-center font-console pt-1 text-xl">$WOOL in your wallet: 0.00 $WOOL</div>
                <div className="h-4"></div>
                <div className="text-center font-console pt-1 text-red text-2xl">UNSTAKED</div>
                <div className="h-4"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">Can Stake</div><div className="text-red font-console text-xs">NO TOKENS</div>
                </div>
                <div className="h-4"></div>
                <div className="text-center font-console pt-1 text-red text-2xl">STAKED</div>
                <div className="h-4"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">BARN</div><div className="text-red font-console text-xs">NO TOKENS</div>
                </div>
                <div className="h-2"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">WOLFPACK</div><div className="text-red font-console text-xs">NO TOKENS</div>
                </div>
                <div className="h-4"></div>
                <div className="text-center font-console pt-1 text-red text-xl">Select tokens to stake, shear or unstake</div>
                <input
                  placeholder="Enter Sheep/Wolf ID"
                  className="relative mt-4 p-4"
                  style={{ height: "3rem", fontSize: "1rem", userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px", textAlign: "center" }}
                  onChange={(e) =>
                    updateTokenInput({ ...tokenInput, tokenId: parseInt(e.target.value) })
                  }
                />
                <div className="h-4"></div>
                <div className="flex flex-row space-x-4">
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={stake_nft}>Stake</div>
                  </div>
                </div>
                <div className="h-4"></div>
                <div className="flex flex-row space-x-4">
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={claim_wool}>Shear $WOOL</div>
                  </div>
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={unstake_nft}>Shear $WOOL and Unstake</div>
                  </div>
                </div>
                <div className="h-4"></div>
                <div className="flex flex-row space-x-4">
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={register_coin}>Register Wool Coin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {mintTx && <a href={`https://explorer.aptoslabs.com/txn/${mintTx}`}> view transaction </a>} */}
      {/* <button
        onClick={getTokens}
        className={
          "btn btn-primary font-bold mt-4  text-white rounded p-4 shadow-lg"
        }>
        Get Tokens
      </button>
      <br></br>
      <ol className="mt-4">{tokens && tokens.map(e => <p key={e}>{e}</p>)}</ol>
      <br></br>
      <button
        onClick={register_coin}
        className={
          "btn btn-primary font-bold mt-4 text-white rounded p-4 shadow-lg"
        }>
        Register Wool Coin
      </button>
      <br></br> */}
    </div>
  );
}

