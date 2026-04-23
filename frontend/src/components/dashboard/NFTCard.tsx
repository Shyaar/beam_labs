import React from 'react';
import { motion } from 'framer-motion';

interface NFTCardProps {
  name: string;
  collection: string;
  image: string;
  floorPrice?: string;
}

export const NFTCard: React.FC<NFTCardProps> = ({ name, collection, image, floorPrice }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -8 }}
    className="wise-card p-0 overflow-hidden group cursor-pointer"
  >
    <div className="aspect-square relative overflow-hidden">
      {/* Mock Image Placeholder */}
      <div className={`w-full h-full ${image} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500`}>
        {/* We'll use color patterns as mock images */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>
      
      {/* Badge */}
      <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
        Verfied
      </div>
    </div>
    <div className="p-4 flex flex-col gap-1">
      <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{collection}</div>
      <div className="font-bold text-white truncate">{name}</div>
      {floorPrice && (
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px]">
          <span className="text-text-secondary font-medium">Floor Price</span>
          <span className="font-bold text-white">{floorPrice} SOL</span>
        </div>
      )}
    </div>
  </motion.div>
);
