import React from 'react';
import styled from 'styled-components';

const HoldingsDiv = styled.div`

`;

const HoldingsTitle = styled.div`

`;

const HoldingsContainer = styled.div`
  color: white;
`;

const HoldingsBalance = styled.div`

`;

const HoldingsLabel = styled.div`

`;

const Holdings = (props) => {
  return (
    <HoldingsDiv>
      <HoldingsTitle>Holdings</HoldingsTitle>
      <HoldingsContainer>
        <HoldingsBalance className="holdings-usd-balance">{props.dollarBalance}</HoldingsBalance>
        <HoldingsLabel>Current Balance USD</HoldingsLabel>
      </HoldingsContainer>
      <HoldingsContainer>
        <HoldingsBalance className="holdings-btc-balance">{props.bitcoinBalance}</HoldingsBalance>
        <HoldingsLabel>Invested Balance BTC in USD</HoldingsLabel>
      </HoldingsContainer>
    </HoldingsDiv>
  )
}

export default Holdings;