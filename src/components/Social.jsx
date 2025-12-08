import React, { useState, useEffect } from 'react';
import { Users, Search, UserPlus, UserMinus, AlertCircle, Loader2, User } from 'lucide-react';
import { 
  collection, query, where, getDocs, updateDoc, doc, arrayUnion, arrayRemove, getDoc, getFirestore 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { db, auth } from '../config/firebase';

const Social = ({ user, t = (key) => key }) => {   
  // Estados de Datos
  const [myFriends, setMyFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  // Estados de UI
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  
  // Estados para Modal de Borrado
  const [friendToDelete, setFriendToDelete] = useState(null);

  // CARGAR AMIGOS 
  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return;
      try {
        const myDoc = await getDoc(doc(db, "users", user.uid));
        if (myDoc.exists()) {
            const friendIds = myDoc.data()?.friends || [];
            if (friendIds.length > 0) {
                const friendsData = [];
                for (const id of friendIds) {
                    const fDoc = await getDoc(doc(db, "users", id));
                    if (fDoc.exists()) {
                        friendsData.push({ id: fDoc.id, ...fDoc.data() });
                    }
                }
                setMyFriends(friendsData);
            }
        }
      } catch (e) { console.error("Error cargando amigos", e); }
    };
    fetchFriends();
  }, [user]);

  // BUSCAR USUARIOS 
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchName.trim()) return;
    setLoading(true); setMsg(''); setSearchResults([]);
    
    try {
      console.log("🔍 Buscando usuario:", searchName); // LOG DE DEPURACIÓN
      
      const q = query(collection(db, "users"), where("displayName", "==", searchName));
      const querySnapshot = await getDocs(q);
      
      const found = [];
      querySnapshot.forEach((d) => {
        if (d.id !== user.uid) found.push({ id: d.id, ...d.data() });
      });
      
      console.log("✅ Resultados encontrados:", found.length); // LOG DE DEPURACIÓN
      
      setSearchResults(found);
      if (found.length === 0) setMsg('Usuario no encontrado.');
      
    } catch (error) { 
      console.error("❌ ERROR CRÍTICO AL BUSCAR:", error);
      
      if (error.code === 'permission-denied') {
          setMsg('Error de permisos. Revisa las reglas de Firestore.');
      } else if (error.code === 'failed-precondition') {
          setMsg('Falta crear un índice. Mira la consola para el link.');
      } else {
          setMsg(`Error técnico: ${error.message}`); 
      }
    } 
    finally { setLoading(false); }
  };

  // AGREGAR AMIGO
  const executeAddFriend = async (friendId, friendName) => {
    try {
      await updateDoc(doc(db, "users", user.uid), { friends: arrayUnion(friendId) });
      setMsg(`¡${friendName} agregado!`);
      setSearchResults([]); setSearchName('');
      // Actualizar UI localmente
      setMyFriends(prev => [...prev, { id: friendId, displayName: friendName, level: 1 }]);
    } catch (error) { console.error(error); setMsg('Error al agregar.'); }
  };

  // ELIMINAR AMIGO (Lógica del Modal)
  const executeRemoveFriend = async () => {
    if (!friendToDelete) return;
    try {
      await updateDoc(doc(db, "users", user.uid), { friends: arrayRemove(friendToDelete.id) });
      setMyFriends(prev => prev.filter(f => f.id !== friendToDelete.id));
      setFriendToDelete(null);
    } catch (error) { console.error(error); }
  };

  return (
    <div className="pb-24 space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-4">
       
       {/* --- MODAL DE CONFIRMACIÓN (Tu diseño) --- */}
       {friendToDelete && (
           <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
               <div className="w-full max-w-xs p-6 text-center bg-white shadow-2xl rounded-2xl">
                   <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-500 bg-red-100 rounded-full"><AlertCircle size={24}/></div>
                   <h3 className="mb-2 text-lg font-bold">Eliminar amigo</h3>
                   <p className="mb-6 text-sm text-gray-500">¿Estás seguro de que quieres eliminar a <strong>{friendToDelete.displayName}</strong>?</p>
                   <div className="flex gap-2">
                       <button onClick={()=>setFriendToDelete(null)} className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl font-bold text-sm">Cancelar</button>
                       <button onClick={executeRemoveFriend} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm">Eliminar</button>
                   </div>
               </div>
           </div>
       )}

       {/* --- CAJA PRINCIPAL --- */}
       <div className="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-3xl">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="flex items-center gap-2 font-bold text-gray-900">
                  <Users className="text-indigo-500" size={20} /> Lista de Amigos
              </h3>
              <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full">{myFriends.length}</span>
          </div>
          
          {/* Buscador */}
          <div className="p-4 space-y-3 border-b border-gray-100 bg-gray-50">
              <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                      <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={16} />
                      <input 
                          type="text" 
                          value={searchName} 
                          onChange={(e) => setSearchName(e.target.value)} 
                          placeholder="Buscar usuario por nombre..." 
                          className="w-full py-2 pr-4 text-sm transition-colors bg-white border border-gray-200 outline-none pl-9 rounded-xl focus:border-indigo-500"
                      />
                  </div>
                  <button type="submit" disabled={!searchName.trim() || loading} className="p-2 text-white transition-colors bg-indigo-600 rounded-xl disabled:opacity-50 hover:bg-indigo-700">
                      {loading ? <Loader2 size={18} className="animate-spin"/> : <Search size={18} />}
                  </button>
              </form>
              
              {/* Resultados de Búsqueda */}
              {searchResults.length > 0 && (
                  <div className="p-2 space-y-2 bg-white border border-indigo-100 rounded-xl animate-in slide-in-from-top-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase ml-2">Resultados</p>
                      {searchResults.map(res => (
                          <div key={res.id} className="flex items-center justify-between p-2 transition-colors rounded-lg hover:bg-indigo-50">
                              <div className="flex items-center gap-2">
                                  <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full">{res.displayName?.[0]}</div>
                                  <span className="text-sm font-bold text-gray-700">{res.displayName}</span>
                              </div>
                              <button onClick={() => executeAddFriend(res.id, res.displayName)} className="bg-indigo-600 text-white p-1.5 rounded-lg"><UserPlus size={14}/></button>
                          </div>
                      ))}
                  </div>
              )}
              {msg && <p className="p-2 text-xs font-medium text-center text-red-500 rounded-lg bg-red-50">{msg}</p>}
          </div>

          {/* Lista de Amigos */}
          <div className="overflow-y-auto divide-y divide-gray-100 max-h-96">
             {myFriends.length === 0 && <div className="p-8 text-sm text-center text-gray-400">No tienes amigos agregados aún.</div>}
             
             {myFriends.map((friend) => (
               <div key={friend.id} className="flex items-center justify-between p-4 transition-colors group hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                     <div className="relative">
                        <div className="flex items-center justify-center w-10 h-10 overflow-hidden text-sm font-bold text-indigo-700 bg-indigo-100 rounded-full">
                            {friend.photoURL ? <img src={friend.photoURL} className="object-cover w-full h-full" /> : friend.displayName?.[0]}
                        </div>
                        {/* Indicador de estado simulado */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full bg-green-500"></div>
                     </div>
                     <div>
                        <p className="text-sm font-bold text-gray-800">{friend.displayName}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                           Nivel {friend.level || 1} • {friend.xp || 0} XP
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <button onClick={() => setFriendToDelete(friend)} className="p-2 text-gray-300 transition-all rounded-lg hover:text-red-500 hover:bg-red-50" title="Eliminar">
                        <UserMinus size={18} />
                     </button>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Social;