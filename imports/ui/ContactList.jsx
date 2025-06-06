import React from 'react';
import { ContactsCollection } from '../api/ContactsCollection';
import { useTracker } from 'meteor/react-meteor-data';

export const ContactList = () => {
    const contacts = useTracker(() => {
        // This will automatically re-run when the ContactsCollection changes
        return ContactsCollection.find({}).fetch();
    });

    return (
        <>
            <div>
                <h3>Contact List</h3>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact._id}>
                            <span>{contact.name}</span>&nbsp;-&nbsp;
                            <span>{contact.email}</span>&nbsp;-&nbsp;
                            <span>{contact.imageURL}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}