const express = require('express');
const router = express.Router();
// Import pool
const pool = require('../modules/pool.js');

// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "koala" ORDER BY "id";`;
    pool.query(queryText).then(result => {
    res.send(result.rows);
    }).catch(error => {
        console.log('error getting koalas', error);
        res.sendStatus(500);
});
});


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
router.put('/ready/:id', (req, res) => {
    console.log('Putting ready koala here', req.params.id);
    let id = req.params.id;
    let queryText = `UPDATE "koala" SET "ready"= NOT "ready" WHERE "id"=$1;`;

    // if (ready === 'true') {
    //     queryText = `UPDATE "koala" SET "ready"=$1 WHERE "id"=$2;`;
    // } else {
    //     res.sendStatus(500);
    // }

    pool.query(queryText, [id]).then((response) => {
        console.log(response)
        res.send(response.rows);
    }).catch(err => {
        console.log('got an error', err)
        res.sendStatus(500);
    });
});

// PUT to edit whole koalas.
router.put('/edit/:id', (req, res) => {

});

// GET for GETTing  single koalas
router.get('/:id', (req, res) => {
    let reqId = req.params.id
    console.log('this is what we are selecting', reqId);
    let queryText = `SELECT * FROM "koala" WHERE "id"=$1`
  
    pool.query(queryText, [reqId]).then(result => {
      res.send(result.rows)
    }).catch((error) => {
      console.log('got an error', error)
      res.sendStatus(500);
    })
  })

// DELETE
router.delete('/:id', (req, res) => {
    // Sanitizable text for SQL query.
    const queryText = 'DELETE FROM "koala" WHERE "id" = $1';
    
    pool.query(queryText, [req.params.id]).then(result => {
        console.log('Koala freaking deleted!');
        res.sendStatus(204);
    }).catch(err => {
        console.log('Koala deletion error!', err);
        res.sendStatus(500);
    })
})

module.exports = router;