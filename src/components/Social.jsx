import React from 'react';
import { Users, Search, UserPlus, UserMinus, AlertCircle } from 'lucide-react';

const Social = ({ 
  friends, addFriend, removeFriend, t, newFriendName, setNewFriendName, 
  setSelectedFriend, friendToDelete, setFriendToDelete, executeRemoveFriend 
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
       {friendToDelete && (
           <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in zoom-in-95">
               <div className="bg-white rounded-2xl p-6 w-full max-w-xs text-center shadow-2xl">
                   <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle size={24}/></div>
                   <h3 className="font-bold text-lg mb-2">{t('confirmTitle')}</h3>
                   <p className="text-sm text-gray-500 mb-6">{t('confirmMsg')} <strong>{friends.find(f=>f.id===friendToDelete)?.name}</strong>?</p>
                   <div className="flex gap-2">
                       <button onClick={()=>setFriendToDelete(null)} className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl font-bold text-sm">{t('cancel')}</button>
                       <button onClick={executeRemoveFriend} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm">{t('confirmYes')}</button>
                   </div>
               </div>
           </div>
       )}

       <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between"><h3 className="font-bold text-gray-900 flex items-center gap-2"><Users className="text-indigo-500" size={20} /> {t('friendsList')}</h3><span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-full">{friends.length}</span></div>
          <form onSubmit={addFriend} className="p-4 bg-gray-50 border-b border-gray-100 flex gap-2"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" value={newFriendName} onChange={(e) => setNewFriendName(e.target.value)} placeholder={t('addFriend')} className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"/></div><button type="submit" disabled={!newFriendName.trim()} className="bg-indigo-600 text-white p-2 rounded-xl disabled:opacity-50 hover:bg-indigo-700 transition-colors"><UserPlus size={18} /></button></form>
          <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
             {friends.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No friends added yet.</div>}
             {friends.map((friend) => (
               <div key={friend.id} onClick={() => setSelectedFriend(friend)} className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                     <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${friend.avatar}`}>{friend.name.charAt(0)}</div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${friend.status === 'online' || friend.status === 'focus' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                     </div>
                     <div>
                        <p className="text-sm font-bold text-gray-800">{friend.name}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                           {friend.status === 'online' ? <span className="text-green-600 font-medium">{t('studying')}: {friend.lastTopic}</span> : <span>{t('lastSeen')} {friend.lastSeen}</span>}
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="text-indigo-600 text-xs font-bold bg-indigo-50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">{t('viewProfile')}</button>
                     <button onClick={(e) => { e.stopPropagation(); setFriendToDelete(friend.id); }} className="text-gray-300 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-all" title={t('remove')}>
                        <UserMinus size={16} />
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