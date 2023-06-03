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
  [key: string]: any;

};


export type SingleInvoice = {
  id: number;
  items: string;
  shippingPrice: number;
  totalPrice: number;
  clientInformation: string;
  createdAt: string;
  userId: Function;
  isPaid:  boolean
};

export type invoiceSummary = {
  totalPrice: number;
  shippingPrice: number;
  subTotal: number;
};