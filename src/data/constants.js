// Mocks y Constantes (Badges, Sounds, Mocks)
import { CloudRain, Coffee, Wind } from 'lucide-react';
import React from 'react';

export const MOCK_EVENTS = [
  { id: 1, title: 'Physics II Review', time: '10:00 - 12:00', platform: 'Google', type: 'study', color: 'bg-blue-100 text-blue-700' },
  { id: 2, title: 'Project Delivery', time: '14:00', platform: 'Apple', type: 'deadline', color: 'bg-red-100 text-red-700' },
];

export const MOCK_STATS_DATA = {
  day: {
    trend: [10, 25, 45, 30, 60, 50, 75], 
    user: [15, 30, 0, 45, 60, 20, 10], 
    friends: [10, 20, 15, 30, 40, 30, 20],
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
  },
  week: {
    trend: [40, 55, 45, 70, 65, 85, 95],
    user: [120, 150, 100, 180, 200, 90, 110],
    friends: [100, 120, 110, 140, 160, 100, 90],
  },
  month: {
    trend: [300, 380, 450, 550],
    user: [1200, 1500, 1100, 1800],
    friends: [1000, 1300, 1200, 1600],
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
  }
};

export const INITIAL_FRIENDS = [
  { id: 1, name: 'Sofia M.', cycles: 15, time: '6h 15m', status: 'online', avatar: 'bg-pink-200 text-pink-700', lastSeen: 'Now', lastTopic: 'Physics II', xp: 4500, level: 4, badges: ['first_step', 'on_fire', 'scholar'] },
  { id: 2, name: 'Lucas R.', cycles: 8, time: '3h 20m', status: 'offline', avatar: 'bg-yellow-200 text-yellow-700', lastSeen: '2h ago', lastTopic: 'Calculus', xp: 2100, level: 2, badges: ['first_step'] },
];

export const BADGES_CONFIG = [
  { id: 'first_step', icon: '🦶', difficulty: 1, req: 1 },
  { id: 'on_fire', icon: '🔥', difficulty: 1, req: 3 },
  { id: 'social', icon: '🤝', difficulty: 1, req: 300 },
  { id: 'coffee', icon: '☕', difficulty: 1, req: 50 },
  { id: 'bookworm', icon: '🐛', difficulty: 1, req: 60 },
  { id: 'night_owl', icon: '🦉', difficulty: 2, req: 500 },
  { id: 'scholar', icon: '🎓', difficulty: 2, req: 1000 },
  { id: 'early_bird', icon: '🐦', difficulty: 2, req: 800 },
  { id: 'marathon', icon: '🏃', difficulty: 2, req: 1200 },
  { id: 'weekend', icon: '⚔️', difficulty: 2, req: 900 },
  { id: 'music', icon: '🎧', difficulty: 2, req: 750 },
  { id: 'math_wiz', icon: '➗', difficulty: 2, req: 1100 },
  { id: 'focus_god', icon: '🧘', difficulty: 3, req: 2000 },
  { id: 'nightmare', icon: '💪', difficulty: 3, req: 3000 },
  { id: 'legend', icon: '👑', difficulty: 3, req: 5000 },
  { id: 'bot', icon: '🤖', difficulty: 3, req: 4000 },
  { id: 'global', icon: '🌍', difficulty: 3, req: 2500 },
  { id: 'time', icon: '⏳', difficulty: 3, req: 10000 },
];

export const FOCUS_SOUNDS = [
  { id: 'rain', name: 'Rain', icon: <CloudRain size={16}/>, url: 'https://raw.githubusercontent.com/sound-effects/rain/master/rain_heavy.mp3' },
  { id: 'cafe', name: 'Cafe', icon: <Coffee size={16}/>, url: 'https://raw.githubusercontent.com/sound-effects/ambience/master/cafe.mp3' },
  { id: 'white', name: 'White', icon: <Wind size={16}/>, url: 'https://raw.githubusercontent.com/sound-effects/white-noise/master/white-noise.mp3' },
];

export const LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 5000, 8000, 12000];