const express = require('express')
let morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
    {
        name: "Arto Hellas",
        number: "123",
        id: "1"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: "2"
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: "3"
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: "4"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    let date = new Date()
    response.send(
        `<div>Phonebook has info for ${persons.length} people</div>
         <br>${date}</br>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: 1000 * Math.floor(Math.random()),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)