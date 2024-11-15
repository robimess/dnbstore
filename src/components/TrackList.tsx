import React from 'react';
import TrackCard from './TrackCard';
import { Track } from '../types';

interface TrackListProps {
  tracks: Track[];
  onAddToCart: (track: Track) => void;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default TrackList;