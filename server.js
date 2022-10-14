const express = require("express");
const app = express();
const port = 8000;
require('dotenv').config();

// app.use((req, res, next) =>{
//     //CORS(Cross Origin Resource Sharing)
//     //In order to make a API request to fetch data from backend
    
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//     next();
// });

const scheduleRoutes = require('./routes/schedule-route');
app.use('/schedule', scheduleRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
