import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Calendar as CalendarIcon, BarChart2, Users, User, LogOut, Globe, 
  RotateCcw, X, Menu
} from 'lucide-react';

import { auth, db } from './config/firebase';
import { onAuthStateChanged, signOut, signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// --- IMPORTS LOCALES ---
import { getT, LANGUAGES } from './data/translations';
import { LEVEL_THRESHOLDS, INITIAL_FRIENDS, QUOTES, FOCUS_SOUNDS } from './data/constants';

// --- IMPORTS DE COMPONENTES ---
import AuthScreen from './components/AuthScreen';
import Timer from './components/Timer';
import Agenda from './components/Agenda';
import Stats from './components/Stats';
import Social from './components/Social';
import Profile from './components/Profile';

const App = () => {
  // --- ESTADOS GLOBALES ---
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timer');
  const [userSettings, setUserSettings] = useState({ language: 'en' });
  const [showLangModal, setShowLangModal] = useState(false);

  // Estados de Datos 
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [friends, setFriends] = useState(INITIAL_FRIENDS); // Por ahora local
  const [localEvents, setLocalEvents] = useState([]);      // Por ahora local
  
  // Estados del Timer y Audio
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [activeSound, setActiveSound] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quote, setQuote] = useState(QUOTES[0]);
  
  // Estados Auxiliares
  const [newTask, setNewTask] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', type: 'study' });

  // Refs
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const t = (key, subKey) => getT(userSettings.language || 'en', key, subKey);
  const currentLevelMax = LEVEL_THRESHOLDS[level] || 10000;

  // --- EFECTOS (LÓGICA) ---

  // 1. Autenticación y Carga de Datos
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // ¡Aquí ocurre la magia! Cargamos los datos de la nube
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Si el usuario ya existe, cargamos sus datos
          const data = userSnap.data();
          setXp(data.xp || 0);
          setLevel(data.level || 1);
          setTasks(data.tasks || []);
        } else {
          // Si es nuevo, creamos su perfil en la base de datos (Gratis: 1 escritura)
          await setDoc(userRef, {
            email: currentUser.email,
            xp: 0,
            level: 1,
            tasks: [],
            createdAt: new Date()
          });
        }
      } else {
        // Si cierra sesión, reseteamos todo
        setXp(0);
        setLevel(1);
        setTasks([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Sistema de Audio
  useEffect(() => {
    try {
        if (activeSound) {
            const soundData = FOCUS_SOUNDS.find(s => s.id === activeSound);
            if (soundData) {
                if (!audioRef.current) audioRef.current = new Audio(soundData.url);
                else audioRef.current.src = soundData.url;
                
                audioRef.current.loop = true;
                audioRef.current.play().catch(e => console.warn("Audio play error:", e));
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        }
    } catch(e) { console.error("Audio Error", e); }
    
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    }
  }, [activeSound]);

  // 3. Lógica del Timer (Optimizado para ahorrar escrituras)
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // ¡EL TIMER TERMINÓ! 
      setIsActive(false); 
      clearInterval(timerRef.current);
      
      if (mode === 'focus') { 
          handleSessionComplete(); // Guardamos progreso en la nube
      } else {
          // Si termina el descanso, solo sonido
          new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
      }
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, mode]);

  // --- FUNCIONES DE BASE DE DATOS (SYNC) ---

  const handleSessionComplete = async () => {
      // 1. Efectos visuales inmediatos
      const xpGained = 100;
      setXp(prev => prev + xpGained); 
      setShowConfetti(true); 
      setTimeout(() => setShowConfetti(false), 5000);

      // 2. Cálculo de nivel
      let newLevel = level;
      if ((xp + xpGained) >= (LEVEL_THRESHOLDS[level] || 10000)) {
          newLevel = level + 1;
          setLevel(newLevel);
      }

      // 3. GUARDAR EN FIREBASE (Solo 1 escritura al terminar)
      if (user) {
          try {
              const userRef = doc(db, "users", user.uid);
              await updateDoc(userRef, {
                  xp: xp + xpGained,
                  level: newLevel
              });
              console.log("Progreso guardado en la nube ☁️");
          } catch (e) {
              console.error("Error guardando progreso", e);
          }
      }
  };

  const addTask = async (e) => { 
      e.preventDefault(); 
      if(!newTask.trim()) return; 

      const taskObj = { id: Date.now(), text: newTask, completed: false };
      
      // 1. Actualizar visualmente (rápido)
      const updatedTasks = [taskObj, ...tasks];
      setTasks(updatedTasks);
      setNewTask(''); 

      // 2. Guardar en Firebase
      if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { tasks: updatedTasks });
      }
  };

  const toggleTask = async (taskToToggle) => { 
      // 1. Actualizar visualmente
      const updatedTasks = tasks.map(t => 
          t.id === taskToToggle.id ? { ...t, completed: !t.completed } : t
      );
      setTasks(updatedTasks);

      // 2. Guardar en Firebase
      if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { tasks: updatedTasks });
      }
  };

  const deleteTask = async (id) => { 
      // 1. Actualizar visualmente
      const updatedTasks = tasks.filter(t => t.id !== id);
      setTasks(updatedTasks);

      // 2. Guardar en Firebase
      if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { tasks: updatedTasks });
      }
  };

  // --- RENDERIZADO ---

  if (loading) return <div className="flex items-center justify-center min-h-screen font-bold text-indigo-600 bg-gray-50 animate-pulse">Cargando SyncStudy...</div>;

  if (!user) return <AuthScreen onLoginSuccess={() => {}} />;

  return (
    <div className="relative flex flex-col items-center min-h-screen p-4 pb-24 font-sans text-gray-800 bg-gray-50 selection:bg-indigo-100">
      
      {/* Modal de Idioma */}
      {showLangModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
             <div className="bg-white rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                 <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-indigo-50/50">
                    <div><h2 className="flex items-center gap-2 text-xl font-black text-gray-900"><Globe className="text-indigo-600" /> Language</h2></div>
                    <button onClick={() => setShowLangModal(false)} className="p-2 text-gray-400 bg-white rounded-full hover:text-gray-600"><X size={20}/></button>
                 </div>
                 <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto custom-scrollbar">
                    {LANGUAGES.map(lang => (
                        <button key={lang.code} onClick={() => { setUserSettings({language: lang.code}); setShowLangModal(false); }} className="flex items-center gap-3 p-3 text-left transition-all border border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 group">
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-sm font-bold text-gray-700 group-hover:text-indigo-700">{lang.name}</span>
                        </button>
                    ))}
                 </div>
             </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 w-full max-w-md mx-auto">
        
        {/* Header */}
        <header className="flex items-center justify-between pt-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center text-white bg-indigo-600 shadow-lg w-9 h-9 rounded-xl shadow-indigo-200">
                <RotateCcw size={20} />
            </div>
            <div>
                <h1 className="text-2xl font-black tracking-tight text-gray-900">Sync<span className="text-indigo-600">Study</span></h1>
                <p className="text-[9px] font-bold text-indigo-400 tracking-widest uppercase">PRO</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden text-right sm:block">
                 <p className="text-xs font-bold text-gray-900">{user.displayName || "Estudiante"}</p>
                 <button onClick={() => signOut(auth)} className="text-[10px] text-red-400 hover:text-red-600 flex items-center gap-1 justify-end w-full">
                     {t('exit')} <LogOut size={10}/>
                 </button>
             </div>
             <button onClick={() => setShowLangModal(true)} className="relative overflow-hidden transition-transform bg-gray-200 border-2 border-white rounded-full shadow-md w-9 h-9 hover:scale-105 active:scale-95">
                 {user.photoURL ? 
                    <img src={user.photoURL} alt="Profile" className="object-cover w-full h-full" /> : 
                    <div className="flex items-center justify-center w-full h-full font-bold text-gray-500">{user.displayName?.charAt(0) || 'S'}</div>
                 }
             </button>
          </div>
        </header>

        {/* Content Tabs */}
        <main>
            {activeTab === 'timer' && (
                <Timer 
                    mode={mode} 
                    switchMode={(m) => { setMode(m); setIsActive(false); setTimeLeft(m==='focus'?25*60:m==='short'?5*60:15*60); }} 
                    timeLeft={timeLeft} isActive={isActive} 
                    toggleTimer={() => setIsActive(!isActive)} 
                    resetTimer={() => { setIsActive(false); setTimeLeft(mode==='focus'?25*60:mode==='short'?5*60:15*60); }} 
                    quote={quote} 
                    activeSound={activeSound} setActiveSound={setActiveSound} 
                    showConfetti={showConfetti} t={t} 
                    tasks={tasks} addTask={addTask}
                    toggleTask={toggleTask} deleteTask={deleteTask} 
                    newTask={newTask} setNewTask={setNewTask}
                />
            )}
            
            {activeTab === 'agenda' && (
                <Agenda 
                    localEvents={localEvents} // Eventos siguen siendo locales por ahora
                    handleAddEvent={(e) => { e.preventDefault(); setLocalEvents([...localEvents, { id: Date.now(), ...newEvent }]); setShowEventModal(false); }}
                    newEvent={newEvent} setNewEvent={setNewEvent}
                    showEventModal={showEventModal} setShowEventModal={setShowEventModal}
                    t={t}
                />
            )}
            
            {activeTab === 'stats' && <Stats user={user} t={t} />}
            
            {activeTab === 'social' && (
                <Social 
                    friends={friends} // Amigos siguen siendo locales por ahora
                    addFriend={(e) => e.preventDefault()} 
                    t={t} newFriendName={""} setNewFriendName={() => {}}
                />
            )}
            
            {activeTab === 'profile' && <Profile user={user} t={t} xp={xp} level={level} />}
        </main>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl shadow-indigo-900/10 rounded-2xl p-1.5 flex gap-1 z-50">
        {[
          { id: 'timer', icon: <Clock size={20}/>, label: t('timer') },
          { id: 'agenda', icon: <CalendarIcon size={20}/>, label: t('agenda') },
          { id: 'stats', icon: <BarChart2 size={20}/>, label: t('stats') },
          { id: 'social', icon: <Users size={20}/>, label: t('social') },
          { id: 'profile', icon: <User size={20}/>, label: t('profile') },
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={()=>setActiveTab(tab.id)} 
            className={`px-3 py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 min-w-[60px] ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            {tab.icon} 
            <span className="text-[8px] font-bold tracking-wide mt-0.5">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
