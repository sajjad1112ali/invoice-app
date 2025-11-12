"use client";
import { ClientInfo, InvoiceItem, SingleInvoice } from "@/lib/customTypes";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

import React, { useState } from "react";
import InvoicePDF from "@/components/InvoicePDF";
import { ClientInformation } from "./Invoice/ClientInformation";
type privateProps = {
  invoiceData?: SingleInvoice;
  isEditMode: boolean;
  id?: number;
};
function CreateInvoice({ invoiceData, isEditMode, id }: privateProps) {
  let customerInforForEdit = null;
  let itemsforForEdit = null;
  let shippingAmount: number = 0;
  if (isEditMode && invoiceData) {
    customerInforForEdit = JSON.parse(invoiceData.clientInformation);
    itemsforForEdit = invoiceData.items;
    shippingAmount = invoiceData.shippingPrice;
  }
  const showShippingTb = shippingAmount > 0;
  const defaulfItem: InvoiceItem[] = [{ name: "qqqqq", price: 1, qty: 400 }];
  const defaultClientInfo: ClientInfo = {
    name: customerInforForEdit ? customerInforForEdit.name : "cccc",
    email: customerInforForEdit ? customerInforForEdit.email : "aasasas",
    phoneNumber: customerInforForEdit ? customerInforForEdit.phoneNumber : "12121",
    dueDate: customerInforForEdit ? customerInforForEdit.dueDate : new Date(),
  };
  const defaultInvoiceItems = isEditMode ? itemsforForEdit : defaulfItem;
  const [items, setItems] = useState<InvoiceItem[]>(defaultInvoiceItems);
  const [showShipping, setShowShipping] = useState(showShippingTb);
  const [shipping, setShipping] = useState(shippingAmount);

  const [clientInfo, setClientInfo] = useState<ClientInfo>(defaultClientInfo);

  const addItem = () => {
    setItems([...items, ...defaulfItem]);
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
    setItems([...defaulfItem]);
    setClientInfo(defaultClientInfo);
    setShowShipping(false);
  };

  const handleCheckboxChange = () => {
    setShowShipping(!showShipping);
  };
  return (
    <>
      <div className="px-2 mt-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-emerald-500 text-5xl font-medium leading-tight mb-8">
            Invoices
          </h2>
          <ClientInformation
            clientInfo={clientInfo}
            handleClientInfoChange={handleClientInfoChange}
          />
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={showShipping}
                onChange={handleCheckboxChange}
                className=" mr-1"
              />
              Set Shipping
            </label>
          </div>
          {showShipping && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Shipping
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="shipping"
                value={shipping}
                onChange={(event) => setShipping(+event.target.value)}
              />
            </div>
          )}
          <div className="hidden md:flex">
            <p className="flex-1 px-4">Product</p>
            <p className="w-20">Price</p>
            <p className="w-20">Quantity</p>
          </div>
          {items.map((item, index) => (
            <div key={index} className="flex-none md:flex mb-4">
              <p className="block md:hidden">Product</p>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(event) => handleChange(event, index)}
                placeholder="Item Name"
                className="flex-none md:flex-1 border rounded-l px-4 py-2 focus:outline-none w-full md:w-auto "
              />
              <p className="block md:hidden">Price</p>
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={(event) => handleChange(event, index)}
                placeholder="Price"
                className="w-full md:w-20 border rounded-r px-4 py-2 focus:outline-none"
              />
              <p className="block md:hidden">Quantity</p>
              <input
                type="number"
                name="qty"
                value={item.qty}
                onChange={(event) => handleChange(event, index)}
                placeholder="Quantity"
                className="w-full md:w-20 border rounded-r px-4 py-2 focus:outline-none"
              />
              <div className="flex w-full md:width-20 justify-center">
                <button
                  onClick={() => removeItem(index)}
                  className="inline-flex items-center justify-center ml-2 px-3 py-3 border border-transparent text-base font-bold rounded-md shadow-xl text-white bg-red-500 hover:bg-red-400 transition duration-300 transform hover:scale-105"
                >
                  <MinusCircleIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="border my-2 border-gray-300 block md:hidden"></div>
            </div>
          ))}
          <div className="flex gap-4 mb-4">
            <button
              onClick={addItem}
              className="inline-flex items-center justify-center px-3 py-3 border border-transparent text-base font-bold rounded-md shadow-xl text-white bg-emerald-500 hover:bg-emerald-400 transition duration-300 transform hover:scale-105"
            >
              <PlusCircleIcon className="h-5 w-5" />
            </button>
            <InvoicePDF
              items={items}
              clientInfo={clientInfo}
              resetForm={resetForm}
              isEditMode={isEditMode}
              id={id}
              shipping={shipping}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateInvoice;
