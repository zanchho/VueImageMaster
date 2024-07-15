import express from "express"
import session from "express-session"

import { dirname, join } from "path"
import { createServer } from "http"
import { fileURLToPath, parse } from "url"

const app = express()
const port = process.env.PORT || 3000

app.use(
  session({
    secret: "test", //a temporary secret for local testing only
    // secret: process.env.SESSION_SECRET, // Replace with process.env.SESSION_SECRET in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Use https for prod
  })
)
const distPath = join(dirname(fileURLToPath(import.meta.url)), "dist")
console.log(distPath)
// Serve static files from the Vue.js build folder
app.use(express.static(distPath))

// Catch all routes and return the index file
app.get("*", (req, res) => {
  console.log(join(distPath, "index.html"))
  res.sendFile(join(distPath, "index.html"))
})

const server = createServer(app)

server.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
