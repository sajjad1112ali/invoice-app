"use client";
import { ClientInfo, InvoiceItem } from "@/lib/customTypes";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

import React, { useState } from "react";
import InvoicePDF from "@/components/InvoicePDF";
import { ClientInformation } from "./Invoice/ClientInformation";

function CreateInvoice() {
  const defaulfItem: InvoiceItem = { name: "", price: 0, qty: 0 }
  const defaultClientInfo: ClientInfo = {
    name: "",
    email: "",
    phoneNumber: "",
  }
  const [items, setItems] = useState<InvoiceItem[]>([
    defaulfItem,
  ]);

  const [clientInfo, setClientInfo] = useState<ClientInfo>(defaultClientInfo);
  
  const addItem = () => {
    setItems([...items, defaulfItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const handleClientInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: string
  ) => {
    const { name, value } = event.target;
    const updatedItems = { ...clientInfo };
    updatedItems[name] = value;
    setClientInfo(updatedItems);
  };

  const resetForm = () => {
    setItems([defaulfItem]);
    setClientInfo(defaultClientInfo);
  };
  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
        <ClientInformation clientInfo={clientInfo} handleClientInfoChange={handleClientInfoChange}/>
        <div className="flex">
          <p className="flex-1 px-4">Product</p>
          <p className="w-20">Price</p>
          <p className="w-20">Quantity</p>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex mb-4">
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(event) => handleChange(event, index)}
              placeholder="Item Name"
              className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
            />
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(event) => handleChange(event, index)}
              placeholder="Price"
              className="w-20 border rounded-r px-4 py-2 focus:outline-none"
            />
            <input
              type="number"
              name="qty"
              value={item.qty}
              onChange={(event) => handleChange(event, index)}
              placeholder="Quantity"
              className="w-20 border rounded-r px-4 py-2 focus:outline-none"
            />
            <button
              onClick={() => removeItem(index)}
              className="ml-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              <MinusCircleIcon className="h-5 w-5" />
            </button>
          </div>
        ))}

        <div className="flex mb-4">
          <button
            onClick={addItem}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            <PlusCircleIcon className="h-5 w-5" />
          </button>
          <InvoicePDF items={items} clientInfo={clientInfo} resetForm={resetForm}/>
        </div>
      </div>
    </>
  );
}

export default CreateInvoice;
