import React from 'react';
import { Play, Pause, RotateCcw, BookOpen, Coffee, CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import { FOCUS_SOUNDS } from '../data/constants';

const Timer = ({ 
  mode, switchMode, timeLeft, isActive, toggleTimer, resetTimer, 
  quote, activeSound, setActiveSound, showConfetti, t,
  tasks, addTask, toggleTask, deleteTask, newTask, setNewTask
}) => {
  
  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div className="duration-300 animate-in fade-in">
      {showConfetti && <div className="absolute inset-0 z-50 flex items-start justify-center pt-20 pointer-events-none"><div className="text-4xl animate-bounce">🎉 🎊 🏆</div></div>}
      
      <div className="relative p-4 mb-6 overflow-hidden text-xs font-medium text-center text-indigo-100 transition-all duration-500 bg-indigo-900 shadow-lg rounded-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
          <p>"{quote.text}"</p>
          <p className="text-[10px] text-indigo-300 mt-1 opacity-70">- {quote.author}</p>
      </div>

      <div className="relative p-8 mb-6 overflow-hidden bg-white border border-gray-100 shadow-xl rounded-3xl">
        <div className="absolute top-0 left-0 h-1.5 bg-gray-100 w-full">
            <div className={`h-full transition-all duration-1000 ease-linear ${mode === 'focus' ? 'bg-indigo-500' : 'bg-emerald-500'}`} 
                 style={{ width: `${(( (mode==='focus'?25:mode==='short'?5:15) * 60 - timeLeft) / ((mode==='focus'?25:mode==='short'?5:15) * 60)) * 100}%` }}></div>
        </div>
        
        <div className="flex flex-wrap justify-center w-full gap-2 mt-2 mb-8">
            {['focus','short','long'].map(m => (
                <button key={m} onClick={()=>switchMode(m)} className={`px-4 py-2 h-auto min-h-[36px] rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 capitalize whitespace-normal text-center ${mode===m ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500' : 'text-gray-400 hover:bg-gray-50'}`}>
                    {m==='focus'?<BookOpen size={14} className="shrink-0"/>:<Coffee size={14} className="shrink-0"/>} 
                    <span>{t(m)}</span>
                </button>
            ))}
        </div>

        <div className="relative mb-8 text-center">
            <div className={`text-8xl font-black tracking-tighter tabular-nums transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>{formatTime(timeLeft)}</div>
            <p className="mt-2 font-medium text-gray-400 animate-pulse">{isActive ? t('keepFocus') : t('ready')}</p>
            {mode === 'focus' && (<div className="absolute flex flex-col gap-2 -translate-y-1/2 -right-4 top-1/2">{FOCUS_SOUNDS.map(s => (<button key={s.id} onClick={()=>setActiveSound(activeSound===s.id ? null : s.id)} className={`p-2 rounded-full shadow-sm transition-all ${activeSound===s.id ? 'bg-indigo-600 text-white scale-110' : 'bg-white text-gray-400 hover:bg-gray-50'}`} title={s.name}>{s.icon}</button>))}</div>)}
        </div>
        
        <div className="flex items-center justify-center gap-4">
            <button onClick={toggleTimer} className={`h-16 w-32 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold text-white shadow-lg transition-all active:scale-95 ${isActive ? 'bg-gray-900' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isActive ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>} {isActive ? t('pause') : t('start')}
            </button>
            <button onClick={resetTimer} className="flex items-center justify-center w-16 h-16 text-gray-500 bg-gray-100 rounded-2xl hover:bg-gray-200"><RotateCcw size={24}/></button>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-3xl">
         <h3 className="flex items-center gap-2 mb-4 font-bold text-gray-900"><CheckCircle className="text-indigo-500" size={18}/> {t('tasks')}</h3>
         <form onSubmit={addTask} className="flex gap-2 mb-4"><input value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder={t('newTask')} className="flex-1 px-3 py-2 text-sm outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-100"/><button disabled={!newTask} className="flex items-center justify-center w-10 text-white bg-indigo-600 rounded-xl"><Plus size={18}/></button></form>
         <div className="space-y-2 overflow-y-auto max-h-32 custom-scrollbar">{tasks.map(t => (<div key={t.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group"><button onClick={()=>toggleTask(t.id)} className="flex items-center gap-2 text-sm text-gray-700">{t.completed ? <CheckCircle size={16} className="text-emerald-500"/> : <Circle size={16} className="text-gray-300"/>}<span className={t.completed?'line-through text-gray-400':''}>{t.text}</span></button><button onClick={()=>deleteTask(t.id)} className="text-gray-300 opacity-0 hover:text-red-500 group-hover:opacity-100"><Trash2 size={14}/></button></div>))}</div>
      </div>
    </div>
  );
};

export default Timer;