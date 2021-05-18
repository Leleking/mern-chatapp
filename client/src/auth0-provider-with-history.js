import React from "react";
import { useHistory } from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react'
import { useAuth0 } from "@auth0/auth0-react";

import config from './config.json'
const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();

    /* const domain = config.AUTH0_DOMAIN;
    const clientId = config.AUTH0_CLIENT_ID;
 */
    const onRedirectCallback = (appState) => {
        //alert(isAuthenticated)
        history.push(appState ?.returnTo || window.location.pathname)
    }


    return (
        <Auth0Provider
            domain={config.AUTH0_DOMAIN}
            clientId={config.AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithHistory
