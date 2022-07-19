import React, { useEffect, useState } from "react";
import "./App.css";
import { ConnectButton, Modal } from "web3uikit";
import logo from "./images/Moralis.png";
import Coin from "./components/Coin";
import { abouts } from "./about";
import { useMoralisWeb3Api ,useMoralis } from "react-moralis";

const App = () => {
  const [btc, setbtc] = useState(50);
  const [eth, setEth] = useState(80);
  const [link, setLink] = useState(20);
  const[modalPrice,setModalPrice] = useState();
  const Web3Api = useMoralisWeb3Api();
  const [visible, setVisible] = useState(false);
  const [modalToken, setModalToken] = useState();
  const {Moralis,isInitialized} = useMoralis();

  async function getRatio(tick,setPerc){
    const Votes = Moralis.Object.extend("Votes"); //Votes column from moralis database
    const query = new Moralis.Query(Votes);
    query.equalTo("crypto",tick);
    query.descending("createdAt");
    const results = await query.first();
    let up = Number(results.attributes.up);
    let down = Number(results.attributes.down);
    let ratio  = Math.round(up/(down+up) * 100);
    setPerc(ratio);
}
useEffect(()=>{
  if(isInitialized){
    getRatio("BTC",setbtc);
    getRatio("ETH",setEth);
    getRatio("LINK",setLink);
  }
})
  useEffect(()=>{
    async function fetchTokenPrice(){
      const options = {
        address:
        abouts[abouts.findIndex((x)=>x.token===modalToken)].address,
      };
      const price = await Web3Api.token.getTokenPrice(options);
      setModalPrice(price.usdPrice.toFixed(2)); //setmodal with await paramenter
    }
    if(modalToken){
      fetchTokenPrice() //Function fetch to call
    }
  },[modalToken])
  
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" height="50px" />
          Sentiment
        </div>
        <ConnectButton />
      </div>
      <div className="instructions">
        Where do you think these tokens are going? Up or Down?
      </div>

      <div className="list">
        <Coin
          perc={btc}
          setPerc={setbtc}
          token={"BTC"}
          setModalToken={setModalToken}
          setVisible={setVisible}
        />
         <Coin
          perc={eth}
          setPerc={setEth}
          token={"ETH"}
          setModalToken={setModalToken}
          setVisible={setVisible}
        />
        <Coin
          perc={link}
          setPerc={setLink}
          token={"LINK"}
          setModalToken={setModalToken}
          setVisible={setVisible}
        />
      </div>

      <Modal
        isVisible={visible}
        onCloseButtonPressed={() => setVisible(false)}
        hasFooter={false}
        title={modalToken}
      >
        <div>
        <span style = {{color:"black"}}>{`Price:`}</span>
          {modalPrice}$
        </div>
        <div>
          <span style = {{color:"white"}}>{`About`}</span>
        </div>
        <div>
          {modalToken &&
          abouts[abouts.findIndex((x)=> x.token === modalToken)].about}
        </div>
      </Modal>

    </>
  );
};

export default App;
