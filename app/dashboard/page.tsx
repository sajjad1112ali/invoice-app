"use client";
import InvoiceList from "@/components/InvoiceList";
import { SingleInvoice } from "@/lib/customTypes";
import { useEffect, useState } from "react";
const Home = async () => {
  const [data, setData] = useState<SingleInvoice[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    fetch(`/api/invoice`, {
        method: "GET",
        cache: "no-store",
      })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setData(data);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      {/* <InvoiceList invoicesData={invoicesData} /> */}
      { !loading && <InvoiceList invoicesData={data} setData={setData}/>}
    </div>
  );
};

export default Home;
