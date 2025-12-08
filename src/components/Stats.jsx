import React from 'react';
import { Award, Clock } from 'lucide-react'; 

const Stats = ({ user }) => {
  // Datos simulados para la gráfica 
  const weeklyData = [40, 70, 30, 85, 50, 20, 60];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="space-y-6 duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">Actividad Semanal</h3>
          <select className="px-2 py-1 text-xs font-bold text-gray-500 border-none rounded-lg bg-gray-50">
            <option>Esta Semana</option>
            <option>Semana Pasada</option>
          </select>
        </div>
        
        {/* Gráfica de Barras */}
        <div className="flex items-end justify-between h-48 gap-2">
          {weeklyData.map((h, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
              <div className="relative w-full h-full overflow-hidden bg-gray-100 rounded-t-xl">
                <div 
                  style={{ height: `${h}%` }} 
                  className="absolute bottom-0 w-full transition-all bg-indigo-500 group-hover:bg-indigo-600 rounded-t-xl"
                ></div>
              </div>
              <span className="text-[10px] font-bold text-gray-400">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 border border-orange-100 bg-orange-50 rounded-3xl">
          <div className="flex items-center justify-center w-10 h-10 mb-3 text-orange-600 bg-orange-100 rounded-full">
            <Award size={20} />
          </div>
          <p className="text-xs font-bold tracking-wider text-orange-600 uppercase">Racha</p>
          <p className="mt-1 text-2xl font-black text-gray-900">4 Días</p>
        </div>
        <div className="p-5 border border-blue-100 bg-blue-50 rounded-3xl">
          <div className="flex items-center justify-center w-10 h-10 mb-3 text-blue-600 bg-blue-100 rounded-full">
            <Clock size={20} />
          </div>
          <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">Tiempo Total</p>
          <p className="mt-1 text-2xl font-black text-gray-900">12.5h</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;