import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LogIn() {
  return (
    <form>
      <div className="mb-3" controlId="formBasicEmail">
        <label>Email address</label>
        <input type="email" placeholder="Enter email" />
        <p className="text-muted">
          We'll never share your email with anyone else.
        </p>
      </div>

      <div className="mb-3" controlId="formBasicPassword">
        <label>Password</label>
        <input type="password" placeholder="Password" />
      </div>
      <button variant="primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default LogIn;