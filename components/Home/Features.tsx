import React from 'react'
function Features() {
  return (
    <section id="benefits" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-slate-900 text-center mb-16">
                Key Benefits of Going Paperless
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-emerald-500 hover:shadow-2xl transition duration-300">
                    <svg className="w-10 h-10 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Invoice Creation</h3>
                    <p className="text-gray-600 text-sm">Create and send invoices within minutes using a clean and intuitive interface.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-emerald-500 hover:shadow-2xl transition duration-300">
                    <svg className="w-10 h-10 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Professional PDF Output</h3>
                    <p className="text-gray-600 text-sm">Generate well-formatted PDF invoices suitable for clients, bookkeeping, and records.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-emerald-500 hover:shadow-2xl transition duration-300">
                    <svg className="w-10 h-10 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Centralized Database</h3>
                    <p className="text-gray-600 text-sm">All invoices are securely stored, searchable, and accessible anytime you need them.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-emerald-500 hover:shadow-2xl transition duration-300">
                    <svg className="w-10 h-10 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Accessible Anywhere</h3>
                    <p className="text-gray-600 text-sm">Work from any device, without software installation or manual backups.</p>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Features;
