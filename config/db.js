// Load Dependency
const mongoose = require('mongoose')

// MongoDB Connection
mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    const db = mongoose.connection
    console.log(
      `MongoDB Connected to Database: ${db.name} at host ${db.host} on Port: ${db.port}`
    )
  })
  .catch((err) => {
    console.log('MongoDB not Connected' + err)
  })
