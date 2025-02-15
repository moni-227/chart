// routes/DataRouter.js
const express = require('express');
const router = express.Router();
const DataController = require('../controller/DataController');

// Route to get all data
router.get('/getdata', DataController.getAllData);
router.get('/distinct-values', DataController.getDistinctValues);


// Route to get data by ID
// router.get('/data/:id', DataController.getDataById);

// // Route to add new data
// router.post('/data', DataController.createData);

// // Route to update data by ID
// router.put('/data/:id', DataController.updateData);

// // Route to delete data by ID
// router.delete('/data/:id', DataController.deleteData);

module.exports = router;
