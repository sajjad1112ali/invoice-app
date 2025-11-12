import { ClientInfo, invoiceSummary } from "@/lib/customTypes";
import React from "react";

type privateProps = {
  invoiceSummaryDetails: invoiceSummary;
};
export const InvoiceSummary = ({ invoiceSummaryDetails }: privateProps) => {
  const { totalPrice, shippingPrice, subTotal } = invoiceSummaryDetails;
  return (
    <div className="block max-w-sm w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 m-auto p-6">
      <h5 className="mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
        Invoice Summary
      </h5>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Sub Total</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {subTotal}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {shippingPrice}
          </span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            Total Amount
          </span>
          <span className="text-green-600 dark:text-green-400 font-bold">
            {totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};
