"use client";
import { useState } from "react";
import { ClientInfo, InvoiceItem, SingleInvoice } from "@/lib/customTypes";
import { formateDate } from "@/lib/functions";
import Link from "next/link";
import toast from "react-hot-toast";
import Modal from "./Modal";
type privateProps = {
  invoicesData: Array<SingleInvoice> | [];
  setData: Function
};
const InvoiceList = ({ invoicesData, setData }: privateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<SingleInvoice>();

  const openModal = (items: SingleInvoice) => {
    setInvoiceItems(items);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const updateStatus = (id: number) => {
    setData((prevData) => {
      const updatedData = prevData.map((object) => {
        if (object.id === id) {
          return {
            ...object,
            isPaid: !object.isPaid, // Toggle the isValid value
          };
        }
        return object;
      });
      return updatedData;
    });
  };
  const handleConfirmation = async (invoice: SingleInvoice) => {
    const { id } = invoice
    const userConfirmation = window.confirm(
      "Are you sure you want to update?" +id
    );
    if (userConfirmation) {
      try {
        // Make the API call here
       
        
        fetch(`/api/invoice/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (res) => {
          // setLoading(false);
          const data = await res.json();
          
          const { id } = data;
          if (res.status === 200) {
            updateStatus(id)
          } else {
            const { error } = await res.json();
            toast.error(error);
          }
        });

        // Process the API response
        // ...
      } catch (error) {
        // Handle any errors that occurred during the API call
        // ...
      }
    }
  };
  return (
    <>
      <div className="sm:px-5">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-5xl font-medium leading-tight">Invoices</h2>
          </div>
          <div>
            <Link
              type="button"
              href={`/dashboard/create-invoice`}
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Create
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Shipping Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {invoicesData.map((elem: SingleInvoice) => {
                const {
                  id,
                  clientInformation,
                  dueDate,
                  createdAt,
                  items,
                  isPaid,
                  shippingPrice,
                  totalPrice,
                } = elem;
                const clientData: ClientInfo = JSON.parse(clientInformation);

                const tblRowClass = isPaid
                  ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700";
                return (
                  <tr key={id} className={tblRowClass}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {clientData.name}
                    </th>
                    <td className="px-6 py-4 ">{totalPrice}</td>
                    <td className="px-6 py-4 ">{shippingPrice}</td>
                    <td className="px-6 py-4">{formateDate(createdAt)}</td>
                    <td className="px-6 py-4">{formateDate(dueDate)}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`flex justify-around ${
                          isPaid ? "bg-green-500" : "bg-red-500"
                        } text-white text-10 w-20 py-1 rounded inline-block text-center`}
                        onClick={() => {
                          if (!isPaid) {
                            handleConfirmation(elem);
                          }
                        }}
                      >
                        <span>{isPaid ? "paid" : "unpaid"}</span>

                       {
                        !isPaid && (<svg
                          fill="none"
                          className="w-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          ></path>
                        </svg>)
                       } 
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
                        onClick={() => openModal(elem)}
                      >
                        View
                      </span>
                      <Link
                        className="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
                        href={`/dashboard/update-invoice/${id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          invoiceDetails={invoiceItems}
        />
      </div>
    </>
  );
};

export default InvoiceList;
