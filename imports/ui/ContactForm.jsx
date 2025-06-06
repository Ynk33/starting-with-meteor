import React from 'react';
import { Meteor } from 'meteor/meteor';

export const ContactForm = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');

  const saveContact = () => {
    // Save the contact to the collection
    Meteor.call('contact.insert', {
      name,
      email,
      imageURL,
    }, (errorResponse) => {
      if (errorResponse) {
        // Handle the error if the save operation fails
        console.error('Error saving contact:', errorResponse);
        alert('Failed to save contact: ' + errorResponse.reason);
      } else {
        // Successfully saved the contact
        console.log('Contact saved successfully');
        // Clean up the form fields after saving
        cancelForm();
      }
    });
  }

  const cancelForm = () => {
    // Reset the form fields
    setName('');
    setEmail('');
    setImageURL('');
  }

  return (
    <>
      <form>
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Contact Form</h2>
            <p className="mt-1 text-sm/6 text-gray-600">Use this form to save a new contact in your contact list.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter the name of the contact"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter the email of the contact"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="imageURL" className="block text-sm/6 font-medium text-gray-900">
                  Image
                </label>
                <div className="mt-2">
                  <input
                    id="imageURL"
                    name="imageURLpostal-code"
                    type="text"
                    placeholder="Enter the image URL of the contact"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={cancelForm}
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={saveContact}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
