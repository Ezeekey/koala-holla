const express = require('express');
const router = express.Router();

// Import pool
const pool = require('../modules/pool.js');

// DB CONNECTION


// GET



// POST
router.post('/' ,(req, res) => { // req should be {name, gender, age, ready, notes}
    // Sanitizable text for SQL query.
    const queryText = 'INSERT INTO "koala" (name, gender, age, ready, notes) VALUES ($1, $2, $3, $4, $5)';

    // Contacting database.
    pool.query(queryText, [req.body.name, req.body.gender, req.body.age, req.body.ready, req.body.notes]).then(result => {
        console.log('Adding koala', req.body);
        res.sendStatus(201);
    }).catch(err => {
        console.log('POST Koala error!', err);
        res.sendStatus(500);
    })
});

// PUT READY

// PUT EDIT

// DELETE

module.exports = router;