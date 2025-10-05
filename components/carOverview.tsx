"use client"

import { Car } from "lucide-react"

export default function CarOverview() {
  return (
    <section id="cars" className="mt-20">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
          <Car className="text-purple-600" /> Car Overview
        </h3>
        <p className="text-gray-600">Basic details of the featured vehicle.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Model</div>
            <div className="text-lg font-semibold text-gray-900">Alpha Thar Roxx</div>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Year</div>
            <div className="text-lg font-semibold text-gray-900">2024</div>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Mileage</div>
            <div className="text-lg font-semibold text-gray-900">18,000 km</div>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">Price</div>
            <div className="text-lg font-semibold text-gray-900">₹ 12,80,000</div>
          </div>
        </div>
      </div>
    </section>
  )
}
