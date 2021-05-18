import { lazy } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Welcome from '../views/welcome.js'
import chat from '../views/chat/index.js'
import Login from '../views/auth/Login'
const AppRouter = () => {
    
   return (
    <Router>
        <Switch>
            <Route path="/" exact component={Welcome}/>
            <Route path="/chat" exact component={chat}/>
            <Route path="/auth/login" exact component={Login}/>
            <Route path="/auth/register" exact component={Login}/>
        </Switch>
    </Router>
   )
}

export default AppRouter