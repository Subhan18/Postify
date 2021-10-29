import React, { useContext } from "react";
import { Link ,useHistory} from "react-router-dom";
import { UserContext } from "../App"

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()

  const renderList = () => {
    if (state) {
      return [<li><Link to="/profile" className="navs-link">My Posts</Link></li>,
      <li><Link to="/post" className="navs-link">  <i className="material-icons">camera_alt
      </i></Link></li>,
      <li> <button className="btn  red" 
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
        }}>LogOut
        </button></li>]
    } else {
      return [
        <li><Link to="/signin" className="navs-link">Signin</Link></li>,
        
        <li><Link to="/signup" className="navs-link">Signup</Link></li>
      ]
    }
  }
  return (

    <nav >
      <div className="nav-wrapper ">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">Postify</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>

  )
}

export default NavBar;




