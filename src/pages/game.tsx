import {
  DAPP_ADDRESS,
  NETWORK,
} from "../config/constants";
import Image from 'next/image';
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  useSuiProvider,
} from '@suiet/wallet-kit';
import { useState, useEffect } from "react";
import React from "react";
import { JsonRpcProvider } from '@mysten/sui.js';
import { JRProvider } from "../utils/sui_client";

export default function Home() {

  const { signAndExecuteTransaction, connected, account } = useWallet();
  const provider = new JsonRpcProvider();
  const sui_client = new JRProvider();
  const [mintTx, setMintTx] = useState('');
  const [stakeTx, setStakeTx] = useState('');
  const [claimTx, setClaimTx] = useState('');

  const [cost, setCost] = useState('');

  const [unstakedSheep, setUnstakedSheep] = useState<Array<number>>([]);
  const [unstakedWolf, setUnstakedWolf] = useState<Array<number>>([]);

  const MAX_TOKEN = 50;
  const PAID_TOKENS = 10;
  const MINT_PRICE = 0.99;

  const PACKAGE_ID = DAPP_ADDRESS;
  const GLOBAL = "0x08e019b5b3f5f10e961936792a0135d49a831b47";
  const EGG_TREASUTY = "0xeb29588317182541bbae5268a89a69bc3bc41468";

  const [unstakedFoC, setUnstakedFoC] = useState<Array<{ objectId: string, index: number, url: string }>>([]);
  const [collectionSupply, setCollectionSupply] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);
  const [eggBalance, setEggBalance] = useState(0);
  const [unstakedSelected, setUnstakedSelected] = useState<Array<string>>([])

  const [barnStakedObject, setBarnStakedObject] = useState<string>('')
  const [packStakedObject, setPackStakedObject] = useState<string>('')

  const [stakedChicken, setStakedChicken] = useState<Array<{ objectId: string, index: number, url: string }>>([]);
  const [stakedFox, setStakedFox] = useState<Array<{ objectId: string, index: number, url: string }>>([]);
  const [stakedSelected, setStakedSelected] = useState<Array<string>>([]);

  function check_if_connected() {
    if (!connected) {
      alert("Please connect wallet first")
    }
  }

  async function mint_nft() {
    check_if_connected()
    const objects = await provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(account!.address, BigInt(1))
    const sui_objects = objects.filter(item => item.status === "Exists").map(item => item.details.data.fields.id.id)
    try {
      const resData = await signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data: mint(false, sui_objects),
        },
      });
      console.log('success', resData);
      setMintTx('https://explorer.sui.io/transaction/' + resData.certificate.transactionDigest)
    } catch (e) {
      console.error('failed', e);
    }
  }

  async function mint_nft_stake() {
    check_if_connected()
    const objects = await provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(account!.address, BigInt(1))
    const sui_objects = objects.filter(item => item.status === "Exists").map(item => item.details.data.fields.id.id)
    try {
      const resData = await signAndExecuteTransaction(
        {
          transaction: {
            kind: 'moveCall',
            data: mint(true, sui_objects),
          }
        }
      )
      console.log('success', resData);
      setMintTx('https://explorer.sui.io/transaction/' + resData.certificate.transactionDigest)
    } catch (e) {
      console.error('failed', e);
    }
  }

  async function stake_nft() {
    check_if_connected()
    try {
      const resData = await signAndExecuteTransaction(
        {
          transaction: {
            kind: 'moveCall',
            data: stake(),
          }
        }
      )
      console.log('success', resData);
      setStakeTx('https://explorer.sui.io/transaction/' + resData.certificate.transactionDigest)
      setUnstakedSelected([])
    } catch (e) {
      console.error('failed', e);
    }
  }

  async function unstake_nft() {
    check_if_connected()
    try {
      const resData = await signAndExecuteTransaction(
        {
          transaction: {
            kind: 'moveCall',
            data: unstake(),
          }
        }
      )
      console.log('success', resData);
      setClaimTx('https://explorer.sui.io/transaction/' + resData.certificate.transactionDigest)
      setStakedSelected([])
    } catch (e) {
      console.error('failed', e);
    }

  }

  async function claim_egg() {
    check_if_connected()
    try {
      const resData = await signAndExecuteTransaction(
        {
          transaction: {
            kind: 'moveCall',
            data: claim(),
          }
        }
      )
      console.log('success', resData);
      setClaimTx('https://explorer.sui.io/transaction/' + resData.certificate.transactionDigest)
      setStakedSelected([])
    } catch (e) {
      console.error('failed', e);
    }
  }

  async function getCollectionSupply() {
    const globalObject = await provider.getObject(GLOBAL)
    const focRegistry = globalObject.details.data.fields.foc_registry
    setCollectionSupply(parseInt(focRegistry.fields.foc_born))
  }

  function mint(stake: boolean, sui_objects: Array<string>) {
    return {
      packageObjectId: PACKAGE_ID,
      module: 'fox',
      function: 'mint',
      typeArguments: [],
      arguments: [
        GLOBAL, mintAmount.toString(), stake, sui_objects
      ],
      gasBudget: 30000,
    };
  }

  function stake() {
    return {
      packageObjectId: PACKAGE_ID,
      module: 'fox',
      function: 'add_many_to_barn_and_pack',
      typeArguments: [],
      arguments: [
        GLOBAL,
        unstakedSelected
      ],
      gasBudget: 1000,
    };
  }

  function unstake() {
    return {
      packageObjectId: PACKAGE_ID,
      module: 'fox',
      function: 'claim_many_from_barn_and_pack',
      typeArguments: [],
      arguments: [
        GLOBAL,
        EGG_TREASUTY,
        stakedSelected,
        true
      ],
      gasBudget: 1000,
    };
  }

  function claim() {
    return {
      packageObjectId: PACKAGE_ID,
      module: 'fox',
      function: 'claim_many_from_barn_and_pack',
      typeArguments: [],
      arguments: [
        GLOBAL,
        EGG_TREASUTY,
        stakedSelected,
        true
      ],
      gasBudget: 1000,
    };
  }

  useEffect(() => {
    if (collectionSupply < PAID_TOKENS) {
      setCost(`${(MINT_PRICE * mintAmount).toFixed(3)} SUI`)
    } else if (collectionSupply <= MAX_TOKEN * 2 / 5) {
      setCost(`${20 * mintAmount} EGG`)
    } else if (collectionSupply <= MAX_TOKEN * 4 / 5) {
      setCost(`${40 * mintAmount} EGG`)
    } else {
      setCost(`${80 * mintAmount} EGG`)
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

  // get unstaked fox or chicken
  useEffect(() => {
    if (connected) {
      (async () => {
        const objects = await provider.getObjectsOwnedByAddress(account!.address)

        const foc = objects
          .filter(item => item.type === DAPP_ADDRESS + "::token_helper::FoxOrChicken")
          .map(item => item.objectId)
        const foces = await provider.getObjectBatch(foc)
        const unstaked = foces.filter(item => item.status === "Exists").map(item => {
          return {
            objectId: item.details.data.fields.id.id,
            index: parseInt(item.details.data.fields.index),
            url: item.details.data.fields.url,
          }
        })
        setUnstakedFoC(unstaked)
      })()
    } else {
      setUnstakedFoC([])
    }
  }, [connected, mintTx, stakeTx, claimTx])

  // get globla object
  useEffect(() => {
    (async () => {
      const globalObject = await provider.getObject(GLOBAL)
      const barn_staked = globalObject.details.data.fields.barn.fields.id.id
      setBarnStakedObject(barn_staked)

      const pack_staked = globalObject.details.data.fields.pack.fields.id.id
      setPackStakedObject(pack_staked)
    })()
  })

  // get bark.staked object
  useEffect(() => {
    if (barnStakedObject !== '' && account) {
      (async () => {
        try {
          // const object = await provider.getObject(barnStakedObject)
          // console.log("object", object)
          const dfObject = await sui_client.getDynamicFieldObject(barnStakedObject, account!.address);
          if (dfObject != null) {
            const chicken_staked = dfObject.details.data.fields.value
            const chicken_stakes = await provider.getObjectBatch(chicken_staked)
            const staked = chicken_stakes.filter(item => item.status === "Exists").map(item => {
              let foc = item.details.data.fields.item
              return {
                objectId: foc.fields.id.id,
                index: parseInt(foc.fields.index),
                url: foc.fields.url,
              }
            })
            setStakedChicken(staked)
          }
        }
        catch (e) {
          console.log(e)
        }
      })()
    }
  }, [barnStakedObject, mintTx, stakeTx, claimTx])

  // get pack.staked object
  useEffect(() => {
    if (packStakedObject !== '' && account) {
      (async () => {
        try {
          const objects = await sui_client.getDynamicFieldObject(packStakedObject, account!.address);
          console.log("pack objects", objects)
          if (objects != null) {
            const fox_staked = objects.details.data.fields.value
            const fox_stakes = await provider.getObjectBatch(fox_staked)
            const staked = fox_stakes.filter(item => item.status === "Exists").map(item => {
              let foc = item.details.data.fields.item
              return {
                objectId: foc.fields.id.id,
                index: parseInt(foc.fields.index),
                url: foc.fields.url,
              }
            })
            console.log("pack staked", staked)
            setStakedFox(staked)
          }
        }
        catch (e) {
          console.log(e)
        }
      })()
    }
  }, [packStakedObject, mintTx, stakeTx, claimTx])

  // get egg balance
  useEffect(() => {
    if (connected) {
      (async () => {
        const balanceObjects = await provider.getCoinBalancesOwnedByAddress(account!.address, DAPP_ADDRESS + "egg::EGG")
        const balances = balanceObjects.filter(item => item.status === 'Exists').map(item => parseInt(item.details.data.fields.balance))
        const initialValue = 0;
        const sumWithInitial = balances.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          initialValue
        )
        setEggBalance(sumWithInitial);
      })()
    }
  }, [connected, mintTx, claimTx])

  function addStaked(item: string) {
    setUnstakedSelected([])
    setStakedSelected([...stakedSelected, item])
  }

  function removeStaked(item: string) {
    setUnstakedSelected([])
    setStakedSelected(stakedSelected.filter(i => i !== item))
  }

  function addUnstaked(item: string) {
    setStakedSelected([])
    setUnstakedSelected([...unstakedSelected, item])
  }

  function removeUnstaked(item: string) {
    setStakedSelected([])
    setUnstakedSelected(unstakedSelected.filter(i => i !== item))
  }

  function renderUnstaked(item: any, type: string) {
    const itemIn = unstakedSelected.includes(item.objectId);
    return <div key={item.objectId} style={{ marginRight: "5px", marginLeft: "5px", border: itemIn ? "2px solid red" : "2px solid rgb(0,0,0,0)", overflow: 'hidden', display: "inline-block" }}>
      <div className="flex flex-col items-center">
        <div style={{ fontSize: "0.75rem", height: "1rem" }}>#{item.index}</div>
        <Image src={`${item.url}`} width={48} height={48} alt={`${item.objectId}`} onClick={() => itemIn ? removeUnstaked(item.objectId) : addUnstaked(item.objectId)} />
      </div>
    </div>
  }

  function renderStaked(item: any, type: string) {
    const itemIn = stakedSelected.includes(item.objectId);
    return <div key={item.objectId} style={{ marginRight: "5px", marginLeft: "5px", border: itemIn ? "2px solid red" : "2px solid rgb(0,0,0,0)", overflow: 'hidden', display: "inline-block" }}>
      <div className="flex flex-col items-center">
        <div style={{ fontSize: "0.75rem", height: "1rem" }}>#{item.index}</div>
        <Image src={`${item.url}`} width={48} height={48} alt={`${item.objectId}`} onClick={() => itemIn ? removeStaked(item.objectId) : addStaked(item.objectId)} />
      </div>
    </div>
  }

  return (
    <div style={{ paddingTop: '1px' }}>
      <div className="text-center"><span className="mb-5 text-center title">Wolf Game</span>
        {NETWORK == "mainnet" ? <span className="cursor-pointer ml-2 text-red title-upper" style={{ fontSize: "18px", verticalAlign: "100%" }}>Sui</span>
          : <span className="cursor-pointer ml-2 text-red title-upper" style={{ fontSize: "18px", verticalAlign: "100%" }}>Sui {NETWORK}</span>}
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
                    <span style={{ borderRight: "4px solid #000000", width: "20%" }} className="flex-initial">20 $EGG</span>
                    <span style={{ borderRight: "4px solid #000000", width: "40%" }} className="flex-initial">40 $EGG</span>
                    <span className="flex-initial" style={{ width: "20%" }}>80 $EGG</span>
                  </div>
                  <div className="progress-bar" style={{ width: `${collectionSupply / MAX_TOKEN * 100}%` }}></div>
                </div>
                <div className="h-2"></div>
                <div><span className="text-red text-xl">{collectionSupply} / {MAX_TOKEN} MINTED</span></div>
                <div className="h-4"></div>
                <div>
                  <span className="text-black text-xl">AMOUNT </span>
                  <i className="text-red arrow down cursor-pointer ml-2 mr-2" onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}></i>
                  <span className="text-red text-2xl">{mintAmount}</span>
                  <i className="text-red arrow up cursor-pointer ml-2" onClick={() => setMintAmount(Math.min(10, mintAmount + 1))}></i>
                </div>
                <div className="h-2"></div>
                <div><span className="text-black text-xl">COST: </span><span className="text-red text-xl">{cost}</span></div>
                <div className="h-4"></div>
                <div className="flex flex-row space-x-4">
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={() => mint_nft()}>Mint</div>
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
                <div className="text-center font-console pt-1 text-xl">$EGG in your wallet: {(eggBalance / 1000000000).toFixed(2)} $EGG</div>
                <div className="h-4"></div>
                <div className="text-center font-console pt-1 text-red text-2xl">UNSTAKED</div>
                <div className="h-4"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">CAN STAKE</div>
                  {unstakedFoC.length == 0 && unstakedWolf.length == 0 ? <>
                    <div className="text-red font-console text-xs">NO TOKENS</div>
                  </> : <div className="overflow-x-scroll">
                    {unstakedFoC.map((item, i) => renderUnstaked(item, "sheep"))}
                    {unstakedWolf.map((item, i) => renderUnstaked(item, "wolf"))}
                  </div>
                  }
                </div>
                <div className="h-4"></div>
                <div className="text-center font-console pt-1 text-red text-2xl">STAKED</div>
                <div className="h-4"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">BARN</div>
                  {stakedChicken.length == 0 ? <>
                    <div className="text-red font-console text-xs">NO TOKENS</div>
                  </> : <div className="overflow-x-scroll">
                    {stakedChicken.map((item, i) => renderStaked(item, "sheep"))}
                  </div>
                  }
                </div>
                <div className="h-2"></div>
                <div className="w-full" style={{ borderWidth: "0px 0px 4px 4px", borderTopStyle: "initial", borderRightStyle: "initial", borderBottomStyle: "solid", borderLeftStyle: "solid", borderTopColor: "initial", borderRightColor: "initial", borderBottomColor: "rgb(42, 35, 30)", borderLeftColor: "rgb(42, 35, 30)", borderImage: "initial", padding: "2px", opacity: "1" }}>
                  <div className="text-red font-console">WOLFPACK</div>
                  {stakedFox.length == 0 ? <>
                    <div className="text-red font-console text-xs">NO TOKENS</div>
                  </> : <div className="overflow-x-scroll">
                    {stakedFox.map((item, i) => renderStaked(item, "wolf"))}
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
                    <div className="text-center font-console pt-1" onClick={claim_egg}>Shear $WOOL</div>
                  </div>
                  <div className="relative flex items-center justify-center cursor-pointer false hover:bg-gray-200 active:bg-gray-400" style={{ userSelect: "none", width: "200px", borderImage: "url('./wood-frame.svg') 5 / 1 / 0 stretch", borderWidth: "10px" }}>
                    <div className="text-center font-console pt-1" onClick={unstake_nft}>Shear $WOOL & Unstake</div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

