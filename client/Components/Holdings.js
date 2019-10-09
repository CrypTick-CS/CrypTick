import React from 'react';
import styled from 'styled-components';

const HoldingsDiv = styled.div`
    background: #393E44;
    padding: 25px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
`;
const HoldingsTitle = styled.div`

`;

const HoldingsContainer = styled.div`
  color: white;
  text-align: center;
  font-family: 'Audiowide';
`;

const HoldingsBalance = styled.div`
  font-size: 34px;
`;

const HoldingsLabel = styled.div`
  font-size: 16px;
  font-weight: 300;
`;

const Holdings = (props) => {
  return (
    <HoldingsDiv>
      <HoldingsContainer>
        <HoldingsBalance className="holdings-usd-balance">{props.dollarBalance}</HoldingsBalance>
        <HoldingsLabel>Current Balance USD</HoldingsLabel>
      </HoldingsContainer>
      <HoldingsContainer>
        <HoldingsBalance className="holdings-btc-balance">{props.bitcoinBalance}</HoldingsBalance>
        <HoldingsLabel>Invested Balance USD</HoldingsLabel>
      </HoldingsContainer>
    </HoldingsDiv>
  )
}

export default Holdings;