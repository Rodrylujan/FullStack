const express = require('express');
const morgan = require('morgan');

const app = express();

// Definir un nuevo token llamado 'postData' que imprime los datos del cuerpo de la solicitud POST
morgan.token('type', function (req) { return req.headers['content-type'] });

// Configurar morgan con el formato 'tiny' y el nuevo token 'postData'
app.use(morgan('tiny', { stream: { write: (message) => console.log(`Hola gente: ${message}`) } }));

// Middleware para parsear datos del cuerpo en solicitudes POST
app.use(express.json());

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(phoneBook);
});

app.get('/api/persons/:id',(req,res) =>{
    const id = Number(req.params.id)
    const personQuery = phoneBook.find(person => person.id === id)
    if (personQuery) return res.json(personQuery)
    res.status(404).json("{message: person not found}")
})

app.delete('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    phoneBook = phoneBook.filter(person => person.id !== id)
    res.json(phoneBook)
})

app.post('/api/persons', (req, res) =>{
  const {name, number} = req.body
  if(!number || !name) return res.status(400).json({message: "empty fields"})

  const existPerson = phoneBook.some(person => person.name === name)

  if(existPerson) return res.status(400).json({message: "the person already  exist"})

  const id = Math.floor(Math.random() * 1000)
  const newPerson = {
    id,
    name,
    number
  }
  phoneBook.push(newPerson)
  res.json(phoneBook)
})

app.get("/info", (req, res) => {
  res.send(`<h2>Phonebook has info for ${phoneBook.length} people</h2><p>${new Date()}</p>`);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`The server running in port ${PORT}`);
});
