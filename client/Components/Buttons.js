import React, { useState } from 'react';
import styled from 'styled-components';


const ButtonDiv = styled.button`
  border: none;
  font-size: 20px;
  color: white;
  font-family: 'Audiowide';
  margin-right: 5px;
`;

const ButtonsDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  background: #393E44;
  padding: 25px;
  border-radius: 10px;
`;

const QuantityInput = styled.input`
  font-size: 20px;
  color: white;
  background: black;
  border: none;
  border-radius: 5px;
  font-family: 'Audiowide';
  padding-left: 6px;
`;


const Buttons = (props) => {
  const [buyBTCValue, changeBuyBTCValue] = useState(0.5)
  const [sellBTCValue, changeSellBTCValue] = useState(0.5)

  return (
    <ButtonsDiv>
      <div>
        <ButtonDiv className="buy" style={{background: 'green'}} onClick={() => props.buyBTC(buyBTCValue, props.currentBTCValue)}>BUY</ButtonDiv>
        <QuantityInput type="number" min="0.1" max="25" step="0.1" value={buyBTCValue} onChange={(e) => changeBuyBTCValue(e.target.value)} ></QuantityInput>
      </div>
      <div>
        <ButtonDiv className="sell" style={{background: 'red'}} onClick={() => props.sellBTC(sellBTCValue, props.currentBTCValue)}>SELL</ButtonDiv>
        <QuantityInput type="number" min="0.1" max="25" step="0.1" value={sellBTCValue} onChange={(e) => changeSellBTCValue(e.target.value)} ></QuantityInput>
      </div>
{/* // TODO: GET RID OF THESE HARDCODED VALUES, AND PUT SOMETHING REAL THUR
// email: sessionStorage.getItem('_CrypTick'), */}
{/* const sendTransaction = async (transType, cryptoType="BITCOIN") => {
  const result = await fetch('/transaction',{
    method: 'POST',
    headers: {"content-type":"application/json"},
    body: JSON.stringify({
      email: sessionStorage.getItem('_CrypTick'),
      transactionDetails: {
          cryptoType: cryptoType,
          transactionType: transType,
          cryptoQty: 1,
          cryptoVal: 5000.00,
        }
    })
  });
  const retval = await result.json();
  return retval;
}

const Buttons = () => {
  return (
    <ButtonsDiv>
      <Button className="buy" onClick={()=>{sendTransaction("BUY")}}>BUY</Button>
      <Button className="sell" onClick={()=>{sendTransaction("SELL")}}>SELL</Button> */}
    </ButtonsDiv>
  )
}

export default Buttons;
