import { ClientInfo } from "@/lib/customTypes";
import React from "react";

type privateProps = {
    clientInformationData: ClientInfo;
  };
export const CustomerInformationCard = ({clientInformationData}: privateProps) => {
    const { name, email, phoneNumber} = clientInformationData;
   return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-auto">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Customer Information
      </h5>
      <div>
      <div className="flex justify-between">
        <div>Name</div>
        <div className="font-bold">{name}</div>
      </div>
      <div className="flex justify-between">
        <div>Email</div>
        <div className="font-bold">{email}</div>
      </div>
      <div className="flex justify-between">
        <div>Phone Number</div>
        <div className="font-bold">{phoneNumber}</div>
      </div>
      </div>
    </div>
  );
};
