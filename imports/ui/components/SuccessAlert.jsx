import React from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';

export const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className='rounded-md bg-green-50 p-4 mt-10'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <CheckCircleIcon className='h-5 w-5 text-green-400' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-green-800'>{message}</h3>
        </div>

        <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -px-15'>
                <button
                    type='button'
                    className='inline-flex rounded-md bg-green-50 p-1.5 text-sm font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
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