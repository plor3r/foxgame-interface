import Image from 'next/image';
import React from "react";

export default function Home() {
  return (
    <div style={{ paddingTop: '1px' }}>
      <div className="flex flex-col items-center w-full font-console p-5">
        <div className="w-full mt-5 max-w-screen-lg text-red">
          <div className="relative flex justify-center w-full h-full p-1 overflow-hidden md:p-5" style={{ borderImage: "url('/border.svg') 20 18 / 1 / 20px repeat", background: "rgb(237, 227, 209)", borderWidth: "40px" }}>
            <div className="absolute" style={{ width: "110%", height: "110%", top: "-5%", left: "-5%", opacity: "0.04", backgroundImage: "url('/wood-mask.svg')", backgroundRepeat: "repeat", backgroundSize: "400px 268px" }}></div>
            <div className="relative w-full h-full z-index:5">
              <div className="flex flex-col items-center ">
                <img alt="shepherd" src="/shepherd.gif" className="mt-8 w-80" />
                <div className="w-full my-8 px-4 md:px-16 text-lg">
                  <span className="text-2xl">Friends,</span><br /><br />Welcome to Wolf Game on <span className='title-upper text-xl'>Aptos</span>, where Sheep and Wolves on the blockchain compete for a tempting prize of WOOL, with deadly high stakes.<br /><br />Your successes and failures shall be defined by the choices you make.<br /><br />The game has begun.<br /><br />
                  <span className="text-2xl">- The Shepherd</span></div>
                <div className="w-48 h-10 pt-1.5 flex justify-center align-center px-2 cursor-pointer" style={{ borderStyle: "outset", borderColor: "rgb(134, 34, 39)", borderWidth: "4px", backgroundColor: "rgb(177, 29, 24)" }}>
                  <div className="flex flex-row w-full">
                    <a href="/game" className="text-center text-white w-full text-center">play</a>
                  </div>
                </div>
                <div className="relative flex items-center justify-center cursor-pointer false mt-4" style={{ userSelect: "none", width: "200px", height: "40px", backgroundColor: "rgb(131, 75, 27)", color: "white", borderWidth: "4px", borderColor: "rgb(99, 54, 33)" }}>
                  <a href="/whitepapers" className="text-center font-console pt-1">Whitepapers</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
