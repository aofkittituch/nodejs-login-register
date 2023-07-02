const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");

// MongoDB Connection
// mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/Cluster0", {
  useNewUrlParser: true,
});

global.loggedIn = null;

// Controllers
const indexController = require("./controllers/indexController");
const loginController = require("./controllers/loginController");
const registerController = require("./controllers/registerController");
const storeUserController = require("./controllers/storeUserController");
const loginUserController = require("./controllers/loginUserController");
const logoutController = require("./controllers/logoutController");
const homeController = require("./controllers/homeController");

// Middleware
const redirectIfAuth = require("./middleware/redirectAuth");
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.static("public")); // เข้าถึงไฟล์ใน folder public
app.use(express.json());
app.use(express.urlencoded()); // แปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object
app.use(flash());
app.use(
  expressSession({
    secret: "node secret",
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.set("view engine", "ejs");

app.get("/", indexController);
app.get("/home", authMiddleware, homeController);
app.get("/login", redirectIfAuth, loginController);
app.get("/register", redirectIfAuth, registerController);
app.post("/user/register", redirectIfAuth, storeUserController);
app.post("/user/login", loginUserController);
app.get("/logout", logoutController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
