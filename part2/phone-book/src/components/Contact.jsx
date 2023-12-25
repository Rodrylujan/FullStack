/* eslint-disable react/prop-types */

export const Contact = ({ person, deleteContact }) => {

  

  return (
    <div>{person.name} {person.phone} <button onClick={()=>deleteContact(person)}>delete</button></div>
  )
}
