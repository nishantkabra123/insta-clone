import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile =()=>{
    const [userProfile,setProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    const {userid}=useParams()
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
        })
    },[])
    return (
        <>
        {userProfile ?
        <div style={{maxWidth:"60vw",margin:"0px auto"}}>
            <div style={{display:"flex",margin:"18px 0px",borderBottom:"1px solid grey"}}>
                <div style={{margin:"10px 60px 10px 20px"}}>
                    <img style={{ width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                     />
                </div>
                <div>
                    <h5>{userProfile.user.name}</h5>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>followers</h6>
                        <h6>following</h6>

                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                userProfile.posts.map(item=>{
                    return (
                        <img key={item._id} className="item" src={item.photo} alt={item.title} />
                    )
                })   
                }
        
            </div>
        </div>
        : <h2>loading...!</h2>}
       
        </>
    )
}

export default Profile
