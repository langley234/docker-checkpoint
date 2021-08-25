const PORT = process.env.PORT || 3001;
let conn = {
    host : 'docker-checkpoint_database_1',
      port : '5432',
      user : 'postgres',
      password : 'docker'
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
let migrations = require('./database/migrations/migrations');

//var knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
var knex = require('knex')({ client: 'pg', connection: conn });

knex.raw(`CREATE DATABASE docker_checkpoint_database`)
    .then( (result) => {
       knex.destroy();
    })
    .catch( (error) => {
        console.log(error);
    })

conn.database = 'docker_checkpoint_database';
var knex = require('knex')( {client : 'pg', connection: conn });

migrations.initializeDatabase(knex);

app.use(express.json());
app.use(cors());


app.get('/names/:nameID', (req, res) => {
    console.log(req.params);
    let id = parseInt(req.params.nameID);

    if (id === undefined || typeof id !== 'number') {
        res.status(400).send(`Improper Data received for GET request`);
    } else {
        knex.raw(`SELECT * FROM names WHERE name_id = ${id}`)
            .then( (result) => {
                if (result.rows.length <= 0) {
                    res.status(404).send(`Not Name with that ID found`);
                } else {
                    res.status(200).json(result.rows);
                }
            })
    }
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/ ...`);
});

module.exports = app;