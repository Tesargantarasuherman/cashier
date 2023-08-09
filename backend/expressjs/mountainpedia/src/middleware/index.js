let express = require('express');
let auth = require('./auth');
let verification = require('./verification');

let router = express.Router();
// daftarkan menu registrasi

router.post('/api/v1/register',auth.registrasi);
router.post('/api/v1/login',auth.login);
router.post('/api/v1/verification',auth.verificationToken);

// alamat yang perlu otorisasi
// router.get('/api/v1/admin',verification(2),auth.admin)
// router.post('/api/v1/user/profile',verification(1),auth.admin)

module.exports = router;