"use client";
import { useState, useEffect } from "react";
import InvoiceList from "@/components/InvoiceList";
const BASE_URL = "http://localhost:3000";
const Home = async () => {
  const res = await fetch(`${BASE_URL}/api/invoice`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const invoicesData = await res.json();

  return (
    <div className="max-w-7xl w-full mx-auto">
      {/* <InvoiceList invoicesData={invoicesData} /> */}
      <InvoiceList invoicesData={invoicesData} />
    </div>
  );
};

export default Home;
