const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path:'./config.env'});

process.on("uncaughtException",(err)=>{
  console.log(err.message);

  process.exit(1);
    
})

mongoose.connect(process.env.DB_URL).then((data)=>{
    console.log(`mongodb connected with http://localhost:${data.connection.host}`);
})


const server= app.listen(process.env.PORT,()=>{
    console.log('server is running');
})

process.on("unhandledRejection",(err)=>{
    console.log(err.message);
    console.log("server is close due to unhandled");
    server.close(()=>{
        process.exit(1);
    })
    
    
})