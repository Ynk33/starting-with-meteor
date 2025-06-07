import React, { memo } from "react";

export const ContactItem = memo(({ contact, onArchive }) => {
  const handleArchive = () => {
    if (onArchive) {
      onArchive(contact._id);
    }
  };

  return (
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
                onClick={() => handleArchive(contact._id)}
                className="inline-flex items-center cursor-pointer shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
                Archive
            </button>
        </div>
    </li>
  );
});