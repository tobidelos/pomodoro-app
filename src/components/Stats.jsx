import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';
import { MOCK_STATS_DATA, FRIEND_STATS_AVG } from '../data/constants'; 

const Stats = ({ statsTimeframe, setStatsTimeframe, compareMode, setCompareMode, user, t }) => {
    // Definir datos
    const currentData = MOCK_STATS_DATA[statsTimeframe];
    const trendData = currentData.trend;
    const barData = currentData.user;
    const friendData = currentData.friends;
    
    // Labels semana
    let labels = currentData.labels;
    if (statsTimeframe === 'week') {
        const daysTranslated = t('days');
        if (Array.isArray(daysTranslated)) labels = daysTranslated;
    }

    const maxVal = Math.max(...barData, compareMode ? Math.max(...friendData) : 0);
    const trendMax = Math.max(...trendData);

    // Función para generar la curva suave SVG
    const getPath = (data, maxY) => {
        if (data.length === 0) return "";
        const points = data.map((val, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((val / maxY) * 100);
            return [x, y];
        });

        let d = `M ${points[0][0]},${points[0][1]}`;
        for (let i = 1; i < points.length; i++) {
            const [x0, y0] = points[i - 1];
            const [x1, y1] = points[i];
            const cp1x = x0 + (x1 - x0) / 2; 
            const cp2x = x1 - (x1 - x0) / 2;
            d += ` C ${cp1x},${y0} ${cp2x},${y1} ${x1},${y1}`;
        }
        return d;
    };

    // Definir trendPath y trendFill ANTES del return para evitar el ReferenceError
    const trendPath = getPath(trendData, trendMax);
    const trendFill = `${trendPath} L 100,100 L 0,100 Z`;

    return (
      <div className="space-y-6 duration-300 animate-in fade-in">
        {/* Gráfico de Barras */}
        <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-3xl">
           <div className="flex items-center justify-between mb-6">
               <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900"><BarChart2 className="text-indigo-600" /> {t('myStats')}</h2>
               <div className="flex p-1 bg-gray-100 rounded-lg">
                   {['day', 'week', 'month'].map(tf => (
                       <button key={tf} onClick={()=>setStatsTimeframe(tf)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${statsTimeframe === tf ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'}`}>{t(tf)}</button>
                   ))}
               </div>
           </div>
           
           <div className="flex items-end justify-between h-48 gap-2 px-2 pb-2 border-b border-gray-100">
              {barData.map((val, i) => (
                <div key={i} className="relative flex flex-col items-center flex-1 gap-2 group">
                   <div className="relative flex items-end justify-center w-full h-32 gap-1">
                      {/* Barra Usuario */}
                      <div style={{ height: `${(val / (maxVal||1)) * 100}%` }} className="relative w-2 transition-all duration-500 bg-indigo-500 rounded-t-full sm:w-4 group-hover:bg-indigo-600">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{val}m</div>
                      </div>
                      {/* Barra Amigo (Comparación) */}
                      {compareMode && (
                          <div style={{ height: `${(friendData[i] / (maxVal||1)) * 100}%` }} className="relative w-2 transition-all duration-500 bg-gray-300 rounded-t-full sm:w-4 group-hover:bg-gray-400">
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{friendData[i]}m</div>
                          </div>
                      )}
                   </div>
                   <span className="text-[9px] text-gray-400 font-medium truncate w-full text-center">{labels[i]}</span>
                </div>
              ))}
           </div>
           
           <div className="flex items-center justify-between mt-6">
               <div className="flex items-center gap-4 text-xs">
                   <div className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-500 rounded"></div> <span>{user.displayName}</span></div>
                   {compareMode && <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-300 rounded"></div> <span>Avg. Friends</span></div>}
               </div>
               <button onClick={() => setCompareMode(!compareMode)} className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${compareMode ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-200 text-gray-500'}`}>{t('compare')}</button>
           </div>
        </div>

        {/* Gráfico de Tendencia */}
        <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-3xl">
            <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-900"><TrendingUp className="text-emerald-500" size={18}/> {t('trend')}</h2>
            <div className="relative w-full h-40 px-2">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                    <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
                    
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <path d={trendFill} fill="url(#gradient)" stroke="none" opacity="0.2" />
                    <path d={trendPath} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    
                    {trendData.map((val, i) => {
                        const x = (i / (trendData.length - 1)) * 100;
                        const y = 100 - ((val / trendMax) * 100);
                        return <circle key={i} cx={x} cy={y} r="1.5" fill="white" stroke="#10b981" strokeWidth="1" vectorEffect="non-scaling-stroke" />;
                    })}
                </svg>
            </div>
        </div>
      </div>
    );
};

export default Stats;