'use client';

import React, { useState, useEffect } from 'react';
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white shadow-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')} 
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <Car className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Alpha Motors
                </h1>
                <p className="text-xs text-gray-500">Drive Your Dreams</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Cars', id: 'carousel' },
                { name: 'Calculator', id: 'calculator' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 text-gray-700 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => scrollToSection('calculator')}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
              >
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
              {[
                { name: 'Home', id: 'home' },
                { name: 'Cars', id: 'carousel' },
                { name: 'Calculator', id: 'calculator' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-3 text-left text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('calculator')}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <section id="home" className="text-center mb-20 lg:mb-24 scroll-mt-24">
            <div className="inline-block mb-6">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                🚗 Premium Car Dealership
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect
              <span className="block mt-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Dream Car
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 px-4 leading-relaxed">
              Explore premium vehicles with interactive 360° views, instant price calculations, and expert guidance to make your car buying journey seamless.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4">
              <button 
                onClick={() => scrollToSection('carousel')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Car size={20} />
                Browse Cars
              </button>
              <button 
                onClick={() => scrollToSection('calculator')}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                Calculate Price
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
              {[
                { value: '500+', label: 'Premium Cars' },
                { value: '10K+', label: 'Happy Customers' },
                { value: '24/7', label: 'Support' }
              ].map((stat) => (
                <div key={stat.label} className="text-center min-w-[100px]">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Carousel Section */}
          <section id="carousel" className="mb-20 lg:mb-24 scroll-mt-24">
            <div className="text-center mb-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Collection
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
                Experience our premium vehicles in stunning 360° interactive view
              </p>
            </div>
            <ImageCarousel />
          </section>

          {/* Car Overview Section */}
          <div className="mb-20 lg:mb-24">
            <CarOverview />
          </div>

          {/* Price Calculator Section */}
          <div className="mb-20 lg:mb-24">
            <PriceCalculator />
          </div>

          {/* Features Grid */}
          <section className="mb-20 lg:mb-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Alpha Motors
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
                Experience the difference with our premium services and commitment to excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                { 
                  icon: Phone, 
                  title: '24/7 Support', 
                  desc: 'Our expert team is always ready to assist you in finding the perfect vehicle for your needs and budget.' 
                },
                { 
                  icon: Calculator, 
                  title: 'Price Calculator', 
                  desc: 'Get instant price calculations with transparent breakdown and flexible financing options tailored to you.' 
                },
                { 
                  icon: Shield, 
                  title: 'Certified Quality', 
                  desc: 'Every vehicle is thoroughly inspected and certified to ensure premium quality and your complete satisfaction.' 
                }
              ].map((feature) => (
                <div 
                  key={feature.title} 
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="text-purple-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Trust Section / CTA */}
          <section className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white shadow-2xl mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Find Your Dream Car?
            </h3>
            <p className="text-purple-100 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who found their perfect vehicle with us. Experience the Alpha Motors difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Mail size={20} />
                Contact Us
              </button>
              <button className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 hover:scale-105 transition-all border-2 border-white/20 flex items-center justify-center gap-2">
                <MapPin size={20} />
                Visit Showroom
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}