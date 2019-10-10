import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: "midnightblue";
  color: "white";
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px midnightblue;
  border-radius: 3px;
`;

const ButtonsDiv = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    background: #393E44;
    padding: 25px;
    border-radius: 10px;
`;


// TODO: GET RID OF THESE HARDCODED VALUES, AND PUT SOMETHING REAL THUR
// email: sessionStorage.getItem('_CrypTick'),
const sendTransaction = async (transType, cryptoType="BITCOIN") => {
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
      <Button className="sell" onClick={()=>{sendTransaction("SELL")}}>SELL</Button>
    </ButtonsDiv>
  )
}

export default Buttons;
