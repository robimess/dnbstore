import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TrackList from './components/TrackList';
import CartModal from './components/CartModal';
import { Track } from './types';

const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Roller',
    artist: 'Bass Phantom',
    price: 24.99,
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
    bpm: 174,
    duration: '5:32',
    releaseDate: '2024-03-15'
  },
  {
    id: '2',
    title: 'Neural Storm',
    artist: 'Synth Matrix',
    price: 19.99,
    coverUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80',
    bpm: 176,
    duration: '4:45',
    releaseDate: '2024-03-10'
  },
  {
    id: '3',
    title: 'Jungle Theory',
    artist: 'Bass Mechanics',
    price: 29.99,
    coverUrl: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800&q=80',
    bpm: 172,
    duration: '6:15',
    releaseDate: '2024-03-01'
  },
  {
    id: '4',
    title: 'Quantum Break',
    artist: 'Digital Waves',
    price: 22.99,
    coverUrl: 'https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?w=800&q=80',
    bpm: 175,
    duration: '5:18',
    releaseDate: '2024-02-28'
  }
];

function App() {
  const [cartItems, setCartItems] = useState<Track[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  const [bpmFilter, setBpmFilter] = useState('all');

  const handleAddToCart = (track: Track) => {
    if (!cartItems.find(item => item.id === track.id)) {
      setCartItems([...cartItems, track]);
    }
  };

  const handleRemoveFromCart = (trackId: string) => {
    setCartItems(cartItems.filter(item => item.id !== trackId));
  };

  const filteredAndSortedTracks = [...sampleTracks]
    .filter(track => {
      if (bpmFilter === 'all') return true;
      const [min, max] = bpmFilter.split('-').map(Number);
      return track.bpm >= min && track.bpm <= max;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'bpm':
          return a.bpm - b.bpm;
        default:
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Premium DNB Samples
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover high-quality drum and bass samples crafted by industry professionals. 
            Perfect for producers looking to elevate their tracks.
          </p>
        </div>
        
        <div className="mb-8 flex justify-end space-x-4">
          <select 
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Sort by Latest</option>
            <option value="price">Sort by Price</option>
            <option value="bpm">Sort by BPM</option>
          </select>
          <select 
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            value={bpmFilter}
            onChange={(e) => setBpmFilter(e.target.value)}
          >
            <option value="all">All BPM</option>
            <option value="170-175">170-175 BPM</option>
            <option value="175-180">175-180 BPM</option>
          </select>
        </div>

        <TrackList tracks={filteredAndSortedTracks} onAddToCart={handleAddToCart} />
      </main>

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}

export default App;