import { useState } from "react";
import { QueryContact } from "./components/QueryContact";
import { NewContact } from "./components/NewContact";
import { Contact } from "./components/Contact";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [query, setQuery] = useState("");

  const newContact = (person) => {
    setPersons([...persons, person]);
  };
  const OnQueryPhone = (event) => {
    setQuery(event.target.value);
    const numbersFilter = persons.filter(
      (person) => person.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
    setPersons(numbersFilter);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <QueryContact query={query} OnQueryPhone={OnQueryPhone}></QueryContact>
      <NewContact newContact={newContact} persons={persons}></NewContact>
      <h2>Numbers</h2>
      <div>
        {persons &&
          persons.map((person, index) => (
            <Contact key={index} person={person}></Contact>
          ))}
      </div>
    </div>
  );
}

export default App;
