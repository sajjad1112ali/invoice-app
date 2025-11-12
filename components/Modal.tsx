import {
  InvoiceItem,
  SingleInvoice,
  ClientInfo,
  invoiceSummary,
} from "@/lib/customTypes";
import { CustomerInformationCard } from "./Invoice/CustomerInformationCard";
import { InvoiceSummary } from "./Invoice/InvoiceSummary";
import InvoicePDF from "./InvoicePDF";

type privateProps = {
  isOpen: boolean;
  closeModal: Function;
  invoiceDetails: SingleInvoice | undefined;
};

const Modal = ({ isOpen, closeModal, invoiceDetails }: privateProps) => {
  if (!invoiceDetails) return null;
  console.log(`invoiceDetailsinvoiceDetails`)
  console.log(invoiceDetails)
  const invoiceItems: InvoiceItem[] = invoiceDetails?.items;
  const clientInformation = invoiceDetails?.clientInformation;
  const invoiceItemsData: InvoiceItem[] = invoiceItems
    ? invoiceItems
    : [];
  const clientInformationData: ClientInfo = clientInformation
    ? JSON.parse(clientInformation)
    : [];
  const { totalPrice, shippingPrice, id } = invoiceDetails;
  const subTotal: number = totalPrice - shippingPrice;
  const invoiceSummaryDetails: invoiceSummary = {
    totalPrice,
    shippingPrice,
    subTotal,
  };
  return (
    <div>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto px-7">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative w-full max-w-7xl max-h-full">
                {/* Modal Content */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 px-5 pb-6 pt-6 sm:p-8">
                  {/* Top Grid Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <CustomerInformationCard
                        clientInformationData={clientInformationData}
                      />
                    </div>
                    <div>
                      <InvoiceSummary
                        invoiceSummaryDetails={invoiceSummaryDetails}
                      />
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="relative overflow-x-auto border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        <tr>
                          <th scope="col" className="px-6 py-3 font-semibold">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 font-semibold">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 font-semibold">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceItemsData.map(
                          (elem: InvoiceItem, index: number) => {
                            const { name, price, qty } = elem;
                            return (
                              <tr
                                key={index}
                                className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                                >
                                  {name}
                                </th>
                                <td className="px-6 py-4">{price}</td>
                                <td className="px-6 py-4">{qty}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Footer Buttons */}
                  <div className="px-5 flex justify-end items-center gap-3 rounded-xl mt-8">
                    <button
                      type="button"
                      onClick={() => closeModal()}
                      className="inline-flex justify-center rounded-md bg-green-600 hover:bg-green-500 text-white px-4 py-2 text-sm font-semibold shadow-sm transition-colors"
                    >
                      Close
                    </button>
                    <InvoicePDF
                      items={invoiceItemsData}
                      clientInfo={clientInformationData}
                      downloadTriggeredFromModal={id}
                      isEditMode={false}
                      shipping={shippingPrice}
                      invoiceDetails={invoiceDetails}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
