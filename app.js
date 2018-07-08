const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const gameRouter = require("./src/routes/game")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())  

gameRouter(app)

module.exports = app
