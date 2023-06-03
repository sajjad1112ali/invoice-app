import { ClientInfo, invoiceSummary } from "@/lib/customTypes";
import React from "react";

type privateProps = {
  invoiceSummaryDetails: invoiceSummary;
  };
export const InvoiceSummary = ({invoiceSummaryDetails}: privateProps) => {
    const { 
      totalPrice,
      shippingPrice,
      subTotal,
    } = invoiceSummaryDetails;
   return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-auto">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Invoice Summary
      </h5>
      <div>
      <div className="flex justify-between">
        <div>Sub Total</div>
        <div className="font-bold">{subTotal}</div>
      </div>
      <div className="flex justify-between">
        <div>Shipping</div>
        <div className="font-bold">{shippingPrice}</div>
      </div>
      <div className="flex justify-between">
        <div>Total Amount</div>
        <div className="font-bold">{totalPrice}</div>
      </div>
      </div>
    </div>
  );
};
