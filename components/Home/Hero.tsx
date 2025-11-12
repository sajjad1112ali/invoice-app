import Link from "next/link";
import React from "react";
function Hero() {
  return (
    <>
      <section className="bg-slate-900 pt-16 pb-24 md:pt-24 md:pb-32 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Streamlined Paperless Invoicing for Modern Businesses
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Generate **accurate, professional PDF invoices** and maintain
            **organized billing records** — all in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl shadow-xl text-slate-900 bg-emerald-500 hover:bg-emerald-400 transition duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            {/* <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-500 text-base font-bold rounded-xl text-emerald-500 hover:bg-emerald-500 hover:text-white transition duration-300"
            >
              Get Started
            </a> */}
          </div>
        </div>
      </section>
      <section id="value-prop" className="py-20 bg-white shadow-inner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Effortless Invoicing. Secure Record Management. Smart Workflow.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            **Paperless Billing** simplifies the way you create, manage, and
            store invoices. Designed for individuals and companies who value
            **efficiency, accuracy, and convenience**.
          </p>
        </div>
      </section>
    </>
  );
}

export default Hero;
