
import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  //alert(isAuthenticated)

  return isAuthenticated ? <LogoutButton /> : (
   <span>
       <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <LoginButton />  
        </li>
      <li className="nav-item pl-2">
        <SignupButton />
      </li>
      </ul>
   </span>
  );
};

export default AuthenticationButton;