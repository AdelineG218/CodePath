import { pool } from "../config/database.js"

const getCoffees = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM coffees ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getCoffeeById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query(
            'SELECT * FROM coffees WHERE id = $1',
            [id]
        );
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Coffee not found" });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const createCoffee = async (req, res) => {
  try {
      const { type, size, milk, price } = req.body
      const results = await pool.query(`
          INSERT INTO coffees (type, size, milk, price)
          VALUES($1, $2, $3, $4)
          RETURNING *`,
          [type, size, milk, price]
      )

      res.status(201).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const updateCoffee = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const { type, size, milk, price } = req.body
      const results = await pool.query(`
          UPDATE coffees SET type = $1, size = $2, milk = $3, price = $4 WHERE id = $5 RETURNING *`,
          [type, size, milk, price, id]
      )
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const deleteCoffee = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM coffees WHERE id = $1', [id])
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

export default { getCoffees, getCoffeeById, createCoffee, updateCoffee, deleteCoffee }