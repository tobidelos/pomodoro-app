// src/App.jsx (Ejemplo de cómo quedaría)
import { useState, useEffect } from 'react';
import { auth } from './config/firebase'; // Importas desde tu config
import AuthScreen from './components/AuthScreen';
import Timer from './components/Timer';
// ... otros imports

const App = () => {
  const [user, setUser] = useState(null);
  // ... lógica de auth state

  if (!user) return <AuthScreen />;

  return (
     <div className="...">
        {/* Header */}
        
        {activeTab === 'timer' && <Timer user={user} />}
        {activeTab === 'stats' && <Stats user={user} />}
        
        {/* Navbar */}
     </div>
  );
}