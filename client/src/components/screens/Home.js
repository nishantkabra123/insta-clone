import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home =()=>{
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    },[])

    const likePost=(id)=>{
        // console.log("id is",id)
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")           
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>console.log(err))
    }
    const unlikePost=(id)=>{
        // console.log("state is",state)
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")           
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>console.log(err))
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const deletePost=(postid)=>{
        fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.filter(item=>{
                return item._id!==result._id                
            })
            setData(newData)
        })
    }
    const deleteComment=(postid,commentid)=>{
        fetch(`/deletecomment/${postid}/${commentid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        })
    }

    return (
        <div className="home">
            {                
                data.map(item=>{
                    // console.log("data is",data)
                    return (
                        <div className="card home-card" key={item._id}>

                            <h5><Link to={item.postedBy._id!==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link> {item.postedBy._id==state._id && 
                            <i className="material-icons" onClick={()=>{deletePost(item._id)}} style={{float:"right"}}>delete</i>}</h5>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                            {/* <i className="material-icons" style={{color:"red"}}>favorite</i> */}
                            {item.likes.includes(state._id)?
                            <i className="material-icons" onClick={()=>unlikePost(item._id)}>thumb_down</i>:
                            <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                            }
                            {/* <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i> 
                            <i className="material-icons" onClick={()=>unlikePost(item._id)}>thumb_down</i> */}
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {   
                                
                                    item.comments.map(record=>{
                                        return (                                            
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}><Link className="comments-user" to={record.postedBy._id!==state._id?"/profile/"+record.postedBy._id:"/profile"}>{record.postedBy.name}</Link></span> {record.text}
                                        {
                                        record.postedBy._id==state._id && 
                                         <i className="material-icons" onClick={()=>{deleteComment(item._id,record._id)}} style={{float:"right"}}>delete</i>
                                        }</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                    e.target[0].value=""
                                    // console.log(e.target[0].value)
                                }}>
                                <input type="text" placeholder="add a comment"/>
                                </form>
                                
                            </div>
                        </div>
                    )
                })
            }            
        </div>
    )
}

export default Home