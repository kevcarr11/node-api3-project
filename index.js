const express = require("express")
const app = express()
const host = process.env.HOST || "0.0.0.0"
const port = process.env.POST || 3300

const cors_proxy = require('cors-anywhere')
cors_proxy.createServer({
    originWhitelist: [],
})

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

app.listen(port, host, () => {
	console.log(`Running CORS Anywhere on http://${host}:${port}`)
})