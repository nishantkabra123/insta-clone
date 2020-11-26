// module.exports={

//     MONGOURI:"mongodb+srv://nishant:nishant@cluster0.wbqvm.mongodb.net/test?retryWrites=true&w=majority",
//     JWT_SECRET:"kjsdcbjke23"
// }

if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod')
}else{
    module.exports=require('./dev')
}