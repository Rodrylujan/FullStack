import { useState } from "react";

/* eslint-disable react/prop-types */
export const NewContact = ({ persons,newContact }) => {
    
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const onChacgeNewName = (event) => {
    setNewName(event.target.value);
  };
  const onchangeNewNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };
  const createContact = (event)=>{
    event.preventDefault();
    if (!newName || !newPhoneNumber) return;

    const existe = persons.some((persona) => persona.name === newName);

    if (existe) {
      alert(`${newName} is al ready added to phonebook`);
      return;
    }
    const newContac = { name: newName, phone: newPhoneNumber };
    newContact(newContac)
    setNewName("");
    setNewPhoneNumber("");
  }
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
