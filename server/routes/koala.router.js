const express = require('express');
const router = express.Router();
let pool = require('../modules/pool')
// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let query = `SELECT * FROM "koala";`;
    pool.query(query).then(result => {
    res.send(result.rows);
    console.log(result);
    }).catch(error => {
        console.log('error getting books', error);
        res.sendStatus(500);
});
});


// POST


// PUT READY

// PUT EDIT

// DELETE

module.exports = router;