import { InvoiceItem } from "@/lib/customTypes";
import { DateTime } from "luxon";

import Link from "next/link";
type privateProps = {
  items: Array<InvoiceItem>;
};
const InvoiceList = ({ invoicesData }) => {
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
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
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
              {invoicesData.map((elem: InvoiceItem, index: number) => {
                const { id, customerName, createdAt } = elem;
                const date = DateTime.fromISO(createdAt);
                const formattedDate = date.toFormat("LLL dd, yyyy");

                const isPaid = index % 2 === 0;
                const tblRowClass = isPaid
                  ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700";
                return (
                  <tr key={id} className={tblRowClass}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {customerName}
                    </th>
                    <td className="px-6 py-4 ">500</td>
                    <td className="px-6 py-4">{formattedDate}</td>
                    <td className="px-6 py-4">{createdAt}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`${
                          isPaid ? "bg-green-500" : "bg-red-500"
                        } text-white text-10 w-20 py-1 rounded inline-block text-center`}
                      >
                        {isPaid ? "paid" : "unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
