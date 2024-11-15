export interface Track {
  id: string;
  title: string;
  artist: string;
  price: number;
  coverUrl: string;
  previewUrl?: string;
  bpm: number;
  duration: string;
  releaseDate: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: 'merch' | 'vinyl' | 'digital';
  sizes?: string[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  price: number;
  imageUrl: string;
  lineup: string[];
}