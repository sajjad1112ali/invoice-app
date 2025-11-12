export type InvoiceItem = {
  name: string;
  price: number;
  qty: number;
  [key: string]: any;
};

export type ClientInfo = {
  name: string;
  email: string;
  phoneNumber: string;
  dueDate: string;
  [key: string]: any;

};


export type SingleInvoice = {
  id: number;
  items: InvoiceItem[];
  shippingPrice: number;
  totalPrice: number;
  clientInformation: ClientInfo;
  createdAt: string;
  dueDate: string;
  userId: Function;
  isPaid:  boolean
};

export type invoiceSummary = {
  totalPrice: number;
  shippingPrice: number;
};