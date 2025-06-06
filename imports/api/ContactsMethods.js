import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';
import { check } from 'meteor/check';

Meteor.methods({
  'contact.insert'(contact) {
    // Validate the contact data
    if (contact.name === '' || contact.email === '' || contact.imageURL === '') {
      throw new Meteor.Error('invalid-arguments', 'Contact data cannot be empty');
    }

    // Insert the contact into the ContactsCollection
    ContactsCollection.insertAsync({
      ...contact,
      createdAt: new Date(), // Add a timestamp for when the contact was created
    });
  }
});