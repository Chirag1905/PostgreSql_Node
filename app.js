const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const db = require ( "./db")

app.use(express.json());
app.use(cors());

app.get('/', db.readRecord);
app.post('/', db.createRecord);
app.put('/', db.updateRecord);
app.delete('/', db.deleteRecord);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))