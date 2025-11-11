import React from "react";

function WhoCanBenefit() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Who Can Benefit
          </h2>
          <p className="text-lg text-gray-600">
            **Paperless Billing is ideal for:**
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-md border-b-4 border-emerald-500">
            <h3 className="font-bold text-lg text-slate-900">
              Freelancers and Consultants
            </h3>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md border-b-4 border-emerald-500">
            <h3 className="font-bold text-lg text-slate-900">
              Small and Medium Businesses
            </h3>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md border-b-4 border-emerald-500">
            <h3 className="font-bold text-lg text-slate-900">
              Service Providers and Agencies
            </h3>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md border-b-4 border-emerald-500">
            <h3 className="font-bold text-lg text-slate-900">
              Retail and Local Shops
            </h3>
          </div>
        </div>
        <p className="mt-10 text-center text-md text-gray-600 italic">
          Whether you handle occasional invoices or high-volume billing, the
          platform adapts to your workflow.
        </p>
      </div>
    </section>
  );
}

export default WhoCanBenefit;
