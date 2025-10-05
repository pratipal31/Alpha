"use client";

import { useMemo, useState } from "react"
import { Calculator } from "lucide-react"
import { Slider } from "../components/ui/slider";

export default function PriceCalculator() {
  const [invites, setInvites] = useState(100)
  const [duration, setDuration] = useState(4) // hours

  // Simple pricing model: base 25 per invite per hour
  const price = useMemo(() => invites * duration * 25, [invites, duration])

  return (
    <section id="calculator" className="mt-20">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
          <Calculator className="text-purple-600" /> Price Calculator
        </h3>
        <p className="text-gray-600">Estimate cost based on invites and event duration.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Invites</label>
            <div className="flex items-center gap-4">
              <Slider
                value={[invites]}
                onChange={setInvites}
              />
              <input
                type="number"
                value={invites}
                onChange={(e) => setInvites(Number(e.target.value))}
                className="w-24 rounded-md border border-gray-200 px-3 py-2 text-gray-900"
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration of Event (hours)</label>
            <div className="flex items-center gap-4">
              <Slider
                value={[duration]}
                onChange={setDuration}
              />
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-24 rounded-md border border-gray-200 px-3 py-2 text-gray-900"
                min={1}
                max={24}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="text-sm text-gray-500 mb-2">Estimated Total</div>
          <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            ₹ {price.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </section>
  )
}
