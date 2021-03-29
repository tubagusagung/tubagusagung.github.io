const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.daftarpkl = (req, res) => {
    console.log(req.body);

    const {name, nim, semester, sks, proyek, alamat, obyek, waktuawal, waktuakhir} = req.body;

    db.query('SELECT nim FROM formpkl WHERE nim = ?', [nim], async (error, results) => {

        if(error){
            console.log(error);
        }

        if(results.length > 0) {
            return res.render('daftarpkl', {
                message: 'That NIM is already in use'
            })
        }else{

        }

        db.query('INSERT INTO formpkl SET ?', {name: name, nim: nim, semester: semester, sks: sks, proyek: proyek, alamat: alamat, obyek: obyek, waktuawal: waktuawal, waktuakhir: waktuakhir}, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('daftarpkl', {
                    message: 'daftar tersimpan'
                });
            }
        })

    })

}

exports.dashboarddospem = (req, res) => {

}

exports.dashboardakjur = (req, res) => {
    console.log(req.body);

    const {name, nim, semester, sks, proyek, alamat, obyek, waktuawal, waktuakhir} = req.body;

    db.query('SELECT * FROM formpkl', (error, results) => {
        console.log(results);
    })

}

exports.dashboard = (req, res) => {
    
}

exports.login = async (req, res) => {
    try{
        const {email, password, level} = req.body;

        if(!email || !password){
            return res.status(400).render('login', {
                message:'Please provide an email and password'
            })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0].password) ) ) {
                res.status(401).render('login', {
                    message: 'Email or Password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
            }
            
        })

        db.query('SELECT * FROM users WHERE level = ?', [level], async (error, results) => {
        //const array = level["mahasiswa"] ; level["akademik jurusan"]; level["dosen pembimbing"];
           // console.log(results);

            if(!results || !level) {
                res.status(200).redirect('/dashboard');
            }

         
        // if(results.dashboardakjur == 'akademik jurusan') {
          //  return res.status(200).redirect("/dashboardakjur");
        //}
        })


    }catch(error){
        console.log(error);
    }
}


exports.register = (req, res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm, level} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        }else if(password !== passwordConfirm) {
            return res.render('register', {
                message: 'Password do not match'
            });
        }else{
            res.status(200).redirect("/login");
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword, level: level}, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
        })

    })

}