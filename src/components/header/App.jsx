import { callCounterContract } from "../../services/CallCounter"
import React, { useState } from "react";

import './App.css';
import './callButton.css';
import './walletButton.css';
import Calls from "../body/Calls";


export default function App() {
  const [wallet, setWallet] = useState("🦊 Connectar sua carteira")
  const [_, setUserAddress] = useState("")
  const [addr, setAddr] = useState([])

  const connectWallet = async () => {
    const listUserAddress =  await window.ethereum.request({method: "eth_requestAccounts"})
    setWallet(`✅ ${listUserAddress[0]}`)
    setAddr(await callCounterContract.getCallers())
    setUserAddress(listUserAddress[0])
  }

  return (
    <>
    <div className="headerMainContainer">

      <div className="headerDataContainer">
        <div className="header">
        🌎 Olá Mundo!
        </div>

        <h3 className="bio">
        Eu sou <a className="link" target="_blank" href="https://linkedin.com/in/olivmath">
          Lucas Oliveira
        </a>!
        </h3><br/>

        <div className="describe">
        Me mande um 👋 pela Blockchain.
        </div>

        <a
        className="network"
        href="https://goerli.net/"
        target="_blank"
        >Görli Testnet Ethereum Network</a>

        <button className="walletButton" onClick={connectWallet}>
          <div className="describe">{wallet}</div>
        </button>

        <button className="callButton" onClick={
          async () => await callCounterContract.call({ gasLimit: 300000 })
        }>
          <h2>👋 Olá!</h2>
        </button>
      </div>
    </div>
    <Calls address={addr} update={setAddr}/>
    </>
  );
}
