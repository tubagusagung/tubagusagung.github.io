const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.get('/dashboardakjur', (req, res) => {
    res.render('dashboardakjur');
});

router.get('/dashboarddospem', (req, res) => {
    res.render('dashboarddospem');
});

router.get('/daftarpkl', (req, res) => {
    res.render('daftarpkl')
});

module.exports = router;