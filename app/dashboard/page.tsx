import InvoiceList from "@/components/InvoiceList";
import Modal from "@/components/Modal";
import { Suspense } from "react";
const BASE_URL = "http://localhost:3000";
const Home = async () => {
  const data = await fetch(`${BASE_URL}/api/invoice`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const invoicesData = await data.json();
  console.log(invoicesData);
  return (
    <div className="max-w-7xl w-full mx-auto">
      <InvoiceList invoicesData={invoicesData} />
      <Modal />
    </div>
  );
};

export default Home;
