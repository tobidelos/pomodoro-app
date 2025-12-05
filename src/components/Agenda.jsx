import React from 'react';
import { Plus, Clock, Calendar as CalendarIcon, MapPin, MoreVertical } from 'lucide-react';

const Agenda = ({ 
  localEvents = [], // Protección: si no hay eventos, usa lista vacía
  handleAddEvent = (e) => e.preventDefault(), // Protección: función vacía
  newEvent = { title: '', time: '', type: 'study' }, // Protección: objeto por defecto
  setNewEvent = () => {},
  showEventModal = false,
  setShowEventModal = () => {},
  t = (key) => key // Protección CRÍTICA: si no llega 't', devuelve el texto original
}) => {

  // Generador de días del calendario (Visual)
  const renderCalendarGrid = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
      <div className="grid grid-cols-7 gap-1 mb-6 text-center duration-300 animate-in zoom-in">
        {['D','L','M','M','J','V','S'].map((d,i) => (
          <div key={i} className="py-2 text-xs font-bold text-gray-400">{d}</div>
        ))}
        {days.map((day) => (
          <button 
            key={day} 
            className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all
              ${day === 14 ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-white text-gray-600 hover:bg-indigo-50 border border-transparent'}
            `}
          >
            {day}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="pb-20 space-y-6 duration-500 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header de la Agenda */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-black text-gray-800">
            {t('agenda')}
          </h2>
          <p className="text-xs font-medium text-gray-400">Organiza tu semana</p>
        </div>
        
        <button 
          onClick={() => setShowEventModal(true)} 
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors active:scale-95"
        >
          <Plus size={18} /> 
          <span className="hidden sm:inline">Nuevo</span>
        </button>
      </div>

      {/* Calendario Visual */}
      <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div className="flex items-center justify-between px-2 mb-4">
          <span className="font-bold text-gray-700">Octubre 2023</span>
          <CalendarIcon size={16} className="text-gray-400"/>
        </div>
        {renderCalendarGrid()}
      </div>

      {/* Lista de eventos */}
      <div className="space-y-3">
        <h3 className="ml-1 text-sm font-bold tracking-wider text-gray-800 uppercase">Próximos Eventos</h3>
        
        {localEvents.length === 0 ? (
          <div className="py-10 text-center bg-white border border-gray-200 border-dashed rounded-3xl">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-gray-50">
              <CalendarIcon className="text-gray-300" size={24} />
            </div>
            <p className="text-sm font-medium text-gray-400">No hay eventos programados.</p>
            <button onClick={() => setShowEventModal(true)} className="mt-2 text-xs font-bold text-indigo-600 hover:underline">
              Crear el primero
            </button>
          </div>
        ) : (
          localEvents.map(ev => (
            <div 
              key={ev.id} 
              className={`p-4 rounded-2xl border-l-4 shadow-sm bg-white flex justify-between items-center group hover:shadow-md transition-all
                ${ev.type === 'study' ? 'border-l-indigo-500' : 'border-l-rose-500'}
              `}
            >
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{ev.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-500 flex items-center gap-1 font-medium bg-gray-50 px-2 py-0.5 rounded-md">
                    <Clock size={10}/> {ev.time}
                  </p>
                  {ev.location && (
                    <p className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={10}/> {ev.location}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider 
                  ${ev.type === 'study' ? 'bg-indigo-50 text-indigo-700' : 'bg-rose-50 text-rose-700'}
                `}>
                  {ev.type === 'study' ? 'Estudio' : 'Otro'}
                </span>
                <button className="text-gray-300 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para nuevo evento */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm p-6 duration-200 bg-white shadow-2xl rounded-3xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-800">Nuevo Evento</h3>
              <button onClick={() => setShowEventModal(false)} className="p-2 text-gray-400 transition-colors rounded-full bg-gray-50 hover:bg-gray-100">
                <Plus size={20} className="rotate-45" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-5">
              <div>
                <label className="ml-1 text-xs font-bold text-gray-500 uppercase">Título</label>
                <input 
                  type="text" 
                  className="w-full p-3 mt-1 font-medium transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                  value={newEvent?.title || ''} // Protección extra: si newEvent es null, usa ''
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})} 
                  placeholder="Ej. Examen de Matemáticas" 
                  required 
                  autoFocus
                />
              </div>
              
              <div>
                <label className="ml-1 text-xs font-bold text-gray-500 uppercase">Hora</label>
                <input 
                  type="time" 
                  className="w-full p-3 mt-1 font-medium transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white" 
                  value={newEvent?.time || ''} 
                  onChange={e => setNewEvent({...newEvent, time: e.target.value})} 
                  required 
                />
              </div>

              <div>
                <label className="block mb-2 ml-1 text-xs font-bold text-gray-500 uppercase">Tipo de Evento</label>
                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setNewEvent({...newEvent, type: 'study'})} 
                    className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all flex items-center justify-center gap-2
                      ${newEvent?.type === 'study' 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'}
                    `}
                  >
                    <div className={`w-2 h-2 rounded-full ${newEvent?.type === 'study' ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                    Estudio
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setNewEvent({...newEvent, type: 'other'})} 
                    className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all flex items-center justify-center gap-2
                      ${newEvent?.type === 'other' 
                        ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'}
                    `}
                  >
                    <div className={`w-2 h-2 rounded-full ${newEvent?.type === 'other' ? 'bg-rose-500' : 'bg-gray-300'}`}></div>
                    Otro
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                >
                  <Plus size={20} />
                  Guardar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;