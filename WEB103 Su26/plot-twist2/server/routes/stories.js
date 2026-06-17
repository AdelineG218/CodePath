import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import storyData from '../data/stories.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json(storyData)
})

router.get('/:storyId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/stories.html'))
})

export default router