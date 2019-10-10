import React, { useState } from 'react';
import Holdings from './Holdings';
import CurrencyChart from './CurrencyChart';
import Buttons from './Buttons';

function Dashboard(props) {
  const [currentBTCValue, setCurrentBTCValue] = useState(0);

  return (
    <div className="dashboard">
      <Holdings dollarBalance={props.dollarBalance} bitcoinBalance={props.bitcoinBalance} />
      <CurrencyChart setCurrentBTCValue={setCurrentBTCValue} />
      <Buttons buyBTC={props.buyBTC}
      sellBTC={props.sellBTC}
      currentBTCValue={currentBTCValue} />
    </div>
  );
}

export default Dashboard;