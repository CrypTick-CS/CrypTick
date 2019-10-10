import React, { useState } from 'react';
import styled from 'styled-components';
import { verify } from 'crypto';

const Input = styled.input`
  color: white;
  font-size: 1.35em;
  border: 0;
  border-radius: 10px;
  display: flex;
  margin: 0 0 20px 0;
  padding: 6px 3px;
  width: 100%;
  background: black;
`;

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px midnightblue;
  border-radius: 10px;
`;

const Title = styled.div`
  font-family: 'Audiowide', cursive;
  font-size: 68px;
  margin-bottom: 40px;
  color: white;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const LoginDiv = styled.div`
    background: #393E44;
    padding: 25px;
    border-radius: 10px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-family: "Arial";
  font-size: 13px;
`;

const Login = (props) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [verifyError, setVerifyError] = useState('');

  const emailIsValid = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const verifyEntry = (email, password, method) => {
    if (email && password) {
      if (emailIsValid(email)) {
        if (method === 'login') {
          props.authenticate({email, password})
        } else if (method === 'signup') {
          props.signup({email, password})
        }
      } else {
        setVerifyError('Please provide a valid email address')
      }
    } else {
      setVerifyError('Please provide both an email and password');
    }
  }

  return (
    <LoginDiv>
      <Title>CrypTick</Title>
      <div className="fields">
        <Input type="text" placeholder="Enter Email" className="email" onChange={e => setEmail(e.target.value)}/>
        <Input type="password" placeholder="Enter Password" className="password" onChange={e => setPassword(e.target.value)}/>
      </div>
      {props.isError && !verifyError && 
      <ErrorMessage>
        Incorrect email and/or password.
      </ErrorMessage>}
      {verifyError && 
      <ErrorMessage>
        {verifyError}
      </ErrorMessage>}
      <Buttons>
        <Button className="login-btn" onClick={() => verifyEntry(email, password, 'login')}>Login</Button>
        <Button className="signup-btn" onClick={() => verifyEntry(email, password, 'signup')}>Signup</Button>
      </Buttons>
    </LoginDiv>
  )
}



export default Login;