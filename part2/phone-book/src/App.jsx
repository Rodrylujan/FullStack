import { useEffect, useState } from "react";
import { QueryContact } from "./components/QueryContact";
import { NewContact } from "./components/NewContact";
import { Contact } from "./components/Contact";
import axios from 'axios'


function App() {
  const [persons, setPersons] = useState();
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/persons").then( response =>{
      const data = response.data
      setPersons(data)
    }).catch(err=>{
      console.log(`se produjo un errro ${err}`)
    })
  }, [])
  

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
