import mongoose from 'mongoose'
import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const database_url = process.env.DBURL
const port = process.env.PORT

async function server() {
  try {
    await mongoose.connect(database_url as string)

    app.listen(port, () => {
      console.log(`Server running on port ${port} 🏃🏽‍♂️‍➡️`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()
