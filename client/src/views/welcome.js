import React from "react";
import LoginButton from '../components/LoginButton'
import AuthenticationButton from '../components/AuthenticationButton'
import {useHistory} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from '../services'
const Welcome = () => {
    let history = useHistory();

    const { isAuthenticated, user } = useAuth0();
    if(isAuthenticated) {
        const {name, email} = user
       getUser({name, email}).then((res) => {
            console.log(res.data)
            localStorage.setItem("user", JSON.stringify(res.data))
            history.push('/chat')
       }).catch((err) => {
          console.log(err)
       })
    }
    //const { name, picture, email } = user;
    //history.push('/chat')
    //
    return (
        <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo">ChatApp by Simeon Nortey</div>
        <div className="navbar-nav ml-auto">
            <AuthenticationButton />
        </div>
        </div>
      </nav>
    </div>
    )
}

export default Welcome