import React from 'react';
import { Calendar as CalendarIcon, CalendarPlus, Plus, Trash2 } from 'lucide-react';
import { MOCK_EVENTS } from '../data/mocks';

const Agenda = ({ 
  calendarSync, setCalendarSync, localEvents, setLocalEvents, 
  showEventModal, setShowEventModal, newEvent, setNewEvent, handleAddEvent, t 
}) => {
  return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CalendarIcon className="text-indigo-600"/> {t('sync')}</h2>
              <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-500 font-bold">G</div><div><p className="text-sm font-bold text-gray-800">{t('gcal')}</p><p className="text-[10px] text-gray-400">{calendarSync.google ? t('active') : t('notConnected')}</p></div></div><button onClick={()=>setCalendarSync({...calendarSync, google: !calendarSync.google})} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${calendarSync.google ? 'bg-green-100 text-green-700' : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'}`}>{calendarSync.google ? t('active') : t('disabled')}</button></div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-800 font-bold">
                              <svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 43.7-24.1 72.6 24.1 1.6 52-17.4 68-35zm-5.8 340.2C281 444.7 281 444.7 256.3 445c-27.3 0-35.4-17-66.8-17-30.1 0-39.6 16-67.4 16.6-49.6 1.1-102.3-95.2-102.3-95.2l.3 1.5c0 0-4.5 13.9 8.5 35.6 30 50.1 54.9 69.3 89.2 69.3 33.3 0 43.5-17.6 75.3-17.6 31.2 0 42.4 17.6 76.2 17.6 47 0 79.5-62.7 79.5-62.7s-3.2 2.7-8.3 13.6c-13.4 28.5-39.1 63.2-84 63.2z"/></svg>
                          </div>
                          <div><p className="text-sm font-bold text-gray-800">{t('acal')}</p><p className="text-[10px] text-gray-400">{calendarSync.apple ? t('active') : t('notConnected')}</p></div>
                      </div>
                      <button onClick={()=>setCalendarSync({...calendarSync, apple: !calendarSync.apple})} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${calendarSync.apple ? 'bg-green-100 text-green-700' : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'}`}>{calendarSync.apple ? t('active') : t('disabled')}</button>
                  </div>
              </div>
          </div>
          
          <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold text-gray-900">{t('todaySchedule')}</h3>
              <button onClick={()=>setShowEventModal(true)} className="text-indigo-600 bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100 transition-colors"><Plus size={18}/></button>
          </div>

          <div className="space-y-3 pb-24">
              {(!calendarSync.google && !calendarSync.apple && localEvents.length === 0) ? (
                  <div className="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-300 mx-2">
                      <CalendarPlus className="mx-auto text-gray-300 mb-2" size={32}/>
                      <p className="text-gray-400 text-sm px-8">{t('syncManual')}</p>
                  </div>
              ) : (
                  <>
                    {(calendarSync.google || calendarSync.apple) && MOCK_EVENTS.map(ev => (
                        <div key={ev.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all cursor-pointer group">
                            <div className="flex flex-col items-center w-12 text-gray-400">
                                <span className="text-xs font-bold">{ev.time.split(':')[0]}</span>
                                <span className="text-[10px]">AM</span>
                            </div>
                            <div className="w-1 h-10 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 text-sm">{ev.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${ev.color}`}>{ev.platform}</span>
                                    <span className="text-[10px] text-gray-400">{ev.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {localEvents.map(ev => (
                        <div key={ev.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all cursor-pointer">
                            <div className="flex flex-col items-center w-12 text-indigo-500 font-bold">
                                <span className="text-xs">{ev.time}</span>
                            </div>
                            <div className="w-1 h-10 bg-indigo-500 rounded-full"></div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 text-sm">{ev.title}</h4>
                                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{t('manualEntry')}</span>
                            </div>
                            <button onClick={()=>setLocalEvents(localEvents.filter(e=>e.id!==ev.id))} className="text-gray-300 hover:text-red-500">
                                <Trash2 size={16}/>
                            </button>
                        </div>
                    ))}
                  </>
              )}
          </div>
          
          {showEventModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl w-full max-w-xs p-6 shadow-2xl animate-in zoom-in-95">
                      <h3 className="font-bold text-lg mb-4">{t('addEvent')}</h3>
                      <form onSubmit={handleAddEvent} className="space-y-4">
                          <div>
                              <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">{t('eventTitle')}</label>
                              <input autoFocus className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm" value={newEvent.title} onChange={e=>setNewEvent({...newEvent, title:e.target.value})}/>
                          </div>
                          <div className="flex gap-2">
                              <div className="flex-1">
                                  <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">{t('eventTime')}</label>
                                  <input type="time" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm" value={newEvent.time} onChange={e=>setNewEvent({...newEvent, time:e.target.value})}/>
                              </div>
                              <div className="flex-1">
                                  <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">{t('eventType')}</label>
                                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm appearance-none" value={newEvent.type} onChange={e=>setNewEvent({...newEvent, type:e.target.value})}>
                                      <option value="study">{t('typeStudy')}</option>
                                      <option value="deadline">{t('typeDeadline')}</option>
                                  </select>
                              </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                              <button type="button" onClick={()=>setShowEventModal(false)} className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl text-sm font-bold">{t('cancel')}</button>
                              <button type="submit" disabled={!newEvent.title || !newEvent.time} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-bold">Save</button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
      </div>
  );
};

export default Agenda;