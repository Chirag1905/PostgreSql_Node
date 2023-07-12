const Pool = require("pg").Pool;

// Create a new connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "chirag",
  password: "olivestart72",
  port: 5432,
});

const conn = pool;

// Get records
const readRecord = (req, res) => {
  conn.query("SELECT * FROM number", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result.rows);
    //   console.log(result);
    }
  });
};

// Create a new record
const createRecord = (req, res) => {
  const { name } = req.body;
  conn.query(
    "INSERT INTO number (name) VALUES ($1) RETURNING *",
    [name],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(result.rows);
        // console.log(result);
      }
    }
  );
};

// Update a record
const updateRecord = (req, res) => {
  const { id, name } = req.body;
    conn.query(
    "UPDATE number SET name = $1 WHERE number_id = $2 RETURNING *",
    [name, id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(result.rows);
        // console.log(result);
      }
    }
  );
};

//Delete a record   
const deleteRecord = (req, res) => {
  const id = req.body.id;
  conn.query("DELETE FROM number WHERE number_id = $1",[id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json({
            message: "Record deleted successfully",
          });
        // console.log(result);
      }
    }
  );
};

module.exports = { createRecord, readRecord, updateRecord, deleteRecord };