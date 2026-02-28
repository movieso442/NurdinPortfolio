const express = require('express');
const router = express.Router();
const CertificateController = require('../controllers/certificateController');
const { verifyToken } = require('../middleware/auth');

router.get('/my', verifyToken, CertificateController.getMyCertificates);
router.post('/issue', verifyToken, CertificateController.issueCertificate);
router.get('/verify/:code', CertificateController.verifyCertificate);

module.exports = router;
