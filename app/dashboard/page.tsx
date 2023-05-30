import InvoiceList from "@/components/InvoiceList";

export default function Home() {
  return (
      <div className="max-w-7xl w-full mx-auto">
        <h1 className="text-lime-800">Welcome Next.js</h1>
        <InvoiceList />
      </div>
  );
}
