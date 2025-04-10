require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectDb = require("./utils/db");
const authrouter = require("./routers/authrouter");
const postrouter = require("./routers/postrouter");
const path = require('path');
//middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET, PUT, POST, HEAD, DELETE, PATCH",
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// mount the roter
app.use("/api/auth", authrouter);
app.use("/api/post", postrouter);


const PORT = process.env.PORT || 5001;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at : ${PORT}`)
    });
})
