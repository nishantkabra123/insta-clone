import React, { useState } from 'react';
import { Link ,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
    const history=useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#ef5350 red lighten-1"})
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, password, email
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                M.toast({ html: data.error,classes:"#ef5350 red lighten-1"})
            }else{
                M.toast({html:data.message,classes:"#9fa8da indigo lighten-3"})
                history.push('/signin')
            }
        }).catch(err=>{console.log(err)})
    }
    return (
        <div>
            <div className="card auth-card">
                <h2 className="brand-logo">Picstagram</h2>
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => PostData()} className="btn waves-effect waves-light" type="submit" name="action">Sign Up
                </button>
                <h6><Link to="/signin">Already have an account ? Click here</Link></h6>

            </div>
        </div>
    )
}

export default Signup
