if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const router = require('./routers')
// app.use(cors());
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use( router )
app.use(errorHandler)


// let whitelist = ['https://server.rio-rick.tech', 'http://localhost:5173', 'http://server.rio-rick.tech']
// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
// app.use(cors(corsOptions))





module.exports = app