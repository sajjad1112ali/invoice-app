"use client"
import CreateInvoice from "@/components/CreateInvoice";
import { SingleInvoice } from "@/lib/customTypes";
const API_URL = process.env.API_URL;

async function page ({ params }) {
  const res = await fetch(`/api/invoice?id=${params.invoiceId}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const invoice: SingleInvoice = await res.json();
  return (
    <>
      <CreateInvoice invoiceData={invoice} isEditMode ={true} id={params.invoiceId}/>
    </>
  );
};
export default page