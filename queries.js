const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'pass',
  port: 5432,
})

const getItems = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getItemById = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createItem = (req, res) => {
  const { name, email} = req.body
  
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Item added with ID: ${results.insertId}`)
  })
}

const updateItem = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email} = req.body
  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Item modified with ID: ${id}`)
    }
  )
}

const deleteItem = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Item deleted with ID: ${id}`)
  })
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
}
