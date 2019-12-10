const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")

const server = express()

server.use(helmet())
server.use(morgan("short"))
server.use(express.json())



server.use((req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  })
})

server.listen(8080, () => {
  console.log("Server Running on http://localhost:8080")
})