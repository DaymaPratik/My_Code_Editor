// const express = require('express');
// const userRouter = require('./Routes/userRoutes');
// const projectRouter = require('./Routes/projectsRoute');
// const testinomialRouter = require('./Routes/testinomialRoute');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const app = express();
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://mycodeeditor.in');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// // Apply CORS as the first middleware
// app.use(cors({
//     origin: 'http://mycodeeditor.in', // Ensure no trailing slash
//     credentials: true,
//     methods: 'GET,POST,PUT,PATCH,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
// }));

// app.options('*', cors()); // Handle preflight requests for all routes

// app.use(express.json());
// app.use(cookieParser());

// mongoose.connect('mongodb://localhost:27017/Code_Editor_Db')
//     .then(() => { console.log('DB Connected Successfully'); })
//     .catch((e) => { console.log("Error connecting DB ", e); });

// // Your routes
// app.use(userRouter);
// app.use(projectRouter);
// app.use(testinomialRouter);

// app.listen(10000, () => { console.log("server is running at port 10000"); });





// BACKEND ONLINE URL RENDER=https://my-code-editor.onrender.com
//BACKEND LOCALHOST URL=http://localhost:10000

// FRONTEND LOCALOST URL=http://localhost:5173
// FRONTEND VERCEL ONLINE URL=https://my-code-editor-taupe.vercel.app

//MONGODB LOCALHOST URL = mongodb://localhost:27017/Code_Editor_Db
// MONGODB CLOUD ATLAS URL=mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/

const cors = require('cors');
const express = require('express'); 
const userRouter = require('./Routes/userRoutes');
const projectRouter = require('./Routes/projectsRoute');
const testinomialRouter = require('./Routes/testinomialRoute');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// CORS configuration options
const corsOptions = {
    origin: 'http://mycodeeditor.in', // Your frontend origin
    credentials: true,                // Allow credentials like cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Apply CORS middleware to handle CORS
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions)); // This allows preflight requests for all routes

// Middleware to log CORS headers
app.use((req, res, next) => {
    console.log('CORS Headers being sent:', res.getHeaders()); // Logs the response headers including CORS
    next();
});

// Use built-in middleware to parse JSON request bodies
app.use(express.json());

// Cookie parsing middleware for handling cookies
app.use(cookieParser());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/Code_Editor_Db')
    .then(() => { 
        console.log('DB Connected Successfully'); 
    })
    .catch((e) => { 
        console.log('Error connecting DB', e); 
    });

// Use routers for specific routes
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/testinomial', testinomialRouter);

// Start the server
app.listen(8000, () => { 
    console.log('Server is running At port 8000'); 
});





















