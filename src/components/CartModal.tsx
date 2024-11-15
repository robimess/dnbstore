import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Track } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Track[];
  onRemove: (trackId: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onRemove }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-md w-full shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-bold text-gray-900">Your Cart</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img 
                      src={item.coverUrl} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.artist}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.price}</p>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium text-gray-900">Total:</span>
              <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;