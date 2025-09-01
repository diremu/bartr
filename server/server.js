const express = require("express")
const app = express()
const port = 3200
const cors = require("cors")
const corsOptions = require("./config/corsOptions")

//to handle json data
app.use(express.json())
//to handle static files
app.use(express.static("public"))
app.use(cors(corsOptions))

app.use('/', require("./routes/root"))

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})