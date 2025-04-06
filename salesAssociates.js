const express = require('express');
const { addAssociate, removeAssociate } = require('../controllers/salesAssociateController');
const router = express.Router();

// Add a sales associate to a store
router.post('/store/:storeId/associate', addAssociate);

// Remove a sales associate from a store
router.delete('/store/:storeId/associate/:associateId', removeAssociate);

module.exports = router;