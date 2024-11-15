import React, { useState } from 'react';
import { Play, Pause, ShoppingCart} from 'lucide-react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
  onAddToCart: (track: Track) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onAddToCart }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.02]">
      <div className="relative group">
        <img 
          src={track.coverUrl} 
          alt={track.title} 
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-12 h-12 text-white" />
          ) : (
            <Play className="w-12 h-12 text-white" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{track.title}</h3>
            <p className="text-sm text-gray-600">{track.artist}</p>
          </div>
          <span className="text-lg font-bold text-purple-600">${track.price}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Play className="w-4 h-4 mr-1" />
            <span>{track.bpm} BPM</span>
          </div>
          <span>{track.duration}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-24 h-8 bg-gray-100 rounded">
            {/* Placeholder for waveform visualization */}
            <div className="h-full flex items-center justify-center">
              <Play className="w-20 h-6 text-gray-400" />
            </div>
          </div>
          <button
            onClick={() => onAddToCart(track)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;