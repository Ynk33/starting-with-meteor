import React from 'react';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';

export const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className='rounded-md bg-red-50 p-4 mt-10'>
        <div className='flex'>
            <div className='flex-shrink-0'>
                <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
            </div>

            <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>{error.reason}</h3>
                <div className='mt-2 text-sm text-red-700'>
                    <ul role='list' className='list-disc pl-5 space-y-1'>
                        {error.details && error.details.errors && error.details.errors.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='ml-auto pl-3'>
                <div className='-mx-1.5 -px-15'>
                    <button
                        type='button'
                        className='inline-flex rounded-md bg-red-50 p-1.5 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                        onClick={onClose}
                    >
                        <span className='sr-only'>Dismiss</span>
                        <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}