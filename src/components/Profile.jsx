import React, { useState } from 'react';
import { ArrowLeft, Award } from 'lucide-react';
import { BADGES_CONFIG } from '../data/badges';
import { LEVEL_THRESHOLDS } from '../data/constants';

const Profile = ({ 
  user, isMe = true, profileUser, t, xp, level, setSelectedFriend 
}) => {
  
  const [badgeFilter, setBadgeFilter] = useState(1); 
  const [hoveredBadge, setHoveredBadge] = useState(null);

  const pXp = isMe ? xp : profileUser.xp;
  const pLevel = isMe ? level : profileUser.level;
  const pMax = LEVEL_THRESHOLDS[pLevel] || 10000;
  const pMin = LEVEL_THRESHOLDS[pLevel-1] || 0;
  const pProg = ((pXp - pMin) / (pMax - pMin)) * 100;
  const pBadges = isMe ? BADGES_CONFIG.map(b => b.id) : profileUser.badges; 

  const filteredBadges = BADGES_CONFIG.filter(b => b.difficulty === badgeFilter);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
        {!isMe && (
            <button onClick={() => setSelectedFriend(null)} className="flex items-center gap-2 text-indigo-600 font-bold mb-4 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors w-full">
                <ArrowLeft size={18} /> {t('backToSocial')}
            </button>
        )}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
            <div className="relative mt-8">
                <div className="w-24 h-24 bg-white p-1 rounded-full mx-auto shadow-lg">
                    <img src={isMe ? (user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`) : `https://ui-avatars.com/api/?name=${profileUser.name}`} alt="User" className="w-full h-full rounded-full object-cover"/>
                </div>
                <h2 className="text-xl font-black text-gray-900 mt-3">{isMe ? (user.displayName || 'Student') : profileUser.name}</h2>
                <p className="text-indigo-600 font-bold text-sm">{t('level')} {pLevel} Scholar</p>
                
                <div className="mt-4 px-4">
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold mb-1"><span>{pXp} {t('xp')}</span><span>{pMax} {t('xp')}</span></div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200 p-0.5">
                        <div className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-1000" style={{width: `${pProg}%`}}></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 overflow-visible">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Award className="text-yellow-500"/> {t('badges')}</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {[1,2,3].map(d => (
                        <button key={d} onClick={()=>setBadgeFilter(d)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${badgeFilter === d ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'}`}>
                            {d===1?t('easy'):d===2?t('medium'):t('hard')}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 relative">
                {filteredBadges.map(badge => {
                    const isUnlocked = isMe ? (badge.req <= (xp/100)) : pBadges.includes(badge.id); 
                    const badgeInfo = t('badgesData', badge.id) || { name: 'Unknown', desc: '...' };
                    return (
                        <div 
                            key={badge.id} 
                            className={`flex flex-col items-center gap-2 group relative cursor-pointer`}
                            onMouseEnter={() => setHoveredBadge(badge.id)}
                            onMouseLeave={() => setHoveredBadge(null)}
                            onClick={() => setHoveredBadge(hoveredBadge === badge.id ? null : badge.id)} 
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-110 ${isUnlocked ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 text-gray-900' : 'bg-gray-100 text-gray-300'}`}>
                                {badge.icon}
                            </div>
                            
                            {hoveredBadge === badge.id && (
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 bg-gray-900 text-white text-[10px] p-3 rounded-xl shadow-xl z-20 pointer-events-none animate-in zoom-in-95">
                                    <p className="font-bold text-indigo-300 mb-1 text-xs">{badgeInfo.name}</p>
                                    <p className="leading-tight opacity-90">{badgeInfo.desc}</p>
                                    {!isUnlocked && <p className="mt-2 text-gray-500 italic border-t border-gray-700 pt-1">{t('badgeLocked')}</p>}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default Profile;