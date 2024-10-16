const express = require('express');
const userRouter = require('./Routes/userRoutes');
const projectRouter = require('./Routes/projectsRoute')
const testinomialRouter = require('./Routes/testinomialRoute')
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./Model/userModel')
var cookieParser = require('cookie-parser');
const app = express();


app.use(cors({
    origin: 'http://mycodeeditor.in',
    credentials: true,
    methods: 'POST,GET,PUT,PATCH',
}))
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/Code_Editor_Db')
    .then(() => { console.log('DB Connected Successfully'); })
    .catch((e) => { console.log("Error connecting DB ", e); })
app.use(userRouter);
app.use(projectRouter);
app.use(testinomialRouter);
app.listen(10000, () => { console.log("server is runnig at port 10000"); })




// BACKEND ONLINE URL RENDER=https://my-code-editor.onrender.com
//BACKEND LOCALHOST URL=http://localhost:10000

// FRONTEND LOCALOST URL=http://localhost:5173
// FRONTEND VERCEL ONLINE URL=https://my-code-editor-taupe.vercel.app

//MONGODB LOCALHOST URL = mongodb://localhost:27017/Code_Editor_Db
// MONGODB CLOUD ATLAS URL=mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/