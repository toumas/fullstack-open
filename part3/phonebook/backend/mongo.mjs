import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

// 1. Added the variable ${password}
// 2. Added the database name 'phonebookApp'
const url = `mongodb://mongodb_db_user:${password}@ac-tt8cehu-shard-00-00.0vfpwpd.mongodb.net:27017,ac-tt8cehu-shard-00-01.0vfpwpd.mongodb.net:27017,ac-tt8cehu-shard-00-02.0vfpwpd.mongodb.net:27017/phonebookApp?replicaSet=atlas-7q7cn8-shard-0&ssl=true&authSource=admin`

mongoose.set('strictQuery', false)

try {
  console.log('Connecting to MongoDB...')
  // family: 4 forces Node to use IPv4, avoiding the macOS/Node 20 ECONNRESET bug
  await mongoose.connect(url, { family: 4 })
  console.log('Connected successfully!')
} catch (error) {
  console.log('--- Connection Error ---')
  console.error(error.message)
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'John Doe',
  number: '0450123456',
})

try {
  await person.save()
  console.log('Person saved!')
} catch (error) {
  console.error('Error saving person:', error.message)
} finally {
  await mongoose.connection.close()
  console.log('Connection closed.')
}