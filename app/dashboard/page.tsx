import InvoiceList from "@/components/InvoiceList";
const API_URL = process.env.API_URL;
const Home = async () => {
  const res = await fetch(`${API_URL}/api/invoice`, {
    method: "GET",
    cache: "no-store",
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
