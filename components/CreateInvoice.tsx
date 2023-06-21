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
  console.log(`isEditMode = ${isEditMode}`)
  console.log(`invoiceData ======================>`)
  console.log(invoiceData)
  let customerInforForEdit = null;
  let itemsforForEdit = null;
  let shippingAmount: number = 0;
  if (isEditMode && invoiceData) {
  console.log(`Parsing Data ======================>`)

    customerInforForEdit = JSON.parse(invoiceData.clientInformation);
    console.log(customerInforForEdit);
    itemsforForEdit = JSON.parse(invoiceData.items);
    shippingAmount = invoiceData.shippingPrice;
  }
  const showShippingTb = shippingAmount > 0;
  const defaulfItem: InvoiceItem[] = [{ name: "", price: 0, qty: 0 }];
  const defaultClientInfo: ClientInfo = {
    name: customerInforForEdit ? customerInforForEdit.name : "",
    email: customerInforForEdit ? customerInforForEdit.email : "",
    phoneNumber: customerInforForEdit ? customerInforForEdit.phoneNumber : "",
    dueDate: customerInforForEdit ? customerInforForEdit.dueDate : "",
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
      <div className="px-2">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
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
                  className="md:ml-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none mt-2 md:mt-auto"
                >
                  <MinusCircleIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="border my-2 border-gray-300 block md:hidden"></div>
            </div>
          ))}
          <div className="flex mb-4">
            <button
              onClick={addItem}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
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
