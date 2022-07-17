import { Component} from "react";
// import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import s from './App.module.css'

// const exmConatcts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

//export function App() {
//   const [contacts, setContacts] = useState(exmConatcts);
//   const [filter, setFilter] = useState('');
// }


export class App extends Component {
  
  state = {
    contacts: [
          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
          {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
          {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
          {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsetContacts = JSON.parse(contacts);
    if (parsetContacts) {
      this.setState({ contacts: parsetContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContacts) => {
    if (
      this.state.contacts.find(contact =>{
        return contact.name.toLowerCase().trim() === newContacts.name.toLowerCase().trim();
      })
      ) {
        alert(`${newContacts.name} is already in contacts`);
        return;
      }
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContacts],
      }));
    }
    
  onChangeFilter = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  findContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    // console.log(id);
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={s.container}>
        <h2>Phonebook</h2>
        <ContactForm  addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChangeFilter={ this.onChangeFilter} filter={filter} />
        <ContactList
          contacts={this.findContact()}
          deleteContact={this.handleDeleteContact}
           /> 
      </div>
    );
  }
};




