import React, { useState } from 'react';
import Holdings from './Holdings';
import CurrencyChart from './CurrencyChart';
import Buttons from './Buttons';


function Dashboard(props) {
  const [balances, setBalances] = useState({USD: 0, BTC: 0})

  return (
    <div className="dashboard">
      <Holdings balances={balances} />
      <CurrencyChart />
      <Buttons />
    </div>
  );
}

export default Dashboard;