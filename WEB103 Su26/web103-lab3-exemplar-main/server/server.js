import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import giftsRouter from './routes/gifts.js'

// initalizie express
const app = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(cors())
app.use(express.json())


// routes
app.use('/gifts', giftsRouter)


// listens for app on port 300 for connections
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`CONNECTED. Listing on port ${PORT}`)
})
