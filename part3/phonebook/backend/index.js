import {config} from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import Person from './models/person.js'

config()
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) {
  return JSON.stringify(req['body'])
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (request, response) => {
  const count = (await Person.find({})).length
  response.send(`
    <main>
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    </main>`)
})

app.get('/api/persons', async (request, response) => {
  const people = await Person.find({})
  response.json(people)
})

app.post('/api/persons', async (request, response) => {
  const person = request.body
  if (!person.name || !person.number) {
    response.status(400).json({ error: 'name and number is required' })
    return
  }
  const newPerson = await Person.create(person)
  response.json(newPerson)
})

app.put('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id
  const numberObject = request.body
  if (!numberObject.number) {
    response.status(400).json({ error: 'number is required' })
    return
  }
  const updatedPerson = await Person.findByIdAndUpdate(id, numberObject, {returnDocument: 'after'})
  response.json(updatedPerson)
})

app.get('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const person = await Person.findById(id)
    if (person === null) {
      response.status(404).end()
      return
    }
    response.json(person)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const deletedPerson = await Person.findByIdAndDelete(id)
    if (deletedPerson === null) {
      response.status(404).end()
      return
    }
    response.status(204).end()
  } catch (error) {
    next(error) 
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
