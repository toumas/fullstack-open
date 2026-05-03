// BOOKMARK: https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-13-3-14
import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3] || null
const number = process.argv[4] || null

const isNull = (v) => v === null
const isString = (v) => typeof v === 'string'

if(isString(name) && isNull(number)) {
  console.log('both name and number is required')
  process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@cluster0.5pfbzzu.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

await mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (isString(name) && isString(number)) {
  const newPerson = new Person({name, number})
  const result = await newPerson.save()
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  await mongoose.connection.close()
  process.exit(1)
}

console.log('phonebook:')

const result = await Person.find({})

result.forEach(({name, number}) => {
  console.log(`${name} ${number}`)
})

await mongoose.connection.close()
