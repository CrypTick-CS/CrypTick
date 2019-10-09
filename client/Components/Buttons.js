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
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const Buttons = () => {
  return (
    <ButtonsDiv>
      <Button className="buy">BUY</Button>
      <Button className="sell">SELL</Button>
    </ButtonsDiv>
  )
}

export default Buttons;