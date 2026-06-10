import express from 'express'
import storiesRouter from './routes/stories.js'

const app = express()
app.use('/public', express.static('./public'))
app.use('/scripts', express.static('./public/scripts'))
app.use('/stories', storiesRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">PlotTwist API</h1>')
})

// open by making a new tab with http://localhost:3001 on your web browser
const PORT = process.env.PORT || 3001
    
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})