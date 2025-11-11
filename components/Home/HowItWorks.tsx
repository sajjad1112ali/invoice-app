
import React from 'react'
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-white text-center mb-4">
                How It Works
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16">
                A Simple Process Designed for Efficiency
            </p>
            <div className="relative flex flex-col md:flex-row justify-between items-center">
                <div className="absolute hidden md:block w-full top-10 left-0 h-1 bg-slate-700"></div>

                <div className="relative w-full md:w-1/4 mb-12 md:mb-0 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-bold text-2xl ring-4 ring-slate-800 ring-offset-slate-800 mb-4">1</div>
                    <h3 className="text-xl font-bold mb-2">Login to Your Account</h3>
                    <p className="text-gray-300 text-sm">Access your personalized billing dashboard securely.</p>
                </div>
                <div className="relative w-full md:w-1/4 mb-12 md:mb-0 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-bold text-2xl ring-4 ring-slate-800 ring-offset-slate-800 mb-4">2</div>
                    <h3 className="text-xl font-bold mb-2">Enter Invoice Details</h3>
                    <p className="text-gray-300 text-sm">Add client info, item descriptions, quantity, price, and applicable tax.</p>
                </div>
                <div className="relative w-full md:w-1/4 mb-12 md:mb-0 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-bold text-2xl ring-4 ring-slate-800 ring-offset-slate-800 mb-4">3</div>
                    <h3 className="text-xl font-bold mb-2">Generate PDF Invoice</h3>
                    <p className="text-gray-300 text-sm">Download, print, or share instantly — professionally formatted.</p>
                </div>
                <div className="relative w-full md:w-1/4 mb-12 md:mb-0 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-bold text-2xl ring-4 ring-slate-800 ring-offset-slate-800 mb-4">4</div>
                    <h3 className="text-xl font-bold mb-2">Manage and Track Records</h3>
                    <p className="text-gray-300 text-sm">View, edit, and organize past invoices with ease.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HowItWorks