const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorMiddleware} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.ENV_PORT ?? 5000

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=> {
  res.status(200).json({message: "Welcome to the Support Desk API"}) 
})

app.use('/api/users', require('./routes/userRoutes'))
app.use(errorMiddleware)
app.listen(PORT, () => console.log(`Server Started on http://localhost:${PORT}`.yellow.underline))