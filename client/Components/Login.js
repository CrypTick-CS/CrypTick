import React, { useState } from 'react';

const Login = (props) => {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  return (
    <div className="login">
      <div className="fields">
        <input type="text" className="email" onChange={e => setEmail(e.target.value)}/>
        <input type="text" className="password" onChange={e => setPassword(e.target.value)}/>
      </div>
      <div className="buttons">
        <button className="login-btn" onClick={props.authenticate}>Login</button>
        <button className="signup-btn">Signup</button>
      </div>
    </div>
  )
}



export default Login;