import React, { useState } from 'react';
import Holdings from './Holdings';
import CurrencyChart from './CurrencyChart';
import Buttons from './Buttons';
import styled from 'styled-components';


const DashboardStyled = styled.div`
    background: #22252A;
    overflow: scroll;
    height: 100vh;
    overflow: scroll;
    padding-top: 20px;
`;

function Dashboard(props) {
  const [currentBTCValue, setCurrentBTCValue] = useState(0);

  return (
    <DashboardStyled className="dashboard">
      <Holdings dollarBalance={props.dollarBalance} bitcoinBalance={props.bitcoinBalance} currentBTCValue={currentBTCValue} />
      <CurrencyChart setCurrentBTCValue={setCurrentBTCValue} timeRange={props.timeRange}/>
      <Buttons buyBTC={props.buyBTC}
      sellBTC={props.sellBTC}
      changeTimeRange={props.changeTimeRange}
      currentBTCValue={currentBTCValue} />
    </DashboardStyled>
  );
}

export default Dashboard;
