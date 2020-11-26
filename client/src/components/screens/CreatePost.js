import React,{useState} from 'react';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'


const CreatePost = () => {
    const history=useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    const postDetails=()=>{

        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","nishant123")
        console.log("hi")
        // uploadToCloud()
        console.log("hello")
        /* const resp= */ fetch("https://api.cloudinary.com/v1_1/nishant123/image/upload",{
            method:"post",body:data
        }).then(res=>res.json())
        // console.log("resp is",resp)
        /* resp.json() */.then(data=>{
            setUrl(data.url)            
            // console.log("setting url",data.url,url)
            // console.log("title,body,pic",title,body,url)
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,body
                    ,pic:data.url
                })
            }).then(res=>res.json()).then(data => {
                console.log("inside createpost then")
                console.log(data)
                if (data.error) {
                    console.log("data error "+data.error)
                    M.toast({ html: data.error,classes:"#ef5350 red lighten-1"})
                }else{
                    M.toast({html:"created post successfully",classes:"#9fa8da indigo lighten-3"})
                    history.push('/')
                }
            }).catch(err=>{console.log(err)})


            // setTimeout(function(){console.log("url is ",url,title,body) ; }, 3000);            
        }).catch(err=>{
            console.log(err)
        })  
    }
    return (
        <div className="card input-field create-post">
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="title" />
            <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} placeholder="body" />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light" onClick={()=>postDetails()} type="submit" name="action" style={{margin:"0 40%"}}>Submit Post
            </button>
        </div>
    )
}

export default CreatePost