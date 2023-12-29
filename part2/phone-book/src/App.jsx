import { useEffect, useState } from "react";
import { QueryContact } from "./components/QueryContact";
import { NewContact } from "./components/NewContact";
import { Contact } from "./components/Contact";
import contact from "./services/contact.js";

function App() {
  const [persons, setPersons] = useState();
  const [query, setQuery] = useState("");

  useEffect(() => {
    contact.getAllContact().then((data) => setPersons(data));
  }, []);

  const newContact = (person) => {
    contact.createContact(person).then((returnedNote) => {
      setPersons(persons.concat(returnedNote));
      setQuery("");
    });
  };

  const updateScream = () => {
    contact.getAllContact().then((data) => setPersons(data));
  };

  const deleteContact = (user) => {
    if (!window.confirm(`Delete ${user.name}`)) return;
    contact.deleteContact(user.id).then((response) => {
      if (response.statusText === "OK") {
        contact.getAllContact().then((data) => setPersons(data));
      } else {
        alert("Se detecto un proble al eliminar el conacto");
      }
    });
  };

  const OnQueryPhone = (event) => {
    setQuery(event.target.value);
    contact.getAllContact().then((data) => {
      if (!event.target.value) {
        setPersons(data);
        return;
      }
      const numbersFilter = data.filter(
        (person) => person.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
      setPersons(numbersFilter);
    });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <QueryContact query={query} OnQueryPhone={OnQueryPhone}></QueryContact>
      <NewContact
        newContact={newContact}
        persons={persons}
        updateScream={updateScream}
      ></NewContact>
      <h2>Numbers</h2>
      <div>
        {persons &&
          persons.map((person, index) => (
            <Contact
              key={index}
              person={person}
              deleteContact={deleteContact}
            ></Contact>
          ))}
      </div>
    </div>
  );
}

export default App;
