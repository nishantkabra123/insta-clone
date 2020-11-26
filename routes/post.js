const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin=require('../middleware/requireLogin')
const Post=mongoose.model('Post')

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name email")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    // console.log("backend createpost");
    // return res.json({post:"createpost from backend"})
    const{title,body,pic}=req.body
    if(!title || !body || !pic){
        // console.log(req.body)
        return res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name email")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            // console.log("be /like")
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id} //pull will remove user from likes array
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name email")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/comment',requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment} 
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")    
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
                // res.json({message:"successfully deleted"})
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})

router.delete('/deletecomment/:postId/:commentId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        console.log("hi")
        console.log(post.comments)
        const userComment=post.comments.filter((item)=>{
            return item._id==req.params.commentId
        })
        console.log(userComment)
        if(userComment[0].postedBy._id.toString()===req.user._id.toString()){
            console.log("yes")
            Post.findByIdAndUpdate(req.params.postId,{
                $pull:{"comments":{_id:req.params.commentId}} 
            },{
                new:true,useFindAndModify:false
            }).populate("comments.postedBy","_id name")
            .populate("postedBy","_id name")    
            .exec((err,result)=>{
                if(err){
                    return res.status(422).json({error:err})
                }else{
                    console.log("comment deleted ",result)
                    res.json(result)
                }
            })
        }
    })
})

/* router.delete('/deletecomment/:postId/:commentId',requireLogin,(req,res)=>{

        Post.findByIdAndUpdate(req.params.postId,{
            $pull:{comments:req.params.commentId} 
        },{
            new:true
        }).populate("comments.postedBy","_id name")
        .populate("postedBy","_id name")    
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            if(post.comments.postedBy._id.toString()===req.user._id.toString()){
                res.json(result)
            }
        })
        // $push:{post.comments:commentId}
        // post.remove()
        // .then(result=>{
        //     res.json(result)
        //     // res.json({message:"successfully deleted"})
        // }).catch(err=>{
        //     console.log(err)
        // })
    
   
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }        
    })
}) */

module.exports=router