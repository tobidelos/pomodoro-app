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
    <div className="animate-in fade-in duration-300">
      {showConfetti && <div className="absolute inset-0 pointer-events-none z-50 flex justify-center items-start pt-20"><div className="text-4xl animate-bounce">🎉 🎊 🏆</div></div>}
      
      <div className="bg-indigo-900 text-indigo-100 p-4 rounded-2xl mb-6 text-center text-xs font-medium relative overflow-hidden shadow-lg transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
          <p>"{quote.text}"</p>
          <p className="text-[10px] text-indigo-300 mt-1 opacity-70">- {quote.author}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1.5 bg-gray-100 w-full">
            <div className={`h-full transition-all duration-1000 ease-linear ${mode === 'focus' ? 'bg-indigo-500' : 'bg-emerald-500'}`} 
                 style={{ width: `${(( (mode==='focus'?25:mode==='short'?5:15) * 60 - timeLeft) / ((mode==='focus'?25:mode==='short'?5:15) * 60)) * 100}%` }}></div>
        </div>
        
        {/* MODOS CON FLEX WRAP PARA EVITAR CORTES DE TEXTO */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 mt-2 w-full">
            {['focus','short','long'].map(m => (
                <button key={m} onClick={()=>switchMode(m)} className={`px-4 py-2 h-auto min-h-[36px] rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 capitalize whitespace-normal text-center ${mode===m ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-500' : 'text-gray-400 hover:bg-gray-50'}`}>
                    {m==='focus'?<BookOpen size={14} className="shrink-0"/>:<Coffee size={14} className="shrink-0"/>} 
                    <span>{t(m)}</span>
                </button>
            ))}
        </div>

        <div className="text-center mb-8 relative">
            <div className={`text-8xl font-black tracking-tighter tabular-nums transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>{formatTime(timeLeft)}</div>
            <p className="text-gray-400 font-medium mt-2 animate-pulse">{isActive ? t('keepFocus') : t('ready')}</p>
            {mode === 'focus' && (<div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">{FOCUS_SOUNDS.map(s => (<button key={s.id} onClick={()=>setActiveSound(activeSound===s.id ? null : s.id)} className={`p-2 rounded-full shadow-sm transition-all ${activeSound===s.id ? 'bg-indigo-600 text-white scale-110' : 'bg-white text-gray-400 hover:bg-gray-50'}`} title={s.name}>{s.icon}</button>))}</div>)}
        </div>
        
        <div className="flex items-center justify-center gap-4">
            <button onClick={toggleTimer} className={`h-16 w-32 rounded-2xl flex items-center justify-center gap-2 text-lg font-bold text-white shadow-lg transition-all active:scale-95 ${isActive ? 'bg-gray-900' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isActive ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>} {isActive ? t('pause') : t('start')}
            </button>
            <button onClick={resetTimer} className="h-16 w-16 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"><RotateCcw size={24}/></button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
         <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle className="text-indigo-500" size={18}/> {t('tasks')}</h3>
         <form onSubmit={addTask} className="flex gap-2 mb-4"><input value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder={t('newTask')} className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"/><button disabled={!newTask} className="bg-indigo-600 text-white rounded-xl w-10 flex items-center justify-center"><Plus size={18}/></button></form>
         <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">{tasks.map(t => (<div key={t.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group"><button onClick={()=>toggleTask(t.id)} className="flex items-center gap-2 text-sm text-gray-700">{t.completed ? <CheckCircle size={16} className="text-emerald-500"/> : <Circle size={16} className="text-gray-300"/>}<span className={t.completed?'line-through text-gray-400':''}>{t.text}</span></button><button onClick={()=>deleteTask(t.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button></div>))}</div>
      </div>
    </div>
  );
};

export default Timer;