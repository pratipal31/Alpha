"use client"

import { Car, Gauge, Calendar, Route, IndianRupee } from "lucide-react"

export default function CarOverview() {
  return (
    <section className="min-h-50 bg-gradient-to-br from-gray-50 to-purple-100 py-16 px-8">
      {/* Title Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-600 p-3 rounded-full text-white shadow-md">
            <Car size={28} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Car Overview</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Explore the key details of this featured vehicle below.
        </p>
      </div>

      {/* Details Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <DetailCard icon={<Car className="text-purple-600" />} label="Model" value="Alpha Thar Roxx" />
        <DetailCard icon={<Calendar className="text-purple-600" />} label="Year" value="2024" />
        <DetailCard icon={<Route className="text-purple-600" />} label="Mileage" value="18,000 km" />
        <DetailCard icon={<IndianRupee className="text-purple-600" />} label="Price" value="₹ 12,80,000" />
        <DetailCard icon={<Gauge className="text-purple-600" />} label="Engine" value="2.0L Turbo Petrol" />
        <DetailCard icon={<Gauge className="text-purple-600" />} label="Transmission" value="6-Speed Manual" />
      </div>
    </section>
  )
}

/* Individual Detail Box Component */
function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="bg-purple-100 p-3 rounded-full">{icon}</div>
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
        </div>
      </div>
    </div>
  )
}
