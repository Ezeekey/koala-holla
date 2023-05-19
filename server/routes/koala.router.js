const express = require('express');
const router = express.Router();
let pool = require('../modules/pool')
// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "koala";`;
    pool.query(queryText).then(result => {
    res.send(result.rows);
    console.log(result);
    }).catch(error => {
        console.log('error getting koalas', error);
        res.sendStatus(500);
});
});


// POST


// PUT READY
router.put('/ready/:id', (req, res) => {
    console.log(req.body)
    let id = req.params.id;
    let queryText = `UPDATE "koala" SET "ready"=true WHERE "id"=$1;`;

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



// PUT EDIT

// DELETE

module.exports = router;