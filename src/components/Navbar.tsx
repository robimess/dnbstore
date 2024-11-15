import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Music, Ticket, Shirt } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Tracks', icon: <Music className="w-5 h-5" /> },
    { name: 'Merch', icon: <Shirt className="w-5 h-5" /> },
    { name: 'Events', icon: <Ticket className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              BASS DROP
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="flex items-center space-x-2 hover:text-purple-400 transition-colors"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
              <button 
                className="p-2 hover:bg-gray-800 rounded-full transition-colors relative"
                onClick={onCartClick}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="flex items-center space-x-2 text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium w-full"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
            <button 
              className="flex items-center space-x-2 text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium w-full"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;