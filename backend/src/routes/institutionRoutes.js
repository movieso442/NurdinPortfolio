const express = require('express');
const router = express.Router();
const InstitutionController = require('../controllers/institutionController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, InstitutionController.getAllInstitutions);
router.post('/', verifyToken, isAdmin, InstitutionController.createInstitution);
router.get('/:slug', verifyToken, InstitutionController.getBySlug);

module.exports = router;
