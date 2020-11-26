import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const SignIn = () => {
    const {state,dispatch} = useContext(UserContext)
    // console.log(typeof(useContext),useContext(UserContext))
    // const [state,dispatch]=useContext(UserContext)
    // console.log(typeof(state))
    const history=useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#ef5350 red lighten-1"})
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password, email
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.error) {
                M.toast({ html: data.error,classes:"#ef5350 red lighten-1"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signedin success",classes:"#9fa8da indigo lighten-3"})
                history.push('/')
            }
        }).catch(err=>{console.log(err)})
    }
    
    return (
        <div>
            <div className="card auth-card">
                <h2 className="brand-logo">Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={()=>PostData()} className="btn waves-effect waves-light" type="submit" name="action">Sign In
                </button>
                <h6><Link to="/signup">Dont have an account ? Click here</Link></h6>


            </div>
        </div>
    )
}

export default SignIn
