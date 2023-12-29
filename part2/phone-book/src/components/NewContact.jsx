import { useState } from "react";
import contact from "../services/contact.js";
import { Message } from "./Message.jsx";

/* eslint-disable react/prop-types */
export const NewContact = ({ persons, newContact, updateScream }) => {
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [mesagge, setMessage] = useState(null);

  const onChacgeNewName = (event) => {
    setNewName(event.target.value);
  };
  const onchangeNewNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };
  const createContact = (event) => {
    event.preventDefault();
    if (!newName || !newPhoneNumber) return;

    const contactQuery = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (contactQuery) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updateContact = { name: newName, phone: newPhoneNumber };
        contact
          .updateContact(contactQuery.id, updateContact)
          .then(() => updateScream())
          .catch((err) => {
            setMessage({
              message: `information of ${contactQuery.name}  has already been removed from server (${err.message})`,
              type: "error",
            });
            updateScream();
            setTimeout(() => {
              setMessage(null);
            }, 2000);
          });
      }
      return;
    }
    const newContac = { name: newName, phone: newPhoneNumber };
    newContact(newContac);
    setNewName("");
    setNewPhoneNumber("");
    setMessage({ message: `Added ${newContac.name}`, type: "correct" });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  return (
    <>
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
        <Message bodyMessage={mesagge}></Message>
      </form>
    </>
  );
};
