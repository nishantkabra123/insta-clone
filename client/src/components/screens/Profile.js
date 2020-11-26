import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App'

const Profile =()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.posts)
        })
    },[])
    return (
        <div style={{maxWidth:"60vw",margin:"0px auto"}}>
            <div style={{display:"flex",margin:"18px 0px",borderBottom:"1px solid grey"}}>
                <div style={{margin:"10px 60px 10px 20px"}}>
                    <img style={{ width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                     />
                </div>
                <div>
                    <h5>{state?state.name:"loading"}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{mypics.length>0?mypics.length:''} posts</h6>
                        <h6>followers</h6>
                        <h6>following</h6>

                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                mypics.map(item=>{
                    return (
                        <img key={item._id} className="item" src={item.photo} alt={item.title} />
                    )
                })   
                }
        
            </div>
        </div>
    )
}

export default Profile
