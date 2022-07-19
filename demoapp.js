import React, { useEffect, useState } from "react";
import "./App.css";
import { ConnectButton,Modal } from "web3uikit";
import logo from "./images/Moralis.png";
import Coin from "./components/Coin";

const App = () => {
const[btc,setbtc] = useState(50);
const[visible,setVisible] = useState(false);
const[modalToken,setModalToken] = useState();
  return (
    <>
    <div className="header">
      <div className = "logo">
        <img src={logo} alt="logo" height="50px"/>
        Sentiment
      </div>
      <ConnectButton/>
    </div>
    <div className="instructions">
      Where do you think these tokens are going? Up or Down?
    </div>
    <div className="list">
   
    <Coin 
    perc = {btc}
    setPerc = {setbtc}
    token={"BTC"} 
    setModalToken = {setModalToken}
    setVisible = {setVisible}
    />
     </div>
        <Modal 
          isVisible={visible}
          onCloseButtonPressed={() => setVisible(false)}
          hasFooter = {false}
          title = {modalToken}
        ></Modal>

   
    </>
  );
};

export default App;
