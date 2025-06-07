import React from 'react';
import { ContactsCollection } from '../api/ContactsCollection';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ErrorAlert } from './components/ErrorAlert';
import { SuccessAlert } from './components/SuccessAlert';
import { ContactItem } from './components/ContactItem';

export const ContactList = () => {
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState("");

    const isLoading = useSubscribe('allContacts');
    const contacts = useFind(() => ContactsCollection.find({}, { sort: { createdAt: -1 } }));

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

        setTimeout(() => {
            setError(null);
        }, 3000); // Clear the success message after 3 seconds
    }

    // Show a success message
    const showSuccess = (message) => {
        setSuccess(message);
        setError(null); // Clear any existing error message

        setTimeout(() => {
            setSuccess("");
        }, 3000); // Clear the success message after 3 seconds
    }

    if (isLoading()) {
        return (
            <div className="mt-16">
                <h3 className="text-xs uppercase tracking-wide font-semibold text-gray-500">Loading contacts...</h3>
            </div>
        );
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
                        <ContactItem contact={contact} onRemove={removeContact} key={contact._id} />
                    ))}
                </ul>
            </div>
        </>
    );
}