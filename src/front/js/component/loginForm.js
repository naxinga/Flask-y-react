import { Action } from 'history';
import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom"

function LogIn() {
  const {store, actions} = useContext(Context)
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");
  const navigate= useNavigate();


  return (
    <>
      <div className="mb-3" >
        <label>Username</label>
        <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter usename" />
        <p className="text-muted">
          We'll never share your email with anyone else.
        </p>
      </div>

      <div className="mb-3" >
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      </div>
      <button variant="primary" type="submit" onClick={()=>{ 
          if (password == "" || username == ""){
            alert("Username/password empty")
          }else{
            actions.login(username, password, navigate)
          }
        }}>
        LogIn
      </button>
    </>
  );
}

export default LogIn;