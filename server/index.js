require("dotenv").config()
const express = require("express")
const sequelize = require("./db.js")
const models = require("./models/models.js")
const PORT = process.env.PORT || 3000
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ message: "ОНО ЖИВОЕ!" })
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.error("Произошла ошибка!" + "\n-----------------\n" + e)
    }
}

start()