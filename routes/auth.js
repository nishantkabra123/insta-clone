const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model('User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')
const requireLogin=require('../middleware/requireLogin')
const {OAuth2Client}=require('google-auth-library')

// let userExists=false

// router.get('/',(req,res)=>{
// res.send("hello")
// })

const client=new OAuth2Client("502222932529-3i1mpsjeruqeeeeum9i9tsgp4fjconhk.apps.googleusercontent.com")

router.post('/googlelogin',(req,res)=>{
    const {tokenId} =req.body
    client.verifyIdToken({idToken:tokenId,audience:"502222932529-3i1mpsjeruqeeeeum9i9tsgp4fjconhk.apps.googleusercontent.com"})
    .then(response=>{
        const {email_verified,name,email}=response.payload
        console.log(response.payload)
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(422).json({error:err})
                }else{
                    if(user){
                        const token=jwt.sign({_id:user._id},JWT_SECRET)  //payload,secret
                        const {_id,name,email}=user
                        res.json({token,user:{_id,name,email}})   //{token:token} 
                    }else{
                        let password=email
                        let newUser= new User({name,email,password})
                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(422).json({error:"User creation failed"})
                            }
                            const token=jwt.sign({_id:data._id},JWT_SECRET)  //payload,secret
                            const {_id,name,email}=newUser
                            res.json({token,user:{_id,name,email}})   //{token:token} 
                        })

                    }
                }
            })
        }
    })

})

router.post('/signup',(req,res)=>{    
    const {name,email,password}=req.body 

    if(!email || !name || !password){
       return res.status(422).json({error:"please add all fields"})
    }
    User.findOne({email:email}).then(
        (savedUser)=>{
            if(savedUser){
                // userExists=true
                return res.status(422).json({error:"user already exists with same email"})
            }
            bcrypt.hash(password,12)
            .then(hashedpassword=>{

                const user=new User({
                    name,email,password:hashedpassword
                })        
                user.save().then(()=>{
                    res.json({
                        message:"saved successfully"
                    })               
                })
                .catch(err=>{
                    console.log(err)
                })
            })          
        }        
    ).catch(err=>{
        console.log(err)
    })    
})


router.post('/signin',(req,res)=>{
    const {email,password} =req.body
    if(!email || !password){
        res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)  //payload,secret
                const {_id,name,email}=savedUser
                res.json({token,user:{_id,name,email}})   //{token:token}                
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router