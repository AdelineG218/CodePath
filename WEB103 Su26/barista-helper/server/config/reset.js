import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

import { pool } from "./database.js"

const createTable = async () => {
    console.log(process.env.PGHOST)

    const createTableQuery = `
    DROP TABLE IF EXISTS coffees;

    CREATE TABLE IF NOT EXISTS coffees (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        size VARCHAR(255) NOT NULL,
        milk VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL
    )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 table created successfully')
    } catch (err) {
        console.error('⚠️ error creating table', err)
    }
}

createTable()

// const seedTable = async () => {
//     await createTable()

//     for (const coffee of eventData) {
//         const insertQuery = {
//             text: 'INSERT INTO coffees (title, date, description, location_id) VALUES ($1, $2, $3, $4)'
//         }

//         const values = [
//             event.title,
//             event.event_date,
//             event.description,
//             event.location_id
//         ]

//         await pool.query(insertQuery, values, (err, res) => {
//             if (err) {
//                 console.error('⚠️ error inserting event', err)
//                 return
//             }

//             console.log(`✅ ${event.title} added successfully`)
//         })
//     }

//     for (const location of locationData) {
//         const insertQuery = {
//             text: 'INSERT INTO locations (name) VALUES ($1)'
//         }

//         const values = [
//             location.name
//         ]

//         await pool.query(insertQuery, values, (err, res) => {
//             if (err) {
//                 console.error('⚠️ error inserting location', err)
//                 return
//             }

//             console.log(`☑️ ${location.name} added successfully`)
//         })
//     }
// }

// seedTables()