import axios from "axios";

const URL_BASE = "http://localhost:3000/persons";

const getAllContact = async () => {
  const request = axios.get(URL_BASE);
  return request.then((response) => response.data);
};

const createContact = async (newContact) => {
  const request = axios.post(URL_BASE, newContact);
  return request.then((response) => response.data);
};

const deleteContact = async (id) => {
  const request = axios.delete(`${URL_BASE}/${id}`);
  return request.then((response) => response);
};

const updateContact = async(id,contactUpdate) => { 
  const request = axios.put(`${URL_BASE}/${id}`,contactUpdate)
  return request.then(response => response.data)
 }

export default { getAllContact, createContact, deleteContact ,updateContact };
