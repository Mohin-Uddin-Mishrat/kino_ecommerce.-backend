const express =require('express');
const productRouer = require('./router/productrouter');
const errorhandaler = require('./middlewere/error');
const userRouter = require('./router/UserRouter');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",productRouer);
app.use("/api/v1",userRouter);


app.use(errorhandaler);


module.exports =app