const express = require("express");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userRoutes = require('./src/routes/user.routes');
require("dotenv").config({ path: "./src/config/.env" });
require('./src/config/db');
const {checkUser} = require('./src/middleware/auth.middleware')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);

//routes
app.use('/api/user',userRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
