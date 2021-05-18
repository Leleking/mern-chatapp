import React, { useState, useEffect } from "react";
import '../../styles/pages/login.css'
import { signIn } from '../../services'
import {useHistory} from 'react-router-dom'
import { AuthContext} from '../../App.js'
const Login = () => {
    let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signInAsync = async (e) => {
      //history.push('/')
      e.preventDefault()
      try {
          var result = await signIn({email, password})
          console.log(result.data)
          localStorage.setItem("user", JSON.stringify(result.data))
          history.push('/chat')

      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    console.log(email)
  },[email])
  return (
    <div>
      <div className="text-center">
      <form className="form-signin" onSubmit={(e) => {signIn(e)}}>
        <img
          className="mb-4"
          src="http://simeon.symliq.com/img/simeon.png"
          alt=""
          width="75"
          height="75"
        />
        <p className="mb-3 font-weight-normal">Log in to rio to continue</p>
        <label for="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          onChange={(event) => setEmail(event.target.value)}
          required
          autoFocus
        />
        <label for="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button onClick={(event) => signInAsync(event)} className="btn btn-lg btn-dark btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
      </form>
      </div>
    </div>
  );
};

export default Login;
