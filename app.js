require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const connectDB = require("./database/connection")
const session = require("express-session")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const homeRouter = require("./routers/homeRouter")
const adminRouter = require("./routers/adminRouter")
const loginRouter = require("./routers/loginRouter")
const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

app.use(express.static("./public"))
connectDB(MONGO_URI)

app.use(cors({origin:true}))
app.use(session({
    secret: "sessionsecret",
    resave: true,
    saveUninitialized: false
}))
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json())
app.use("/home", homeRouter)
app.use("/home/adminlogin", adminRouter)
app.use("/home/login", loginRouter)

const errFunction = (req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, "public", "error.html"))
}

app.use("*", errFunction)

mongoose.connection.on("open", (event) => {
    app.listen(PORT, () => console.log(`Sever listening to Port ${PORT} http://localhost:${PORT}/home`))
})