// import { Component} from "react";
import { useState, useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import s from './App.module.css'

const exmConatcts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(exmConatcts);
  const [filter, setFilter] = useState('');
  const noSetLocalStorage = useRef(true);

  useEffect(() => {
    const contactsStor = localStorage.getItem('contacts');
    const parsetContacts = JSON.parse(contactsStor);
    if (parsetContacts !== null) {
      setContacts(parsetContacts)
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
    if (
      contacts.find(contact => {
        return contact.name.toLowerCase().trim() === newContacts.name.toLowerCase().trim();
      })
    ) {
      alert(`${newContacts.name} is already in contacts`);
      return;
    }
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





