const express=require('express')

const app=express()

const mongoose=require('mongoose')
const port= process.env.PORT || 5000

const{MONGOURI}=require('./config/keys')

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

mongoose.connect(MONGOURI,{
     useNewUrlParser: true,
     useUnifiedTopology: true
})


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo",)
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})

app.listen(port,()=>{

    console.log("listening on port ",port)
})

if(process.env.NODE_ENV="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}