import React from "react";
import PropTypes from 'prop-types';
import ContactItem from "components/ContactItem";

// import s from './ContactList.module.css'


const ContactList = ({ contacts, deleteContact }) => {
    
    return (
        <ul>
            {contacts.map(({ id, name, number }) => {
                return (
                    <ContactItem
                    key={id}
                    name={name}
                    number={number}
                    contactId={id}
                    deleteContact={deleteContact}
                    />
                );
            })}   
        </ul>
    )
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;