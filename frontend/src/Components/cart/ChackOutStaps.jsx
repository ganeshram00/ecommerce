import React from 'react';
import { FiCheckCircle, FiShoppingCart, FiCreditCard } from 'react-icons/fi';

const ChackOutStaps = ({ activeDetails }) => {
    return (
        <div className="sm:w-[90%] m-auto p-4">
            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                {/* Step 1: Shipping Details */}
                <li
                    className={`flex md:w-full items-center ${
                        activeDetails >= 1 ? 'text-blue-600 dark:text-blue-500' : ''
                    } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
                >
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <FiCheckCircle className="w-4 h-4 me-2.5" />
                        Shipping <span className="hidden sm:inline-flex sm:ms-2">Details</span>
                    </span>
                </li>

                {/* Step 2: Confirm Order */}
                <li
                    className={`flex md:w-full items-center ${
                        activeDetails >= 2 ? 'text-blue-600 dark:text-blue-500' : ''
                    } after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
                >
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <FiShoppingCart className="w-4 h-4 me-2.5" />
                        Confirm <span className="hidden sm:inline-flex sm:ms-2">Order</span>
                    </span>
                </li>

                {/* Step 3: Payment */}
                <li
                    className={`flex items-center ${
                        activeDetails === 3 ? 'text-blue-600 dark:text-blue-500' : ''
                    }`}
                >
                    <span className="flex items-center bg-none">
                        <FiCreditCard className="w-4 h-4 me-2.5" />
                        Payment
                    </span>
                </li>
            </ol>
        </div>
    );
};

export default ChackOutStaps;
