import React from 'react'
import {Car} from 'lucide-react'
const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <Car className="text-white" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Alpha Motors</h3>
          </div>
          <p className="text-gray-400 mb-6">Drive Your Dreams</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition">Contact</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © 2025 Alpha Motors. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
