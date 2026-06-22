import './dotenv.js'
import { pool } from "./database.js"
import eventData from '../data/events.js'
import locationData from '../data/locations.js'

const createTables = async () => {
    const createEventsTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date TIMESTAMP NOT NULL,
        location_id VARCHAR(255) NOT NULL
    )
    `

    const createLocationsTableQuery = `
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
    `

    try {
        const res = await pool.query(createEventsTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }

    try {
        const res = await pool.query(createLocationsTableQuery)
        console.log('🎉 locations table created successfully')
    } catch (err) {
        console.error('⚠️ error creating locations table', err)
    }
}

const seedTables = async () => {
    await createTables()

    for (const event of eventData) {
        const insertQuery = {
            text: 'INSERT INTO events (title, date, location_id) VALUES ($1, $2, $3)'
        }

        const values = [
            event.title,
            event.event_date,
            event.location_id
        ]

        await pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }

            console.log(`✅ ${event.title} added successfully`)
        })
    }

    for (const location of locationData) {
        const insertQuery = {
            text: 'INSERT INTO locations (name) VALUES ($1)'
        }

        const values = [
            location.name
        ]

        await pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err)
                return
            }

            console.log(`☑️ ${location.name} added successfully`)
        })
    }
}

seedTables()