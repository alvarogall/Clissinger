import React from 'react';
import point from '../images/point.svg'

export default function PointsDisplay({ points }) {
  return (
    <div id="inicio-puntos"
    className="absolute top-4 right-4 flex items-center gap-2">
      <img src={point} alt="Icono de puntos" className="w-6 h-6" />
      <span className="text-lg font-bold">{points} puntos</span>
    </div>
    
     
  );
}