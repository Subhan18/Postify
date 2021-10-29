const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {MONGOURI}= require('./keys')
//Y03eebpZpkV656dp


mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',()=>{
    console.log(" err connecting" ,err)
})


app.use(express.json())


require('./models/user')
require('./models/post')

app.use(require("./routes/auth"))
app.use(require("./routes/post"))


app.listen("5000",()=>{console.log("listeninfg at port 5000")})