import { InvoiceItem } from "@/lib/customTypes";

type privateProps = {
  invoiceItems: string;
  isOpen: boolean;
  closeModal: Function;
};
const Modal = ({ isOpen, closeModal, invoiceItems }: privateProps) => {
  const invoiceItemsData: InvoiceItem[] = invoiceItems ? JSON.parse(invoiceItems) : [];

  return (
    <div>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto px-7">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative w-full max-w-7xl max-h-full">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceItemsData.map((elem: InvoiceItem, index: number) => {
                            const { name, price, qty } = elem;
                            return (
                              <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {name}
                                </th>
                                <td className="px-6 py-4">{price}</td>
                                <td className="px-6 py-4">{qty}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
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
