"use client";
import React, { useState } from "react";

import { ClientInfo } from "@/lib/customTypes";
type privateProps = {
  clientInfo: ClientInfo;
  handleClientInfoChange: Function;
};
export const ClientInformation = ({clientInfo, handleClientInfoChange}: privateProps) => {


  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          value={clientInfo.name}
          onChange={(event) => handleClientInfoChange(event, "name")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="email"
          value={clientInfo.email}
          onChange={(event) => handleClientInfoChange(event, "email")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="phoneNumber"
          value={clientInfo.phoneNumber}
          onChange={(event) => handleClientInfoChange(event, "phoneNumber")}
        />
      </div>
    </div>
  );
};
