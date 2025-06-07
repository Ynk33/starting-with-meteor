import React from 'react';
import { ContactsCollection } from '../api/ContactsCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ErrorAlert } from './components/ErrorAlert';
import { SuccessAlert } from './components/SuccessAlert';

export const ContactList = () => {
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState("");

    const contacts = useTracker(() => {
        // This will automatically re-run when the ContactsCollection changes
        return ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    });

    const removeContact = (contactId) => {
        Meteor.call('contacts.remove', contactId, (error) => {
            if (error) {
                showError(error);
            } else {
                showSuccess("Contact removed successfully!");
            }
        });
    }

    // Show an error message
    const showError = (error) => {
        console.error(error);
        setSuccess(""); // Clear success message if there is an error
        setError(error);
    }

    // Show a success message
    const showSuccess = (message) => {
        setSuccess(message);
        setError(null); // Clear any existing error message

        setTimeout(() => {
        setSuccess("");
        }, 5000); // Clear the success message after 3 seconds
    }

    return (
        <>
            <div className="mt-16">
                <h3 className="text-xs uppercase tracking-wide font-semibold text-gray-500">Contact List</h3>
                
                {error && (
                    <ErrorAlert error={error} onClose={() => setError(null)} />
                )}
    
                {success && (
                    <SuccessAlert message={success} onClose={() => setSuccess("")} />
                )}
                
                <ul role="list" className="divide-y divide-gray-100 py-4">
                    {contacts.map((contact) => (
                        <li key={contact._id} className="flex border-y border-gray-200 justify-between gap-x-6 py-2">
                            <div className="flex min-w-0 gap-x-4">
                                <img alt="" src={contact.imageURL} className="size-12 flex-none rounded-full bg-gray-50" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-gray-900">{contact.name}</p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-500">{contact.email}</p>
                                </div>
                            </div>

                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                { contact.createdAt && (
                                    <p className="text-xs/5 text-gray-500">
                                        Created on <time dateTime={contact.createdAt}>{contact.createdAt.toDateString()}</time> at <time dateTime={contact.createdAt}>{contact.createdAt.toLocaleTimeString()}</time>
                                    </p>
                                )}
                            </div>

                            <div>
                                <button
                                    type='button'
                                    onClick={() => removeContact(contact._id)}
                                    className="inline-flex items-center cursor-pointer shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}