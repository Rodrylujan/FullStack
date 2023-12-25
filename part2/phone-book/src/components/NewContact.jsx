import { useState } from "react";
import contact from "../services/contact.js";

/* eslint-disable react/prop-types */
export const NewContact = ({ persons, newContact, updateScream }) => {
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const onChacgeNewName = (event) => {
    setNewName(event.target.value);
  };
  const onchangeNewNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };
  const createContact = (event) => {
    event.preventDefault();
    if (!newName || !newPhoneNumber) return;

    const contactQuery = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (contactQuery) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updateContact = {name:newName ,phone: newPhoneNumber}
        contact.updateContact(contactQuery.id,updateContact).then(() => updateScream());
      }
      return;
    }
    const newContac = { name: newName, phone: newPhoneNumber };
    newContact(newContac);
    setNewName("");
    setNewPhoneNumber("");
  };
  return (
    <form onSubmit={createContact}>
      <h2>add anew </h2>
      <div>
        name: <input value={newName} onChange={onChacgeNewName} />
      </div>
      <div>
        phone: <input value={newPhoneNumber} onChange={onchangeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
