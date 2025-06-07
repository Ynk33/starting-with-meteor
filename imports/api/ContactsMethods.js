import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';
import { check } from 'meteor/check';

Meteor.methods({
  'contacts.insert'(contact) {
    // Validate the contact data
    if (contact.name === '' || contact.email === '' || contact.imageURL === '') {
        // Type check to ensure contact is an object
        check(contact, {
            name: String,
            email: String,
            imageURL: String,
        });

        // If any field is empty, throw an error with a detailed message
        let errors = [];
        
        if (contact.name === '') {
            errors.push('Name cannot be empty');
        }
        if (contact.email === '') {
            errors.push('Email cannot be empty');
        }
        if (contact.imageURL === '') {
            errors.push('Image URL cannot be empty');
        }

        throw new Meteor.Error('Contact validation failed', 'Contact data is invalid', { errors });
    }

    // Insert the contact into the ContactsCollection
    ContactsCollection.insertAsync({
      ...contact,
      archived: false, // Default to not archived
      createdAt: new Date(), // Add a timestamp for when the contact was created
    });
  },

  'contacts.remove'(contactId) {
    // Type check to ensure contactId is a string
    check(contactId, String);

    // Remove the contact from the ContactsCollection
    ContactsCollection.removeAsync(contactId);
  },

  'contacts.archive'(contactId) {
    // Type check to ensure contactId is a string
    check(contactId, String);

    // Archive the contact by setting an 'archived' field to true
    ContactsCollection.updateAsync(contactId, {
      $set: { archived: true },
    });
  },
});