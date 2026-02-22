const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('body', function (req, res) {
  return JSON.stringify(req['body'])
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let data = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.send(`
    <main>
      <p>Phonebook has info for ${data.length} people</p>
      <p>${new Date()}</p>
    </main>`)
})

app.get('/api/persons', (request, response) => {
  response.json(data)
})

app.post('/api/persons', (request, response) => {
  const id = Math.random().toString().split('.')[1]
  const person = request.body
  if (!person.name || !person.number) {
    response.status(400).json({ error: 'name and number is required' })
    return
  }
  if (data.find(p => p.name === person.name)) {
    response.status(400).json({ error: 'name must be unique' })
    return
  }
  const newPerson = { ...person, id }
  data = data.concat(newPerson)
  response.json(newPerson)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = data.find(person => person.id === id)
  if (person === undefined) {
    response.status(404).end()
    return
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const deletedPerson = data.find(person => person.id === id)
  if (deletedPerson === undefined) {
    response.status(404).end()
    return
  }
  data = data.filter(person => person.id !== id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
