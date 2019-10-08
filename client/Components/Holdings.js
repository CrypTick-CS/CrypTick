import React from 'react';

const Holdings = (props) => {
  return (
    <div className="holdings">
      <div className="holdings-title">HOLDINGS</div>
      <div className="holdings-usd-balance">{props.balances.USD}</div>
      <div className="holdings-btc-balance">{props.balances.BTC}</div>
    </div>
  )
}

export default Holdings;