import { useState, useEffect, useRef } from "react";
import localBase from "../service/localBase";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import s from './App.module.css'

export function App() {
  const [contacts, setContacts] = useState(localBase);
  const [filter, setFilter] = useState('');
  const noSetLocalStorage = useRef(true);

  useEffect(() => {
    const contactsStor = localStorage.getItem('contacts');
    const parsetContacts = JSON.parse(contactsStor);
    setContacts(parsetContacts)
    if (parsetContacts !== null) {
    }
  }, []);
  
  useEffect(() => {
    if (noSetLocalStorage.current) {
      noSetLocalStorage.current = false;
      return;
    }
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  
  const addContact = (newContacts) => {
    const newContact = contacts.find(contact => {
      return contact.name.toLowerCase().trim() === newContacts.name.toLowerCase().trim();
    });
    if (newContact) {
      alert(`${newContacts.name} is already in contacts`);
      return;
    };
    setContacts(prevContacts => [...prevContacts, newContacts]);    
  };
    
  const onChangeFilter = evt => {
      setFilter(evt.currentTarget.value);    
  };

  const findContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
      <div className={s.container}>
        <h2>Phonebook</h2>
        <ContactForm  addContact={addContact} />
        <h2>Contacts</h2>
        <Filter onChangeFilter={onChangeFilter} filter={filter} />
        <ContactList
          contacts={findContact()}
          deleteContact={handleDeleteContact}
           /> 
      </div>
    );
};





