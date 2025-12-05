export const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];
  
  export const TRANSLATIONS = {
    en: { 
      timer: 'Timer', social: 'Social', agenda: 'Agenda', stats: 'Stats', profile: 'Profile',
      focus: 'Study', short: 'Short Break', long: 'Long Break', start: 'Start', pause: 'Pause', 
      tasks: 'Tasks', newTask: 'New task...', progress: 'Progress', cycles: 'Cycles',
      sync: 'Calendar Sync', active: 'Connected', disabled: 'Connect', notConnected: 'Not Connected',
      admin: 'Admin', exit: 'Log Out', keepFocus: 'Keep the focus 🔥', ready: 'Ready to study', 
      complete: 'Cycle complete!', 
      addEvent: 'Add Session', eventTitle: 'Event Title', eventTime: 'Time', eventType: 'Type',
      typeStudy: 'Study Session', typeDeadline: 'Deadline / Exam',
      level: 'Level', xp: 'XP', badges: 'Badges', sounds: 'Focus Sounds',
      gcal: 'Google Calendar', acal: 'Apple Calendar',
      compare: 'Compare with friends', myStats: 'My Statistics', trend: 'Growth Trend',
      day: 'Day', week: 'Week', month: 'Month',
      friendsList: 'My Friends', addFriend: 'Add friend...', lastSeen: 'Last seen',
      studying: 'Studying', remove: 'Remove',
      todaySchedule: "Today's Schedule",
      syncManual: "Sync calendars or add events manually.",
      manualEntry: "Manual Entry",
      confirmTitle: "Remove Friend?",
      confirmMsg: "Are you sure you want to remove",
      cancel: "Cancel", confirmYes: "Yes, remove",
      viewProfile: "View Profile", backToSocial: "Back to Social",
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      easy: 'Easy', medium: 'Medium', hard: 'Hard',
      badgeLocked: 'Locked: Reach higher XP to unlock.',
      noEvents: "No events scheduled for today.",
      
      quotes: [
        { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
        { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
      ],
  
      badgesData: {
        first_step: { name: 'Start', desc: 'Complete your first study session.' },
        on_fire: { name: 'On Fire', desc: 'Reach a 3-day study streak.' },
        social: { name: 'Social', desc: 'Add a friend to your network.' },
        coffee: { name: 'Caffeine', desc: 'Take 5 short breaks.' },
        bookworm: { name: 'Reader', desc: 'Study for 1 hour total.' },
        night_owl: { name: 'Owl', desc: 'Complete a session after 10 PM.' },
        scholar: { name: 'Scholar', desc: 'Complete 100 total study cycles.' },
        early_bird: { name: 'Early Bird', desc: 'Start a session before 7 AM.' },
        marathon: { name: 'Marathon', desc: 'Study for 4 hours in one day.' },
        weekend: { name: 'Warrior', desc: 'Study on both Saturday and Sunday.' },
        music: { name: 'Vibes', desc: 'Use background sounds for 10 sessions.' },
        math_wiz: { name: 'Math Wiz', desc: 'Tag "Math" in 10 sessions.' },
        focus_god: { name: 'Zen Master', desc: 'Complete 10 sessions without pausing.' },
        nightmare: { name: 'Grinder', desc: 'Study for 8 hours in one day.' },
        legend: { name: 'Legend', desc: 'Reach Level 50.' },
        bot: { name: 'Cyborg', desc: 'Maintain a 30-day streak.' },
        global: { name: 'Global', desc: 'Study 5 different subjects.' },
        time: { name: 'Timelord', desc: 'Accumulate 1000 hours of study.' },
      }
    },
    es: { 
      timer: 'Temporizador', social: 'Social', agenda: 'Agenda', stats: 'Estadísticas', profile: 'Perfil',
      focus: 'Estudio', short: 'Descanso Corto', long: 'Descanso Largo', start: 'Iniciar', pause: 'Pausar', 
      tasks: 'Tareas', newTask: 'Nueva tarea...', progress: 'Progreso', cycles: 'Ciclos',
      sync: 'Sincronización', active: 'Conectada', disabled: 'Conectar', notConnected: 'No conectada',
      admin: 'Admin', exit: 'Salir', keepFocus: 'Mantén el enfoque 🔥', ready: 'Listo para estudiar', 
      complete: '¡Ciclo completado!', 
      addEvent: 'Agendar Sesión', eventTitle: 'Título', eventTime: 'Hora', eventType: 'Tipo',
      typeStudy: 'Sesión de Estudio', typeDeadline: 'Entrega / Examen',
      level: 'Nivel', xp: 'XP', badges: 'Logros', sounds: 'Sonidos',
      gcal: 'Google Calendar', acal: 'Apple Calendar',
      compare: 'Comparar con amigos', myStats: 'Mis Estadísticas', trend: 'Tendencia de Crecimiento',
      day: 'Día', week: 'Semana', month: 'Mes',
      friendsList: 'Mis Amigos', addFriend: 'Agregar amigo...', lastSeen: 'Visto',
      studying: 'Estudiando', remove: 'Eliminar',
      todaySchedule: "Agenda de Hoy",
      syncManual: "Sincroniza calendarios o añade eventos manualmente.",
      manualEntry: "Manual",
      confirmTitle: "¿Eliminar Amigo?",
      confirmMsg: "¿Seguro que quieres eliminar a",
      cancel: "Cancelar", confirmYes: "Sí, eliminar",
      viewProfile: "Ver Perfil", backToSocial: "Volver a Social",
      days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      easy: 'Fácil', medium: 'Medio', hard: 'Difícil',
      badgeLocked: 'Bloqueado: Consigue más XP para desbloquear.',
      noEvents: "No hay eventos programados para hoy.",
  
      quotes: [
        { text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier" },
        { text: "El experto en cualquier cosa fue una vez un principiante.", author: "Helen Hayes" },
        { text: "No mires el reloj; haz lo que él hace. Sigue adelante.", author: "Sam Levenson" }
      ],
  
      badgesData: {
        first_step: { name: 'Inicio', desc: 'Completa tu primera sesión de estudio.' },
        on_fire: { name: 'En Racha', desc: 'Consigue una racha de 3 días.' },
        social: { name: 'Social', desc: 'Añade a un amigo a tu red.' },
        coffee: { name: 'Cafeína', desc: 'Toma 5 descansos cortos.' },
        bookworm: { name: 'Lector', desc: 'Estudia por 1 hora en total.' },
        night_owl: { name: 'Búho', desc: 'Completa una sesión después de las 10 PM.' },
        scholar: { name: 'Erudito', desc: 'Completa 100 ciclos de estudio.' },
        early_bird: { name: 'Madrugador', desc: 'Empieza una sesión antes de las 7 AM.' },
        marathon: { name: 'Maratón', desc: 'Estudia 4 horas en un día.' },
        weekend: { name: 'Guerrero', desc: 'Estudia sábado y domingo.' },
        music: { name: 'Vibras', desc: 'Usa sonidos de fondo en 10 sesiones.' },
        math_wiz: { name: 'Matemático', desc: 'Etiqueta "Matemáticas" en 10 sesiones.' },
        focus_god: { name: 'Maestro Zen', desc: 'Completa 10 sesiones sin pausar.' },
        nightmare: { name: 'Intenso', desc: 'Estudia 8 horas en un día.' },
        legend: { name: 'Leyenda', desc: 'Alcanza el Nivel 50.' },
        bot: { name: 'Cyborg', desc: 'Mantén una racha de 30 días.' },
        global: { name: 'Global', desc: 'Estudia 5 materias diferentes.' },
        time: { name: 'Señor Tiempo', desc: 'Acumula 1000 horas de estudio.' },
      }
    },
  };
  
  export const getT = (lang, key, subKey) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    if (subKey && dict[key]) return dict[key][subKey];
    return dict[key] || TRANSLATIONS['en'][key] || key;
  };