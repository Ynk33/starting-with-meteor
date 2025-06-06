import React from 'react';
import { ContactsCollection } from '../api/ContactsCollection';

export const ContactForm = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');

  const saveContact = () => {
    // Save the contact to the collection
    ContactsCollection.insert({
      name,
      email,
      imageURL
    });

    // Clean up the form fields after saving
    setName('');
    setEmail('');
    setImageURL('');
  }
  

  return (
    <form>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name' 
          name='name'
          value={name}
          placeholder='Enter your name'
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="imageURL">Profile picture</label>
        <input
          type='text'
          id='imageURL'
          name='imageURL'
          value={imageURL}
          placeholder='URL to your profile picture'
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>

      <div>
        <button type="button" onClick={saveContact}>Save contact</button>
      </div>
    </form>
  );
}
