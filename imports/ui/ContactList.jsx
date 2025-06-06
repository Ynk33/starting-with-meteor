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
            <div className="mt-16">
                <h3 className="text-xs uppercase tracking-wide font-semibold text-gray-500">Contact List</h3>
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
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}