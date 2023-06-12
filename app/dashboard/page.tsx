"use client";
import InvoiceList from "@/components/InvoiceList";
import { SingleInvoice } from "@/lib/customTypes";
import { useEffect, useState } from "react";
const Home = async () => {
  const [data, setData] = useState<SingleInvoice[]>([]);

  useEffect(() => {
    fetch(`/api/invoice`, {
        method: "GET",
        cache: "no-store",
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div className="max-w-7xl w-full mx-auto">
      {/* <InvoiceList invoicesData={invoicesData} /> */}
      <InvoiceList invoicesData={data} setData={setData}/>
    </div>
  );
};

export default Home;
