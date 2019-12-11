const express = require("express")
const helmet = require("helmet")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")

const server = express()

server.use(helmet())
server.use(logger())


server.use(express.json())

server.use("/api/users", userRouter)


server.use((req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "An internal error occurred"
  })
})

server.listen(8080, () => {
  console.log("Server Running on http://localhost:8080")
})