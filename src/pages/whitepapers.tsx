import {
  DAPP_ADDRESS,
} from "../config/constants";
import Image from 'next/image';
import React from "react";

export default function Home() {
  return (
    <div style={{ paddingTop: '1px' }}>
      <div className="flex flex-col items-center w-full font-console p-5">
        <div className="title text-center justify-self-start mb-5">Whitepapers</div>
        <div className="w-full mt-5 max-w-screen-lg text-red">
          <div className="relative flex justify-center w-full h-full p-1 overflow-hidden md:p-5" style={{ borderImage: "url('/border.svg') 20 18 / 1 / 20px repeat", background: "rgb(237, 227, 209)", borderWidth: "40px" }}>
            <div className="absolute" style={{ width: "110%", height: "110%", top: "-5%", left: "-5%", opacity: "0.04", backgroundImage: "url('/wood-mask.svg')", backgroundRepeat: "repeat", backgroundSize: "400px 268px" }}></div>
            <div className="relative w-full h-full z-index:5">
              <div className="flex flex-col items-center ">
                <div className="w-full px-2">
                  <div className="my-4 w-full">
                    <div className="w-full md:p-5 flex justify-center" style={{ fontFamily: "Courier" }}>
                      <div className="flex flex-col gap-5 text-xl">
                        <p className="text-2xl font-bold">* NOTE: This Wolf Game is a game on Aptos blockchain.</p>
                        <p>On a quaint farm in the metaverse, a flock of Sheep congregate and produce a healthy supply of $WOOL. They huddle together in a Barn and are sheared regularly by their owners to farm the $WOOL. With more $WOOL, the farmers can purchase more Sheep! But outside lurk dangers the Sheep are terrified of… The Wolves.</p>
                        <p>The Wolves are on the hunt for Sheep and their precious $WOOL. They’ll take it by any means necessary. They’ll kidnap Sheep or catch them unaware and steal all of their $WOOL. So the farmers struck a deal with the Wolves: they pay the Wolves a tax on all $WOOL production. In return, the Wolves don’t attack Sheep who are safe in the Barn. </p>
                        <p>But when a Sheep leaves the farm or new Sheep are born… The Wolves don’t hold back.</p>
                        <p>---------------</p>
                        <p>Wolf Game is a risk protocol for NFTs with novel tokenomics. It shows what’s possible with interactions between the ERC-20 style and ERC-721 style protocols. For the very first time, your NFT can steal other NFTs (ERC-721 style tokens) for you. The rarer your NFT, the more tokens you'll accumulate probabilistically. Wolf Game is pioneering new types of NFT mechanics. Fully decentralized. No roadmaps or empty promises. Just a game in the metaverse that’s ready to play at launch.</p>
                        <p><h4>The tl;dr:</h4> - There will only ever be 10,000 Gen 0, minted for 6.9420 APT each. The 40,000 Gen 1 are minted by farming $WOOL<br /> - Sheep can be staked in the Barn to earn $WOOL and pay a tax anytime they claim their $WOOL earnings<br /> - If a Sheep is unstaked from the Barn, the Wolves try to steal all of its accumulated $WOOL<br /> - When a new Sheep is born, the Wolves attempt to kidnap it. If they’re successful, it’s given to a randomly selected Wolf, instead of the owner who minted it</p>
                        <h3 className="drop-text">Contract Addresses</h3><p className="break-all"> - {DAPP_ADDRESS}<br /></p>
                        <div className="flex justify-center items-center gap-5"><img src="/minting.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Minting</h3><img src="/minting.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><table className="border-red text-xs md:text-xl"><tr><th>Token ID</th><th>Minting Cost</th></tr><tr><td>1 to 10,000 (Gen 0)</td><td>6.9420 APT</td></tr><tr><td>10,001 to 20,000</td><td>20,000 $WOOL</td></tr><tr><td>20,001 to 40,000</td><td>40,000 $WOOL</td></tr><tr><td>40,001 to 50,000</td><td>80,000 $WOOL</td></tr></table><p>The total cost to mint all of the Sheep and Wolves in existence will be 1,800,000,000 $WOOL.</p>
                        <div className="flex justify-center items-center gap-5"><img src="/unstaking-barn.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Sheep</h3><img src="/staked-barn.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>You have a 90% chance of minting a Sheep, each with unique traits. Here are the actions they can take:</p>
                        <table className="border-red text-xs md:text-xl"><tr><th>Action</th><th>Notes</th><th>Risk</th></tr><tr><td>Enter Barn (Stake)</td><td>Accumulate 10,000 $WOOL / day (prorated to the second)</td><td>No risk.</td></tr><tr><td>Shear $WOOL (Claim)</td><td>Receive 80% of $WOOL accumulated on your Sheep</td><td>Wolves take a guaranteed 20% tax on sheared $WOOL in return for not attacking the Barn. Taxed $WOOL is split among all the Wolves currently staked in the Barn, proportional to their Alpha scores.</td></tr><tr><td>Leave Barn (Unstake)</td><td>Sheep is removed from the Barn and all $WOOL is shorn. <span className="underline"> Can only be done if the Sheep has accumulated 2 days worth of $WOOL to keep it warm.</span></td><td>50% chance of ALL of your accumulated $WOOL being stolen by Wolves. Stolen $WOOL is split among all the Wolves currently staked in the Barn, proportional to their Alpha scores.</td></tr></table>
                        <div className="flex justify-center items-center gap-5"><img src="/shearing.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">$WOOL</h3><img src="/claiming-pack.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>The maximum $WOOL supply is 5,000,000,000 $WOOL:</p>
                        <ul><li>When supply reaches 1,400,000,000 $WOOL earned for staking, the staking “faucet” turns off.</li><li>The Risky Game will consume 1,000,000,000 $WOOL.</li><li>The left 2,600,000,000 $WOOL will be determined in the future game stages.</li></ul><table className="border-red text-xs md:text-xl"><tr><th>Action</th><th>Notes</th><th>Risk</th></tr><tr><td>Mint a new Sheep using $WOOL</td><td>There is a 10% chance that the NFT is actually a Wolf!</td><td>10% chance of the new Sheep or Wolf being stolen by a staked Wolf. Each Wolf’s chance of success is proportional to their Alpha scores.</td></tr></table><div className="flex justify-center items-center gap-5"><img src="/staking-pack.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Wolves</h3><img src="/unstaked-pack.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>You have a 10% chance of minting a Wolf, each with unique traits, including an Alpha value ranging from 5 to 8. The higher the Alpha value:<br /> - The higher the portion of $WOOL that the Wolf earns from taxes<br /> - The higher chance of stealing a newly minted Sheep or Wolf</p>
                        <p><h4>Example:</h4> Wolf A has an Alpha of 8 and Wolf B has an Alpha of 6, and they are staked.<br /> - If 70,000 $WOOL total have been accumulated as taxes, Wolf A will be able to claim 40,000 $WOOL and Wolf B will be able to claim 30,000 $WOOL<br /> - If a newly minted Sheep or Wolf is stolen, Wolf A has a 57% chance of receiving it and Wolf B has a 43% chance of receiving it<br /></p>
                        <p className="underline">Only staked Wolves are able to steal a sheep or earn the $WOOL tax.</p>
                        <table className="border-red text-xs md:text-xl"><tr><th>Action</th><th>Notes</th><th>Risk</th></tr><tr><td>Stake Wolf</td><td>Earn your share of the 20% tax of all $WOOL generated by Sheep in the Barn</td><td>No risk.</td></tr><tr><td>Claim $WOOL</td><td>Receive all $WOOL taxes accrued for the staked Wolf</td><td>No risk.</td></tr><tr><td>Unstake Wolf</td><td>Receive all $WOOL taxes accrued for the staked Wolf</td><td>No risk.</td></tr></table>
                        <div className="flex justify-center items-center gap-5"><img src="/sheared.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Why this tech is novel</h3><img src="/sheared.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>Protocol-level risk is ripe for exploration in NFTs. Many projects are implementing stake-to-earn, but haven’t cracked the code on users making choices in the face of risk.</p>
                        <p>In the case of Wolf Game’s Wolf-eat-Sheep world, your NFT can steal ERC-20 style and ERC-721 style tokens for you. This is entirely new.</p>
                        <p>Everything in Wolf Game happens on-chain: the decisioning, the results, the generation of the NFTs themselves. It’s split between 4 different smart contracts so that anyone can read through and get a sense of how it all talks to each other.</p>
                        <p>There are a number of techniques in these contracts that make this all possible while maintaining accuracy, keeping gas costs down, and not exceeding the EVM contract size limit.</p>
                        <h4>Constant Time Algorithms &amp; DeFi Math:</h4> A lot of contracts use architectures that require significant looping to accomplish tasks. Those make contracts inefficient and add to gas costs. It’s imperative to remove things like the need to search through arrays or loop through stakes. This means you can do things like unlimited simultaneous stakes while keeping things cheaper.<p>As an example, the minting contract uses AJ Walker’s Alias Method to efficiently select traits in constant time.</p>
                        <p>Another example: tracking Wolf $WOOL earnings (taxes) proved to be very complex, requiring math used by DeFi liquidity pool protocols.</p>
                        <h4>100% On-chain:</h4> Not the first, and certainly not the last. But as long as Aptos and IPFS is running, your Sheep and Wolves will survive. Always available and always yours. Your traits and all the pixel art reside in the contracts themselves, nowhere else.<h4>UI at launch:</h4> You can use the entirety of Wolf Game by directly interacting with the blockchain. But Wolf Game is launching with a custom UI to make it easy for people to enjoy the game on day 1.<div className="flex justify-center items-center gap-5"><img src="/mint-stolen.gif" className="object-contain" alt="" style={{ height: "100px" }} />
                          <h3 className="drop-text">In conclusion...</h3><img src="/mint-stolen.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div>
                        <p>With Wolf Game, everyone can play with their own level of risk… Pay the tax? Stay liquid on the market? Take a chance to keep all your $WOOL, but have a chance to lose it all? The choices and this game have to be engaging.</p>
                        <p>Wolves preying on Sheep feels almost like a parallel to the NFT community itself: A select few with alpha among all of us, and many others following the pack.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
