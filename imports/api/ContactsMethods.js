import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';
import { check } from 'meteor/check';

Meteor.methods({
  'contact.insert'(contact) {
    // Validate the contact data
    if (contact.name === '' || contact.email === '' || contact.imageURL === '') {
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
      createdAt: new Date(), // Add a timestamp for when the contact was created
    });
  }
});