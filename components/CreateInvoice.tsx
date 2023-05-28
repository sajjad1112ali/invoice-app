"use client";
import { InvoiceItem } from "@/lib/customTypes";
import React, { useState } from "react";
import InvoicePDF from "@/components/InvoicePDF";

function CreateInvoice() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { name: "", price: 0, qty: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { name: "", price: 0, qty: 0 }]);
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

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
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
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Add Item
      </button>
        <InvoicePDF items={items} />
    </div>
  );
}

export default CreateInvoice;
