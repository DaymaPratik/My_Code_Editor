const express=require('express');
const userRouter=require('./Routes/userRoutes');
const projectRouter=require('./Routes/projectsRoute')
const mongoose=require('mongoose');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const User=require('./Model/userModel')
var cookieParser = require('cookie-parser');
const app= express();

// http://localhost:5173
app.use(cors({
    origin:'https://my-code-editor-taupe.vercel.app/',
    credentials: true,
    methods:'POST,GET,PUT,PATCH',
}))
app.use(express.json());
app.use(cookieParser());
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, 'ajfwjrirewifhwfwrgfwhrfghwihwgfwuiwrefwyruecyrwuwfyecurchburctr9b', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      console.log(user);
      next();
    });
  };
  
  // mongodb://localhost:27017/Code_Editor_Db
mongoose.connect('mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/')
.then(()=>{console.log('DB Connected Successfully');})
.catch((e)=>{console.log("Error connecting DB ",e);})
// app.use(authenticateToken);
app.use(userRouter);
app.use(projectRouter);
app.listen(10000,()=>{console.log("server is runnig at port 10000");})
