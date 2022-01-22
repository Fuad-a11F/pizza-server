let express = require('express')
let app = express()
let cors =  require('cors')
const  PORT = process.env.PORT || 3001;
app.use(cors())
app.use(express.json())
var mysql = require('mysql');
// const nodemailer = require('nodemailer')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'pizza_product'
});

connection.connect( err => {
    if (err) console.log(err)
    else console.log('database has been created')
})

app.get('/pizza', (req, res) => {
    let query_string;

    if (req.query.type) {
        query_string = `SELECT * FROM pizza WHERE type='${req.query.type}' ORDER BY ${req.query._sort} LIMIT 8 OFFSET ${(req.query._page - 1)  *  8}`
    } else {
        query_string = `SELECT * FROM pizza ORDER BY ${req.query._sort} LIMIT 8 OFFSET ${(req.query._page - 1) *  8}`
    }

    connection.query(query_string, (err, result)  =>  {
        res.json(result)
    })
    
})

app.get('/pizza_pages', (req, res) => {
    let param = ''
    req.query.type ? param = `SELECT * FROM pizza WHERE type='${req.query.type}'` : param = `SELECT * FROM pizza`
    connection.query(param, (err, result)  =>  {
            res.json(result.length)
    })  
})

// app.post('/email', async (req, res) => {
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.mail.ru',
//         auth: {
//           user: 'fuad.gyulmamedov.2001@mail.ru',
//           pass: '23uT%lurUtRE',
//         },
//       })
      
//       let result = await transporter.sendMail({
//         from: 'fuad.gyulmamedov.2001@mail.ru',
//         to: 'fuad.fuad.1984@list.ru',
//         subject: 'Message from Node js (subject)',
//         text: 'This message was sent from Node js server (text).',
//         html:
//           'This <i>message</i> was sent from <strong>Node js</strong> server (html).',
//       })

//       res.status(200)
// })

app.listen(PORT, () => {
    console.log('Work')
})

