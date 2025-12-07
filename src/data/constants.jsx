import { Clock, Calendar, BarChart2, Users, User } from 'lucide-react';

export const LEVEL_THRESHOLDS = {
  1: 500,
  2: 1200,
  3: 2500,
  4: 5000,
  5: 10000
};

export const INITIAL_FRIENDS = [
  { id: 'f1', name: 'Ana Garcia', status: 'online', avatar: 'bg-emerald-100 text-emerald-700', level: 4, xp: 4200 },
  { id: 'f2', name: 'Carlos Ruiz', status: 'offline', avatar: 'bg-blue-100 text-blue-700', level: 2, xp: 1800 }
];

export const FOCUS_SOUNDS = [
  { id: 'rain', name: 'Lluvia Suave', url: '/src/assets/lluvia-rain-110426.mp3' },
  { id: 'forest', name: 'Bosque', url: '/src/assets/forest-ambience-296528.mp3' },
  { id: 'cafe', name: 'Cafetería', url: '/src/assets/ambient-sound-inside-cafeteria-18255.mp3' }
];

export const QUOTES = [
  { text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier" },
  { text: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
  { text: "La mejor forma de predecir el futuro es crearlo.", author: "Peter Drucker" }
];

export const FRIEND_STATS_AVG = {
  daily: 45,
  weekly: 312,
  monthly: 1250,
  growth: 12.5
};

export const USER_DATA = {
  name: "Estudiante",
  handle: "@student_pro",
  avatar: "https://github.com/shadcn.png",
  followers: "12.5k",
  following: "842",
  posts: "342"
};

export const ANALYTICS_DATA = [
  { day: 'Mon', views: 2400, engagement: 140 },
  { day: 'Tue', views: 1398, engagement: 98 },
  { day: 'Wed', views: 9800, engagement: 890 },
  { day: 'Thu', views: 3908, engagement: 402 },
  { day: 'Fri', views: 4800, engagement: 380 },
  { day: 'Sat', views: 3800, engagement: 290 },
  { day: 'Sun', views: 4300, engagement: 310 },
];