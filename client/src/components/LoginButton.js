import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  //const config = { screen_hit: "signup"}
  return <button  className="btn btn-primary btn-block" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;