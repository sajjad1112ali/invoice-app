import React from "react";

function SecurityAndManaging() {
  return (
    <>
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg
            className="w-12 h-12 text-emerald-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
          <h2 className="text-3xl font-extrabold mb-4">
            Reliability and Security
          </h2>
          <p className="text-lg text-gray-300">
            Your billing data is stored **securely with consistent
            availability**, ensuring your business records remain **safe,
            accessible, and confidential**.
          </p>
        </div>
      </section>

      <section id="cta-bottom" className="py-24 bg-emerald-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Start Managing Your Invoices the Smart Way
          </h2>
          <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto mb-8">
            Experience faster, cleaner, and more organized billing — with zero
            paperwork.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-xl shadow-xl text-white bg-slate-900 hover:bg-slate-700 transition duration-300 transform hover:scale-105"
          >
            → Create Your Account
          </a>
        </div>
      </section>

      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Paperless Billing. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a
              href="#"
              className="hover:text-emerald-500 transition duration-150"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-emerald-500 transition duration-150"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default SecurityAndManaging;
