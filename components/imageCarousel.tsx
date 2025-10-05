import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, RotateCw } from 'lucide-react';

const ImageCarousel = () => {
  const carImages = [
    '/car7.png',
    '/car.jpg',
    '/car3.png',
    '/car4.png',
    '/car5.png'
  ];

  // 360 view images - Updated to use your 1-16.png files
  const car360Images = Array.from({ length: 16 }, (_, i) => `/360/${i + 1}.png`);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [show360View, setShow360View] = useState(false);
  
  // 360 view states
  const [current360Index, setCurrent360Index] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carImages.length]);

  // Preload 360 images when modal opens
  useEffect(() => {
    if (show360View && !imagesLoaded) {
      const loadImages = async () => {
        const promises = car360Images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // Continue even if some images fail
          });
        });
        await Promise.all(promises);
        setImagesLoaded(true);
      };
      loadImages();
    }
  }, [show360View]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % carImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  // 360 View handlers
  const handle360MouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    e.preventDefault();
  };

  const handle360MouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const sensitivity = 3; // Lower value = more sensitive
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrent360Index((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return car360Images.length - 1;
        if (newIndex >= car360Images.length) return 0;
        return newIndex;
      });
      
      // Calculate rotation angle (360° divided by number of images)
      const anglePerImage = 360 / car360Images.length;
      setRotation((prev) => {
        let newRotation = prev + (direction * anglePerImage);
        if (newRotation < 0) newRotation += 360;
        if (newRotation >= 360) newRotation -= 360;
        return newRotation;
      });
      
      setStartX(e.clientX);
    }
  };

  const handle360MouseUp = () => {
    setIsDragging(false);
  };

  const handle360TouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    e.preventDefault();
  };

  const handle360TouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const sensitivity = 3;
    
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrent360Index((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return car360Images.length - 1;
        if (newIndex >= car360Images.length) return 0;
        return newIndex;
      });
      
      const anglePerImage = 360 / car360Images.length;
      setRotation((prev) => {
        let newRotation = prev + (direction * anglePerImage);
        if (newRotation < 0) newRotation += 360;
        if (newRotation >= 360) newRotation -= 360;
        return newRotation;
      });
      
      setStartX(e.touches[0].clientX);
    }
  };

  const handle360TouchEnd = () => {
    setIsDragging(false);
  };

  const reset360View = () => {
    setCurrent360Index(0);
    setRotation(0);
  };

  const open360View = () => {
    setShow360View(true);
    setCurrent360Index(0);
    setRotation(0);
    setImagesLoaded(false);
  };

  const autoRotate360 = () => {
    let currentRotation = 0;
    const interval = setInterval(() => {
      setCurrent360Index((prev) => {
        const newIndex = (prev + 1) % car360Images.length;
        return newIndex;
      });
      currentRotation += 360 / car360Images.length;
      setRotation(currentRotation % 360);
    }, 100);

    // Stop after one full rotation
    setTimeout(() => clearInterval(interval), 100 * car360Images.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
        {carImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Car ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 transition-all hover:scale-110 shadow-lg z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 transition-all hover:scale-110 shadow-lg z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentIndex + 1} / {carImages.length}
        </div>

        {/* 360 View Button */}
        <button
          onClick={open360View}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 z-10"
        >
          <RotateCw size={20} />
          View 360°
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {carImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-purple-600'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* 360 View Modal */}
      {show360View && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShow360View(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all hover:scale-110 z-10"
            aria-label="Close 360 view"
          >
            <X size={24} />
          </button>
          
          <div className="w-full max-w-6xl">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 md:p-8">
              <div className="mb-4 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">360° Interactive View</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  <span className="inline-flex items-center gap-2">
                    <RotateCw size={16} />
                    Drag left or right to rotate • {car360Images.length} frames
                  </span>
                </p>
              </div>
              
              {/* 360 Viewer */}
              <div 
                ref={containerRef}
                className="relative bg-black rounded-xl aspect-video flex items-center justify-center border-2 border-purple-500/30 mb-4 overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handle360MouseDown}
                onMouseMove={handle360MouseMove}
                onMouseUp={handle360MouseUp}
                onMouseLeave={handle360MouseUp}
                onTouchStart={handle360TouchStart}
                onTouchMove={handle360TouchMove}
                onTouchEnd={handle360TouchEnd}
              >
                {imagesLoaded || current360Index > 0 ? (
                  <>
                    <img
                      src={car360Images[current360Index]}
                      alt={`360 view - frame ${current360Index + 1}`}
                      className="w-full h-full object-contain pointer-events-none select-none"
                      draggable={false}
                      onError={(e) => {
                        console.error('Failed to load 360 image:', car360Images[current360Index]);
                        // Fallback to regular car image if 360 images don't exist
                        (e.target as HTMLImageElement).src = carImages[currentIndex];
                      }}
                    />
                    
                    {/* Rotation indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
                      <RotateCw size={16} className={isDragging ? 'animate-spin' : ''} />
                      <span>{Math.round(rotation)}°</span>
                      <span className="text-gray-400 ml-2">Frame {current360Index + 1}/{car360Images.length}</span>
                    </div>

                    {/* Drag hint (shows initially) */}
                    {current360Index === 0 && !isDragging && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none transition-opacity duration-500">
                        <div className="text-center text-white animate-pulse">
                          <div className="flex items-center justify-center gap-4 mb-3">
                            <ChevronLeft size={32} />
                            <RotateCw size={48} />
                            <ChevronRight size={32} />
                          </div>
                          <p className="text-lg font-semibold">Drag to Rotate</p>
                          <p className="text-sm text-gray-300 mt-2">Click and drag left or right</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white text-lg font-medium">Loading 360° View...</p>
                    <p className="text-gray-400 text-sm mt-2">Loading {car360Images.length} frames</p>
                  </div>
                )}
              </div>
              
              {/* Control buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => setViewMode('exterior')}
                  className={`px-6 py-2 rounded-lg font-medium transition ${
                    viewMode === 'exterior' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  Exterior View
                </button>
                <button 
                  onClick={autoRotate360}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition flex items-center gap-2"
                >
                  <RotateCw size={18} />
                  Auto Rotate
                </button>
                <button 
                  onClick={reset360View}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
                >
                  Reset View
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-6 text-center text-gray-400 text-sm">
                <p>💡 Tip: Drag left or right to rotate the car. Using {car360Images.length} frames for smooth 360° rotation.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;