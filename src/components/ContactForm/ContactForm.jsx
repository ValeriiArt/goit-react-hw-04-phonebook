import PropTypes from 'prop-types';
import { useState } from "react";
import { nanoid } from 'nanoid'
import s from './ContactForm.module.css'

export default function ContactForm({addContact}) {
  const nameInputId = nanoid(4);
  const numberInputId = nanoid(4);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const handleChange = e => {
    const { name, value } = e.currentTarget;
        
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContacts = {
      id: nanoid(5),
      name: name,
      number: number,
    };
    setName('');
    setNumber('');
    addContact(newContacts);
  };

  return (
    <div className={s.form }>
      <form onSubmit={handleSubmit}>
        <label className={s.formLabel} htmlFor={nameInputId}>
          Name
        </label>
          <input
          className={s.formInput}
          id={nameInputId}
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={s.formLabel} htmlFor={numberInputId}>
          Number
        </label>
          <input
          className={s.formInput}
          id={numberInputId}
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add Contact</button>
      </form>        
    </div>
  );  
};

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
}
