
import React, { createContext } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRouter from './router'
export const AuthContext = createContext();
const initialState = {
  isAuthenticated: false, user: null, token: null
}
const reducer = (state, action) => {
  switch (action.type) {
    case "Login":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
      break;
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
  
    default:
      break;
  }

}
const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <Router>
        <AppRouter/>
      </Router>
    </AuthContext.Provider>
    
  )
}

export default App