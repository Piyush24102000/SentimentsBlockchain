import React, { useEffect, useState } from "react";
import "./Coin.css";
import {Button} from "web3uikit";
import{useWeb3ExecuteFunction,useMoralis} from "react-moralis";

function Coin({perc, setPerc, token,setModalToken,setVisible}) {
  const[color,setColor] = useState();
  const contractProcessor = useWeb3ExecuteFunction();
  const{isAuthenticated} = useMoralis();

  useEffect(() => {
      if(perc<50){
        setColor("#c43d08");
      } else{
        setColor("green");
      }
  },[perc])
//////////////////Connecting to contract////////////////
  async function vote(updown){
    let options = {
      contractAddress : "0xd2c5E7DA62d107a174D8CC2D866e16036Fd008eD",
      functionName: "vote",
      abi: [{"inputs":[{"internalType":"string","name":"_crypto","type":"string"},{"internalType":"bool","name":"_vote","type":"bool"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      params : {
        _crypto: token,
        _vote:updown,
      },
    }
    await contractProcessor.fetch({
      params:options,
      onSuccess:() => {
        console.log("vote succesfull");
      },
      onError:(error) => {
        alert(error.data.message)
      }
    });
  }
  return (
    <>
      <div>
        <div className="token">
          {token}
        </div>
        <div className="circle" style={{boxShadow: `0 0 20px ${color}`}}>
          
          <div className="wave"
          style={{
            marginTop: `${100 - perc}%`,
            boxShadow: `0 0 20px ${color}`,
            backgroundColor: color ,
        }}
            ></div>
            <div className="percentage">
              {perc}%
            </div>
          </div>
         
          <div className="votes">
            <Button
              onClick={()=>{if(isAuthenticated){
                vote(true)
              }else{
                alert("Authenticate to vote")
              }
            }}
              text ="Up"
              theme = "primary"
              type="button"
            />
            
            <Button
            color="red"
              onClick={()=>{if(isAuthenticated){
                vote(false)
              }else{
                alert("Authenticate to vote")
              }
            }}
              text ="Down"
              theme = "colored"
              type="button"
            />
          </div>

          <div className="votes">
            <Button
            onClick={() => {
              setModalToken(token)
              setVisible(true);
            }}
            text= "INFO"
            theme = "translucent"
            type="button"
            />
          </div>
      </div>
       
      
    </>
  );
}

export default Coin;
