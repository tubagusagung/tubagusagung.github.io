const express = require('express');
const authController =  require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register );

router.post('/login', authController.login);

router.post('/dashboard', authController.dashboard);

router.post('/dashboardakjur', authController.dashboardakjur);

router.post('/dashboarddospem', authController.dashboarddospem);

router.post('/daftarpkl', authController.daftarpkl);



module.exports = router;