import { Action } from 'history';
import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '../store/appContext';



export const SingUp = () => { 
  const {store, actions} = useContext(Context)
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setUsername] = useState("");

  

  return (
    <div className="container">
      <div className="mb-3" >
        <label>Username</label>
        <input type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
      </div>

      <div className="mb-3" >
        <label>Email address</label>
        <input type="email" placeholder="Enter email" onChange={(e) => setEmail (e.target.value)} />
        <p className="text-muted">
          We'll never share your email with anyone else.
        </p>
      </div>

      <div className="mb-3" >
        <label>Password</label>
        <input type="password" placeholder="Password" onChange={(e) => setPassword (e.target.value)}/>
      </div>
    

      <button variant="primary" type="submit" onClick={()=>{ 
          if (email == ""  || password == "" || username == ""){
            alert("Username/password/email empty")
          }else{
            actions.singup(email, password, username)
          }
        }}>
        Submit
      </button>
    </div>
  );
}

export default SingUp;


