const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/user.routes");
const postRoutes=require('./src/routes/post.routes')
require("dotenv").config({ path: "./src/config/.env" });
require("./src/config/db");
const { checkUser, requireAuth } = require("./src/middleware/auth.middleware");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use('/api/post', postRoutes)

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
