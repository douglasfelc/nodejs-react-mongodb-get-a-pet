const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS
// To not give error when accessing the API in the same domain
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Import routes
const UserRoutes = require('./routes/UserRoutes')

// Routes
app.use('/users', UserRoutes)

app.listen(5000)
