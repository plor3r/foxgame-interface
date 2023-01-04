import {
  DAPP_ADDRESS,
  APTOS_FAUCET_URL,
  APTOS_NODE_URL,
  NETWORK,
} from "../config/constants";
import Image from 'next/image';
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useState, useEffect } from "react";
import React from "react";
import {
  AptosAccount,
  WalletClient,
  HexString,
  AptosClient,
} from "@martiandao/aptos-web3-bip44.js";

import newAxios from "../utils/axios_utils";

export default function Home() {

  const { account, signAndSubmitTransaction, connected } = useWallet();
  const client = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
  const [mintTx, setMintTx] = useState('');
  const [stakeTx, setStakeTx] = useState('');
  const [claimTx, setClaimTx] = useState('');
  const [collectionSupply, setCollectionSupply] = useState(0);
  const [cost, setCost] = useState('');
  const [unstakedSheep, setUnstakedSheep] = useState<Array<number>>([]);
  const [unstakedWolf, setUnstakedWolf] = useState<Array<number>>([]);
  const [unstakedSelected, setUnstakedSelected] = useState<Array<number>>([])
  const [stakedSheep, setStakedSheep] = useState<Array<number>>([]);
  const [stakedWolf, setStakedWolf] = useState<Array<number>>([]);
  const [stakedSelected, setStakedSelected] = useState<Array<number>>([])
  const [woolBalance, setWoolBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);

  const MAX_TOKEN = 50000;
  const PAID_TOKENS = 10000;
  const MINT_PRICE = 0.99;

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
      setUnstakedSelected([])
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
      setStakedSelected([])
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
    if (!connected) { return }
    const result = await client.getTokens(account!.address!.toString());
    if (result) {
      let allNFT = result.filter(t => t.token.collection === "Woolf Game NFT");
      let sheep = allNFT.filter(t => t.token.name.startsWith("Sheep"))
      let wolf = allNFT.filter(t => t.token.name.startsWith("Wolf"))
      setUnstakedSheep(sheep.map(e => {
        let i = e.token.name.indexOf("#")
        return parseInt(e.token.name.slice(i + 1))
      }).filter(t => !stakedSheep.includes(t)))
      setUnstakedWolf(wolf.map(e => {
        let i = e.token.name.indexOf("#")
        return parseInt(e.token.name.slice(i + 1))
      }).filter(t => !stakedWolf.includes(t)))
    }
  }

  async function getCollectionSupply() {
    const result = await client.getAccountResource(DAPP_ADDRESS, DAPP_ADDRESS + "::token_helper::Data");
    if (result) {
      setCollectionSupply(result.data.collection_supply)
    }
  }

  async function getWoolBalance() {
    if (!connected) {
      return;
    }
    const result = await client.getCoinBalance(account!.address!.toString(), DAPP_ADDRESS + "::wool::Wool");
    if (result) {
      setWoolBalance(result);
    }
  }

  async function getStakedSheep() {
    if (!connected) {
      return
    }
    const result = await client.getAccountResource(DAPP_ADDRESS, DAPP_ADDRESS + "::barn::StakedSheep");
    if (!result) {
      return
    }
    const stakedHandle = result.data.items.handle
    newAxios.post(
      `${APTOS_NODE_URL}tables/${stakedHandle}/item`,
      {
        "key_type": "address",
        "value_type": "vector<u64>",
        "key": account!.address!.toString()
      },
    ).then(
      value => {
        setStakedSheep(value.data.map((v: string) => parseInt(v)))
      }
    ).catch();
  }

  async function getStakedWolf() {
    if (!connected) {
      return
    }
    const result = await client.getAccountResource(DAPP_ADDRESS, DAPP_ADDRESS + "::barn::StakedWolf");
    if (!result) {
      return
    }
    const stakedHandle = result.data.items.handle
    newAxios.post(
      `${APTOS_NODE_URL}tables/${stakedHandle}/item`,
      {
        "key_type": "address",
        "value_type": "vector<u64>",
        "key": account!.address!.toString()
      },
    ).then(
      value => {
        setStakedWolf(value.data.map((v: string) => parseInt(v)))
      }
    ).catch();

  }

  function mint(stake: boolean) {
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::woolf::mint",
      type_arguments: [],
      arguments: [
        mintAmount,
        stake
      ],
    };
  }

  function stake() {
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::add_many_to_barn_and_pack_with_indice",
      type_arguments: [],
      arguments: [
        unstakedSelected,
      ],
    };
  }

  function unstake() {
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::claim_many_from_barn_and_pack_with_indice",
      type_arguments: [],
      arguments: [
        stakedSelected,
        true
      ],
    };
  }

  function claim() {
    return {
      type: "entry_function_payload",
      function: DAPP_ADDRESS + "::barn::claim_many_from_barn_and_pack_with_indice",
      type_arguments: [],
      arguments: [
        stakedSelected,
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
    let amount = mintAmount;
    if (collectionSupply < PAID_TOKENS) {
      setCost(`${(MINT_PRICE * amount).toFixed(3)} APT`)
    } else if (collectionSupply <= MAX_TOKEN * 2 / 5) {
      setCost(`${20000 * amount} WOOL`)
    } else if (collectionSupply <= MAX_TOKEN * 4 / 5) {
      setCost(`${40000 * amount} WOOL`)
    } else {
      setCost(`${80000 * amount} WOOL`)
    }
  }, [collectionSupply, mintAmount]);

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

  useEffect(() => {
    const getWool = async () => {
      await getWoolBalance()
    }
    getWool()

    const getStakedS = async () => {
      await getStakedSheep()
    }
    getStakedS()

    const getStakedW = async () => {
      await getStakedWolf()
    }
    getStakedW()

  }, [connected, mintTx, stakeTx, claimTx]);

  useEffect(() => {
    const getToken = async () => {
      await getTokens()
    }
    getToken()
  }, [mintTx, stakeTx, claimTx, stakedSheep, stakedWolf]);

  function addStaked(item: number) {
    setUnstakedSelected([])
    setStakedSelected([...stakedSelected, item])
  }

  function removeStaked(item: number) {
    setUnstakedSelected([])
    setStakedSelected(stakedSelected.filter(i => i !== item))
  }

  function addUnstaked(item: number) {
    setStakedSelected([])
    setUnstakedSelected([...unstakedSelected, item])
  }

  function removeUnstaked(item: number) {
    setStakedSelected([])
    setUnstakedSelected(unstakedSelected.filter(i => i !== item))
  }

  function renderUnstaked(item: number, type: string) {
    const itemIn = unstakedSelected.includes(item);
    return <div key={item} style={{ marginRight: "5px", marginLeft: "5px", border: itemIn ? "2px solid red" : "2px solid rgb(0,0,0,0)", overflow: 'hidden', display: "inline-block" }}>
      <div className="flex flex-col items-center">
        <div style={{ fontSize: "0.75rem", height: "1rem" }}>#{item}</div>
        <Image src={`https://wolfgame.s3.amazonaws.com/${type}/${item}.svg`} width={48} height={48} alt="{item}" onClick={() => itemIn ? removeUnstaked(item) : addUnstaked(item)} />
      </div>
    </div>
  }

  function renderStaked(item: number, type: string) {
    const itemIn = stakedSelected.includes(item);
    return <div key={item} style={{ marginRight: "5px", marginLeft: "5px", border: itemIn ? "2px solid red" : "2px solid rgb(0,0,0,0)", overflow: 'hidden', display: "inline-block" }}>
      <div className="flex flex-col items-center">
        <div style={{ fontSize: "0.75rem", height: "1rem" }}>#{item}</div>
        <Image src={`https://wolfgame.s3.amazonaws.com/${type}/${item}.svg`} width={48} height={48} alt={`${item}`} onClick={() => itemIn ? removeStaked(item) : addStaked(item)} />
      </div>
    </div>
  }

  return (
    <div style={{ paddingTop: '1px' }}>
      <div className="text-center"><span className="mb-5 text-center title">Wolf Game</span>
        {NETWORK == "mainnet" ? <span className="cursor-pointer ml-2 text-red title-upper" style={{ fontSize: "18px", verticalAlign: "100%" }}>Aptos</span>
          : <span className="cursor-pointer ml-2 text-red title-upper" style={{ fontSize: "18px", verticalAlign: "100%" }}>{NETWORK}</span>}
      </div>
      <div className="flex flex-row items-center space-x-2 justify-center">
        <div className="mb-5 text-sm font-console basis-2/5 " style={{ maxWidth: "100%" }}>
          <div className="relative flex justify-center w-full h-full p-1 overflow-hidden md:p-5" style={{ borderImage: "url('/wood-frame.svg') 30 / 1 / 0 stretch", borderWidth: "30px", background: "rgb(237, 227, 209)" }}>
            <div className="absolute wood-mask"></div>
            <div className="relative w-full h-full z-index:5">
              <div className="flex flex-col items-center">
                <div className="text-center font-console pt-1 text-red text-2xl">MINTING</div>
                <div className="h-4"></div>
                <div className="gen">
                  <div className="flex flex-row justify-between w-full" style={{ maxHeight: "36px" }}>
                    <span style={{ borderRight: "4px solid #000000", width: "20%" }} className="flex-initial">GEN 0</span>
                    <span style={{ borderRight: "4px solid #000000", width: "20%" }} className="flex-initial">20,000 $WOOL</span>
                    <span style={{ borderRight: "4px solid #000000", width: "40%" }} className="flex-initial">40,000 $WOOL</span>
                    <span className="flex-initial" style={{ width: "20%" }}>80,000 $WOOL</span>
                  </div>
                  <div className="progress-bar" style={{ width: `${collectionSupply / MAX_TOKEN * 100}%` }}></div>
                </div>
                <div className="h-2"></div>
                <div><span className="text-red text-xl">{collectionSupply} / {MAX_TOKEN} MINTED</span></div>
                <div className="h-4"></div>
                <div>
                  <span className="text-black text-xl">AMOUNT </span>
                  {/* <i className="text-red arrow down cursor-pointer ml-2 mr-2" onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}></i> */}
                  <span className="text-red text-2xl">{mintAmount}</span>
                  {/* <i className="text-red arrow up cursor-pointer ml-2" onClick={() => setMintAmount(Math.min(10, mintAmount + 1))}></i> */}
                </div>
                <div className="h-2"></div>
                <div><span className="text-black text-xl">COST: </span><span className="text-red text-xl">{cost}</span></div>
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
          <div className="relative flex justify-center w-full h-full p-1 overflow-hidden md:p-5" style={{ borderImage: "url('./wood-frame.svg') 30 / 1 / 0 stretch", borderWidth: "30px", background: "rgb(237, 227, 209)" }}>
            <div className="absolute wood-mask"></div>
            <div className="relative w-full h-full z-index:5">
              <div className="flex flex-col items-center">
                <div className="text-center font-console pt-1 text-xl">$WOOL in your wallet: {(woolBalance / 100000000).toFixed(2)} $WOOL</div>
                <div className="h-4"></div>
                <div className="text-center font-console pt-1 text-red text-2xl">UNSTAKED</div>
                <div className="h-4"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">CAN STAKE</div>
                  {unstakedSheep.length == 0 && unstakedWolf.length == 0 ? <>
                    <div className="text-red font-console text-xs">NO TOKENS</div>
                  </> : <div className="overflow-x-scroll">
                    {unstakedSheep.map((item, i) => renderUnstaked(item, "sheep"))}
                    {unstakedWolf.map((item, i) => renderUnstaked(item, "wolf"))}
                  </div>
                  }
                </div>
                <div className="h-4"></div>
                <div className="text-center font-console pt-1 text-red text-2xl">STAKED</div>
                <div className="h-4"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">BARN</div>
                  {stakedSheep.length == 0 ? <>
                    <div className="text-red font-console text-xs">NO TOKENS</div>
                  </> : <div className="overflow-x-scroll">
                    {stakedSheep.map((item, i) => renderStaked(item, "sheep"))}
                  </div>
                  }
                </div>
                <div className="h-2"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">WOLFPACK</div>
                  {stakedWolf.length == 0 ? <>
                    <div className="text-red font-console text-xs">NO TOKENS</div>
                  </> : <div className="overflow-x-scroll">
                    {stakedWolf.map((item, i) => renderStaked(item, "wolf"))}
                  </div>
                  }
                </div>
                <div className="h-4"></div>
                <div className="h-4"></div>
                {unstakedSelected.length == 0 && stakedSelected.length == 0 && <div className="text-center font-console pt-2 pb-2 text-red text-xl">Select tokens to stake, shear or unstake</div>}
                {unstakedSelected.length > 0 && <div className="flex flex-row space-x-4">
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={stake_nft}>Stake</div>
                  </div>
                </div>}
                {stakedSelected.length > 0 && <div className="flex flex-row space-x-4">
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={claim_wool}>Shear $WOOL</div>
                  </div>
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={unstake_nft}>Shear $WOOL & Unstake</div>
                  </div>
                </div>}
                {/* <div className="h-4"></div>
                  <div className="flex flex-row space-x-4">
                    <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                      <div className="text-center font-console pt-1" onClick={register_coin}>Register Wool Coin</div>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

