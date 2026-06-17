import './dotenv.js'
import { pool } from './database.js'
import storyData from '../data/stories.js'

const createStoriesTable = async () => {
    try {
        const result = await pool.query('SELECT NOW()')
        console.log('Connected successfully!')
        console.log(result.rows)
    } catch (err) {
        console.error('Connection failed:', err)
    }

    const createTableQuery = `
    DROP TABLE IF EXISTS stories;

    CREATE TABLE IF NOT EXISTS stories (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishYear VARCHAR(4) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            wordCount VARCHAR(10) NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 stories table created successfully')
    } catch (err) {
        console.error('⚠️ error creating stories table', err)
    }
}

const seedStoriesTable = async () => {
    await createStoriesTable()

    for (const story of storyData) {
        const insertQuery = {
            text: 'INSERT INTO stories (title, author, publishYear, genre, wordCount) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [
            story.title,
            story.author,
            story.publishYear,
            story.genre,
            story.wordCount
        ]

        await pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting story', err)
                return
            }

            console.log(`✅ ${story.title} added successfully`)
        })
    }
}

seedStoriesTable()