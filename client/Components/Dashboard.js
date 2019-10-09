import React, { useState } from 'react';
import Holdings from './Holdings';
import CurrencyChart from './CurrencyChart';
import Buttons from './Buttons';


function Dashboard(props) {
  return (
    <div className="dashboard">
      <Holdings dollarBalance={props.dollarBalance} bitcoinBalance={props.bitcoinBalance} />
      <CurrencyChart />
      <Buttons />
    </div>
  );
}

export default Dashboard;