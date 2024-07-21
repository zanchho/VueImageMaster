import express from "express"
import session from "express-session"
import jwt from "jsonwebtoken"
import CryptoJS from "crypto-js"
import { dirname, join } from "path"
import { createServer } from "http"
import { fileURLToPath, parse } from "url"
import cors from "cors"
//load .env
import dotenv from "dotenv"
await dotenv.config()
// TODO HTTPS
const port = process.env.PORT || 3000
const distPath = join(dirname(fileURLToPath(import.meta.url)), "dist")
const app = express()
//#region Middleware
// might need working over so it fits prod
const corsOptions = {
  origin: "*", // Allow all
}
app.use(cors(corsOptions))
app.use(express.json())
// Serve static files from the Vue.js build folder
app.use(express.static(distPath))

app.use(
  session({
    secret: "test", //a temporary secret for local testing only
    // secret: process.env.SESSION_SECRET, // Replace with process.env.SESSION_SECRET in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Use https for prod
  })
)

app.use((req, res, next) => {
  if (req.path.includes("/login")) {
    // console.log(req.path)
    next()
    return
  }

  const authHeader = req.headers.authorization
  if (!authHeader) return res.sendStatus(401)
  const token = authHeader && authHeader.startsWith("Bearer ")
  const decoded = jwt.verify(token.split(" ")[0])
  console.log(token, decoded) //TODO REMOVE
  if (!decoded) return res.sendStatus(401)
  req.decoded = decoded
  next()
})
//#endregion

//#region Routes
// Dummy user authentication endpoint
app.post("/login", (req, res) => {
  const encryptedCredentials = req.body.encryptedCredentials
  console.log(encryptedCredentials)
  const credentials = decryptCredentials(encryptedCredentials)
  //TODO do something with credentials
  const user = { id: 1, username: "me :3" } // Normally, i'd authenticate the user here
  const token = jwt.sign(user, "test") // Replace with process.env.SESSION_SECRET in production
  res.json({ token, user }).status(200)
})
// Catch all routes and return the index file
app.get("*", (req, res) => {
  console.log(join(distPath, "index.html"))
  res.sendFile(join(distPath, "index.html"))
})
//#endregion
const server = createServer(app)

server.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

//decrypt creds
function decryptCredentials(creds) {
  const secretKey = process.env.CREDENTIAL_SECRET_KEY
  const encryptedCredentials = creds

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedCredentials, secretKey)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch (err) {
    console.error("Decryption Error:", err)
    return null
  }
}
