import React from 'react';
import DiamondCard from './DiamondCard';

const DiamondGrid: React.FC = () => {
  const diamondPackages = [
    {
      packageName: "Starter Pack",
      description: "Perfect for beginners",
      diamondAmount: 86,
      price: 1.99,
      originalPrice: 2.99,
      image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
      bonus: 0
    },
    {
      packageName: "Value Pack",
      description: "Best value for money",
      diamondAmount: 344,
      price: 7.99,
      originalPrice: 9.99,
      image: "https://images.pexels.com/photos/695771/pexels-photo-695771.jpeg?auto=compress&cs=tinysrgb&w=400",
      isPopular: true,
      bonus: 50
    },
    {
      packageName: "Premium Pack",
      description: "For serious players",
      diamondAmount: 706,
      price: 15.99,
      originalPrice: 19.99,
      image: "https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=400",
      bonus: 100
    },
    {
      packageName: "Elite Pack",
      description: "Maximum diamonds",
      diamondAmount: 1412,
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400",
      bonus: 200
    },
    {
      packageName: "Legend Pack",
      description: "Ultimate gaming experience",
      diamondAmount: 2195,
      price: 49.99,
      originalPrice: 59.99,
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
      bonus: 350
    },
    {
      packageName: "Mythic Pack",
      description: "For the ultimate gamer",
      diamondAmount: 3688,
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=400",
      bonus: 500
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,119,198,0.2),transparent)]" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mobile Legends Diamonds
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the perfect diamond package to enhance your Mobile Legends experience
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {diamondPackages.map((pkg, index) => (
            <DiamondCard
              key={index}
              packageName={pkg.packageName}
              description={pkg.description}
              diamondAmount={pkg.diamondAmount}
              price={pkg.price}
              originalPrice={pkg.originalPrice}
              image={pkg.image}
              isPopular={pkg.isPopular}
              bonus={pkg.bonus}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            Secure payment • Instant delivery • 24/7 support
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiamondGrid;