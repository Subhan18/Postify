import React ,{useState,useContext} from "react";
import {Link,useHistory} from "react-router-dom";
import {UserContext} from "../../App"
import M from 'materialize-css'
const Signin = () => {
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                password:password,
                email:email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#f44336 red"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signedin success",classes:"#00e676 green accent-3"})
                history.push('/')
            }
        
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 >Postify</h2>
                
                <input type="text" placeholder="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />


                <button className="btn waves-effect waves-light #2196f3 blue" 
                onClick={()=>PostData()}>Login
                </button>


                <h6>Don't have an account? <Link to="/signup" className="log">Sign up</Link> </h6>

            </div>
        </div>
    )
}
export default Signin;