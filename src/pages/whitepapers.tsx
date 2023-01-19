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
                        <p className="text-2xl font-bold">* NOTE: This Fox Game is a game on Sui blockchain.</p>
                        <p>On a quaint farm in the metaverse, a flock of Chicken congregate and produce a healthy supply of $EGG. They huddle together in a Barn and are collected regularly by their owners to farm the $EGG. With more $EGG, the farmers can purchase more Chicken! But outside lurk dangers the Chicken are terrified of… The Foxes.</p>
                        <p>The Foxes are on the hunt for Chicken and their precious $EGG. They’ll take it by any means necessary. They’ll kidnap Chicken or catch them unaware and steal all of their $EGG. So the farmers struck a deal with the Foxes: they pay the Foxes a tax on all $EGG production. In return, the Foxes don’t attack Chicken who are safe in the Barn. </p>
                        <p>But when a Chicken leaves the farm or new Chicken are born… The Foxes don’t hold back.</p>
                        <p>---------------</p>
                        <p>Fox Game is a risk protocol for NFTs with novel tokenomics. It shows what’s possible with interactions between the ERC-20 style and ERC-721 style protocols. For the very first time, your NFT can steal other NFTs (ERC-721 style tokens) for you. The rarer your NFT, the more tokens you'll accumulate probabilistically. Fox Game is pioneering new types of NFT mechanics. Fully decentralized. No roadmaps or empty promises. Just a game in the metaverse that’s ready to play at launch.</p>
                        <p><h4>The tl;dr:</h4> - There will only ever be 10,000 Gen 0, minted for 6.9420 APT each. The 40,000 Gen 1 are minted by farming $EGG<br /> - Chicken can be staked in the Barn to earn $EGG and pay a tax anytime they claim their $EGG earnings<br /> - If a Chicken is unstaked from the Barn, the Foxes try to steal all of its accumulated $EGG<br /> - When a new Chicken is born, the Foxes attempt to kidnap it. If they’re successful, it’s given to a randomly selected Fox, instead of the owner who minted it</p>
                        <h3 className="drop-text">Contract Addresses</h3><p className="break-all"> - {DAPP_ADDRESS}<br /></p>
                        <div className="flex justify-center items-center gap-5"><img src="/minting.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Minting</h3><img src="/minting.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><table className="border-red text-xs md:text-xl"><tr><th>Token ID</th><th>Minting Cost</th></tr><tr><td>1 to 10,000 (Gen 0)</td><td>6.9420 APT</td></tr><tr><td>10,001 to 20,000</td><td>20,000 $EGG</td></tr><tr><td>20,001 to 40,000</td><td>40,000 $EGG</td></tr><tr><td>40,001 to 50,000</td><td>80,000 $EGG</td></tr></table><p>The total cost to mint all of the Chicken and Foxes in existence will be 1,800,000,000 $EGG.</p>
                        <div className="flex justify-center items-center gap-5"><img src="/unstaking-barn.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Chicken</h3><img src="/staked-barn.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>You have a 90% chance of minting a Chicken, each with unique traits. Here are the actions they can take:</p>
                        <table className="border-red text-xs md:text-xl"><tr><th>Action</th><th>Notes</th><th>Risk</th></tr><tr><td>Enter Barn (Stake)</td><td>Accumulate 10,000 $EGG / day (prorated to the second)</td><td>No risk.</td></tr><tr><td>Collect $EGG (Claim)</td><td>Receive 80% of $EGG accumulated on your Chicken</td><td>Foxes take a guaranteed 20% tax on collected $EGG in return for not attacking the Barn. Taxed $EGG is split among all the Foxes currently staked in the Barn, proportional to their Alpha scores.</td></tr><tr><td>Leave Barn (Unstake)</td><td>Chicken is removed from the Barn and all $EGG is shorn. <span className="underline"> Can only be done if the Chicken has accumulated 2 days worth of $EGG to keep it warm.</span></td><td>50% chance of ALL of your accumulated $EGG being stolen by Foxes. Stolen $EGG is split among all the Foxes currently staked in the Barn, proportional to their Alpha scores.</td></tr></table>
                        <div className="flex justify-center items-center gap-5"><img src="/shearing.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">$EGG</h3><img src="/claiming-pack.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>The maximum $EGG supply is 5,000,000,000 $EGG:</p>
                        <ul><li>When supply reaches 1,400,000,000 $EGG earned for staking, the staking “faucet” turns off.</li><li>The Risky Game will consume 1,000,000,000 $EGG.</li><li>The left 2,600,000,000 $EGG will be determined in the future game stages.</li></ul><table className="border-red text-xs md:text-xl"><tr><th>Action</th><th>Notes</th><th>Risk</th></tr><tr><td>Mint a new Chicken using $EGG</td><td>There is a 10% chance that the NFT is actually a Fox!</td><td>10% chance of the new Chicken or Fox being stolen by a staked Fox. Each Fox’s chance of success is proportional to their Alpha scores.</td></tr></table><div className="flex justify-center items-center gap-5"><img src="/staking-pack.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Foxes</h3><img src="/unstaked-pack.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>You have a 10% chance of minting a Fox, each with unique traits, including an Alpha value ranging from 5 to 8. The higher the Alpha value:<br /> - The higher the portion of $EGG that the Fox earns from taxes<br /> - The higher chance of stealing a newly minted Chicken or Fox</p>
                        <p><h4>Example:</h4> Fox A has an Alpha of 8 and Fox B has an Alpha of 6, and they are staked.<br /> - If 70,000 $EGG total have been accumulated as taxes, Fox A will be able to claim 40,000 $EGG and Fox B will be able to claim 30,000 $EGG<br /> - If a newly minted Chicken or Fox is stolen, Fox A has a 57% chance of receiving it and Fox B has a 43% chance of receiving it<br /></p>
                        <p className="underline">Only staked Foxes are able to steal a sheep or earn the $EGG tax.</p>
                        <table className="border-red text-xs md:text-xl"><tr><th>Action</th><th>Notes</th><th>Risk</th></tr><tr><td>Stake Fox</td><td>Earn your share of the 20% tax of all $EGG generated by Chicken in the Barn</td><td>No risk.</td></tr><tr><td>Claim $EGG</td><td>Receive all $EGG taxes accrued for the staked Fox</td><td>No risk.</td></tr><tr><td>Unstake Fox</td><td>Receive all $EGG taxes accrued for the staked Fox</td><td>No risk.</td></tr></table>
                        <div className="flex justify-center items-center gap-5"><img src="/sheared.gif" className="object-contain" alt="" style={{ height: "100px" }} /><h3 className="drop-text">Why this tech is novel</h3><img src="/sheared.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div><p>Protocol-level risk is ripe for exploration in NFTs. Many projects are implementing stake-to-earn, but haven’t cracked the code on users making choices in the face of risk.</p>
                        <p>In the case of Fox Game’s Fox-eat-Chicken world, your NFT can steal ERC-20 style and ERC-721 style tokens for you. This is entirely new.</p>
                        <p>Everything in Fox Game happens on-chain: the decisioning, the results, the generation of the NFTs themselves. It’s split between 4 different smart contracts so that anyone can read through and get a sense of how it all talks to each other.</p>
                        <p>There are a number of techniques in these contracts that make this all possible while maintaining accuracy, keeping gas costs down, and not exceeding the EVM contract size limit.</p>
                        <h4>Constant Time Algorithms &amp; DeFi Math:</h4> A lot of contracts use architectures that require significant looping to accomplish tasks. Those make contracts inefficient and add to gas costs. It’s imperative to remove things like the need to search through arrays or loop through stakes. This means you can do things like unlimited simultaneous stakes while keeping things cheaper.<p>As an example, the minting contract uses AJ Walker’s Alias Method to efficiently select traits in constant time.</p>
                        <p>Another example: tracking Fox $EGG earnings (taxes) proved to be very complex, requiring math used by DeFi liquidity pool protocols.</p>
                        <h4>100% On-chain:</h4> Not the first, and certainly not the last. But as long as Sui and IPFS is running, your Chicken and Foxes will survive. Always available and always yours. Your traits and all the pixel art reside in the contracts themselves, nowhere else.<h4>UI at launch:</h4> You can use the entirety of Fox Game by directly interacting with the blockchain. But Fox Game is launching with a custom UI to make it easy for people to enjoy the game on day 1.<div className="flex justify-center items-center gap-5"><img src="/mint-stolen.gif" className="object-contain" alt="" style={{ height: "100px" }} />
                          <h3 className="drop-text">In conclusion...</h3><img src="/mint-stolen.gif" className="object-contain" alt="" style={{ height: "100px" }} /></div>
                        <p>With Fox Game, everyone can play with their own level of risk… Pay the tax? Stay liquid on the market? Take a chance to keep all your $EGG, but have a chance to lose it all? The choices and this game have to be engaging.</p>
                        <p>Foxes preying on Chicken feels almost like a parallel to the NFT community itself: A select few with alpha among all of us, and many others following the pack.</p>
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
