"use client";
import { useState } from "react";
import { ClientInfo, InvoiceItem, SingleInvoice } from "@/lib/customTypes";
import { formateDate, isFutureDate } from "@/lib/functions";
import Link from "next/link";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { EditIcon } from "./Invoice/EditIcon";
type privateProps = {
  invoicesData: Array<SingleInvoice> | [];
  setData: Function;
};
const InvoiceList = ({ invoicesData, setData }: privateProps) => {
  const statusStyles = {
    green: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white",
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-white",
  };
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
    const { id } = invoice;
    const userConfirmation = window.confirm("Are you sure you want to update?");
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
            updateStatus(id);
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
      <div>
        <div className="flex justify-between items-center mt-8 mb-4">
          <div>
            <h2 className="text-emerald-500 text-5xl font-medium leading-tight">Invoices</h2>
          </div>
          <div>
            <Link
              type="button"
              href={`/dashboard/create-invoice`}
              className="inline-flex items-center justify-center px-8 py-2 border-2 border-emerald-500 text-base font-bold rounded-xl text-emerald-500 hover:bg-emerald-500 hover:text-white transition duration-300"
            >
              Create
            </Link>
          </div>
        </div>
        <div className="mt-12 overflow-x-auto">
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Shipping Price
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Date
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">
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
                  const dueInFuture = isFutureDate(dueDate);
                  const paidStatusClass = isPaid ? "green" : "yellow";
                  const tblRowClass = isPaid
                    ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    : `border-b ${
                        dueInFuture ? "bg-gray-50" : "bg-red-400 text-white"
                      } dark:bg-gray-800 dark:border-gray-700`;
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {clientData.name}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 ">
                        {totalPrice}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 ">
                        {shippingPrice}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {formateDate(createdAt)}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {formateDate(dueDate)}
                      </td>
                      <td className="px-6 py-4 w-30 text-center">
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${statusStyles[paidStatusClass]}`}
                        >
                          <span
                            onClick={() => {
                              if (!isPaid) {
                                handleConfirmation(elem);
                              }
                            }}
                          >
                            {isPaid ? "paid" : "unpaid"}
                          </span>
                          {!isPaid && <EditIcon />}
                          
                        </div>
                      </td>
                          <td className="px-6 py-4">
                         <span
                          className={`font-medium ${
                            dueInFuture ? "text-blue-600" : "text-white"
                          } dark:text-blue-500 hover:underline hover:cursor-pointer`}
                          onClick={() => openModal(elem)}
                        >
                          View
                        </span>
                        <Link
                          className={`ml-3 font-medium ${
                            dueInFuture ? "text-blue-600" : "text-white"
                          } dark:text-blue-500 hover:underline hover:cursor-pointer`}
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
