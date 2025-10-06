"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Slider } from "../components/ui/slider";

export default function PriceCalculator() {
  const [invites, setInvites] = useState(100);
  const [duration, setDuration] = useState(4);

  const price = useMemo(() => invites * duration * 25, [invites, duration]);

  return (
    <section
      id="calculator"
      className="min-h-50 bg-gradient-to-br from-gray-50 to-purple-100 py-16 px-8"
    >
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h3 className="text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
          <div className="bg-purple-600 p-3 rounded-full text-white shadow-md">
            <Calculator size={28} />
          </div>
          Price Calculator
        </h3>
        <p className="text-gray-600 text-lg text-left pt-1">
          Estimate cost based on invites and event duration.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Invites
            </label>
            <div className="flex items-center gap-4">
              <Slider value={invites} onChange={setInvites} />
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration of Event (hours)
            </label>
            <div className="flex items-center gap-4">
              <Slider value={duration} onChange={setDuration} />
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
  );
}
