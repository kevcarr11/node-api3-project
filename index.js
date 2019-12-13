const express = require("express")
const helmet = require("helmet")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")

const server = express()
const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 8080

server.use(helmet())
server.use(logger())


server.use(express.json())

server.use("/api/users", userRouter)

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the base url in our API",
    cohort: process.env.LAMBDA_COHORT,
    api_key: process.env.SECRET_API_KEY
  })
})


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


server.listen(port, host, () => {
  console.log(`Server Running on http://${host}:${port}`)
})