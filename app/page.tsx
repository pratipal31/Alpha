'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Phone, Mail, MapPin, Car, Calculator, Shield } from 'lucide-react';
import ImageCarousel from '../components/imageCarousel';
import Footer from '../components/footer';
import PriceCalculator from '@/components/priceCalculator';
import CarOverview from '@/components/carOverview';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white shadow-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <Car className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Alpha Motors
                </h1>
                <p className="text-xs text-gray-500">Drive Your Dreams</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {['Home', 'Cars', 'Calculator', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-gray-700 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t mt-4">
            <nav className="flex flex-col p-4 space-y-2">
              {['Home', 'Cars', 'Calculator', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-3 text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg transition">
                Get Started
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                🚗 Premium Car Dealership
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Dream Car
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Explore premium vehicles with interactive 360° views, instant price calculations, and expert guidance to make your car buying journey seamless.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Car size={20} />
                Browse Cars
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all flex items-center justify-center gap-2">
                <Calculator size={20} />
                Calculate Price
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600 font-medium">Premium Cars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Featured Collection
              </h3>
              <p className="text-gray-600">
                Experience our premium vehicles in stunning 360° interactive view
              </p>
            </div>
            <ImageCarousel />
          </div>

          <div>
            <PriceCalculator/>
          </div>


          <div>
            <CarOverview/>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                <Phone className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our expert team is always ready to assist you in finding the perfect vehicle for your needs and budget.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Price Calculator</h3>
              <p className="text-gray-600">
                Get instant price calculations with transparent breakdown and flexible financing options tailored to you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Quality</h3>
              <p className="text-gray-600">
                Every vehicle is thoroughly inspected and certified to ensure premium quality and your complete satisfaction.
              </p>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-20 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Dream Car?
            </h3>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect vehicle with us. Experience the Alpha Motors difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Mail size={20} />
                Contact Us
              </button>
              <button className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-all border-2 border-white/20 flex items-center justify-center gap-2">
                <MapPin size={20} />
                Visit Showroom
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}<Footer/>
    </div>
  );
}