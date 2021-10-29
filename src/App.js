import React, { useEffect, createContext,useContext, useReducer} from 'react';
import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup.js'
import CreatePost from './components/screens/createPost'
import { reducer, initialState } from './reducers/UserReducer'

export const UserContext = createContext()
  const Routing = ()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch({type:"USER",payload:user})
      }else{
        if(!history.location.pathname.startsWith('/reset'))
             history.push('/signin')
      }
    },[])
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/signin"><Signin /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/post"><CreatePost /></Route>
    </Switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
