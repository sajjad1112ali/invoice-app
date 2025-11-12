import { ClientInfo } from "@/lib/customTypes";
import React from "react";

type privateProps = {
  clientInformationData: ClientInfo;
};
export const CustomerInformationCard = ({
  clientInformationData,
}: privateProps) => {
  const { name, email, phoneNumber } = clientInformationData;
  return (
    <div className="block max-w-sm w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 m-auto p-6">
      <h5 className="mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
        Customer Information
      </h5>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Name</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {name}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Email</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {email}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Phone Number</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {phoneNumber}
          </span>
        </div>
      </div>
    </div>
  );
};
