import {
  DAPP_ADDRESS,
  APTOS_FAUCET_URL,
  APTOS_NODE_URL
} from "../config/constants";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { MoveResource } from "@martiandao/aptos-web3-bip44.js/dist/generated";
import { useState } from "react";
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

  const { account, signAndSubmitTransaction } = useWallet();
  const client = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
  const [mintTx, setMintTx] = useState('');
  const [stakeTx, setStakeTx] = useState('');
  const [claimTx, setClaimTx] = useState('');
  const [tokens, setTokens] = useState<string[]>([]);
  const [stakedWolf, setStakedWolf] = useState(0);
  const [stakedSheep, setStakedSheep] = useState(0);

  const [mintInput, updateMintInput] = useState<{
    stake: number;
    amount: number;
  }>({
    stake: 0,
    amount: 1,
  });

  const [stakeInput, updateStakeInput] = useState<{
    tokenId: number;
  }>({
    tokenId: 0,
  });

  const [claimInput, updateClaimInput] = useState<{
    tokenId: number;
  }>({
    tokenId: 0,
  });

  async function mint_nft() {
    const result = await signAndSubmitTransaction(
      mint(false),
      { gas_unit_price: 100 }
    );
    if (result) {
      console.log(result);
      setMintTx(result.hash);
    }
  }

  async function mint_nft_stake() {
    const result = await signAndSubmitTransaction(
      mint(true),
      { gas_unit_price: 100 }
    );
    if (result) {
      console.log(result);
      setMintTx(result.hash);
    }
  }

  async function stake_nft() {
    const result = await signAndSubmitTransaction(
      stake(),
      { gas_unit_price: 100 }
    );
    if (result) {
      console.log(result);
      setStakeTx(result.hash);
    }
  }

  async function claim_nft() {
    const result = await signAndSubmitTransaction(
      claim(),
      { gas_unit_price: 100 }
    );
    if (result) {
      console.log(result);
      setClaimTx(result.hash);
    }
  }

  async function register_coin() {
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

  async function getStaked() {
    console.log(await client.getTokenIds(account!.address!.toString()));
  }

  // async function faas_test() {
  //   newAxios.post(
  //     '/api/v1/run?name=DID.Renderer&func_name=get_module_doc',
  //     {
  //       "params": [
  //       ]
  //     },
  //   ).then(
  //     value => {
  //       console.log(value.data);
  //     }
  //   );
  // }
  // async function get_did_resource_v2() {
  //   newAxios.post(
  //     '/api/v1/run?name=DID.Renderer&func_name=gen_did_document',
  //     { "params": [account!.address!.toString()] },
  //   ).then(
  //     value => {
  //       console.log(value.data)
  //       setResourceV2(value.data)
  //     }
  //   );
  // }

  // async function get_did_resource() {
  //   client.aptosClient.getAccountResource(account!.address!.toString(), DAPP_ADDRESS + "::addr_aggregator::AddrAggregator").then(
  //     setResource
  //   );
  // }

  // function log_acct() {
  //   console.log(resource)
  //   console.log(account!.address!.toString());
  // }

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
    const { tokenId } = stakeInput;
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::add_many_to_barn_and_pack_with_index",
      type_arguments: [],
      arguments: [
        tokenId,
      ],
    };
  }

  function claim() {
    const { tokenId } = claimInput;
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::claim_many_from_barn_and_pack_with_index",
      type_arguments: [],
      arguments: [
        tokenId,
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

  return (
    <div style={{ paddingTop: '1px' }}>
      <div className="mb-5 text-center title justify-self-start">Wolf Game</div>
      <div className="mb-5 text-sm font-console text-red" style={{ maxWidth: "50%" }}>
        <div className="relative flex justify-center w-full h-full p-1 overflow-hidden md:p-5" style={{ borderImage: "url('/wood-frame.svg') 30 / 1 / 0 stretch", borderWidth: "30px", background: "rgb(237, 227, 209);" }}>
          <div className="relative w-full h-full z-index:5">
            <div className="absolute" style={{ width: "120%", height: "120%", top: "-20px", left: "-20px", opacity: "0.04", backgroundImage: "url('./wood-mask.svg')", backgroundRepeat: "repeat", backgroundSize: "400px 268px" }}></div>
            <div className="flex flex-col items-center">
              <input
                placeholder="Enter mint amount"
                className="relative mt-4 p-4 input input-bordered input-primary"
                onChange={(e) =>
                  updateMintInput({ ...mintInput, amount: parseInt(e.target.value) })
                }
              />
              <div className="h-8"></div>
              <div className="flex flex-row items-center">
                <div className="relative flex items-center justify-center cursor-pointer false" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                  <div className="text-center font-console pt-1" onClick={mint_nft}>Mint</div>
                </div>
                <div className="relative flex items-center justify-center cursor-pointer false" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                  <div className="text-center font-console pt-1" onClick={mint_nft_stake}>Mint & Stake</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p><b>Module Path:</b> {DAPP_ADDRESS}::woolf</p>
      <br></br>
      {mintTx && <a href={`https://explorer.aptoslabs.com/txn/${mintTx}`}> view transaction </a>}
      <br></br>
      <button
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
      <br></br>
      <input
        placeholder="Enter token ID"
        className="mt-4 p-4 input input-bordered input-primary"
        value={stakeInput.tokenId}
        onChange={(e) => {
          let targetValue
          if (e.target.value == '') {
            targetValue = 0
          } else {
            targetValue = parseInt(e.target.value)
          }
          updateStakeInput({ ...claimInput, tokenId: targetValue })
        }}
      />
      <br></br>
      <button
        onClick={stake_nft}
        className={
          "btn btn-primary font-bold mt-4 text-white rounded p-4 shadow-lg"
        }>
        Stake
      </button>
      {stakeTx && <a href={`https://explorer.aptoslabs.com/txn/${stakeTx}`}> view transaction </a>}
      <br></br>
      {/* <button
        onClick={getStaked}
        className={
          "btn btn-primary font-bold mt-4  text-white rounded p-4 shadow-lg"
        }>
        Get Staked
      </button>
      <br></br> */}
      <input
        placeholder="Enter collection name"
        className="mt-8 p-4 input input-bordered input-primary"
        value={claimInput.tokenId}
        onChange={(e) => {
          let targetValue
          if (e.target.value == '') {
            targetValue = 0
          } else {
            targetValue = parseInt(e.target.value)
          }
          updateClaimInput({ ...claimInput, tokenId: targetValue })
        }}
      />
      <br></br>
      <button
        onClick={claim_nft}
        className={
          "btn btn-primary font-bold mt-4 text-white rounded p-4 shadow-lg"
        }>
        Claim
      </button>
      {claimTx && <a href={`https://explorer.aptoslabs.com/txn/${claimTx}`}> view transaction </a>}
    </div>
  );
}

