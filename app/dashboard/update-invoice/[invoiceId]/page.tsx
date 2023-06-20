import CreateInvoice from "@/components/CreateInvoice";
import { SingleInvoice } from "@/lib/customTypes";

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