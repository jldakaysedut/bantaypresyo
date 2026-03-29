import React, { useState, useEffect } from 'react';
import { MapPin, Search, SlidersHorizontal, Home, ClipboardList, LogOut, PlusCircle } from 'lucide-react';
import { supabase } from '../lib/supabase'; 

export default function Dashboard({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState('Cebu'); 
  const [toast, setToast] = useState('');

  useEffect(() => {
    async function getPrices() {
      setLoading(true);
      const { data } = await supabase.from('bilihin').select('*').eq('province', selectedProvince);
      if (data) setItems(data);
      setLoading(false);
    }
    getPrices();
  }, [selectedProvince]);

  const addToStorage = (item) => {
    const list = JSON.parse(localStorage.getItem('bantaypresyo_list')) || [];
    const idx = list.findIndex(i => i.name === item.name);
    if (idx >= 0) list[idx].quantity += 1;
    else list.push({ ...item, id: crypto.randomUUID(), quantity: 1, is_done: false });
    
    localStorage.setItem('bantaypresyo_list', JSON.stringify(list));
    setToast(`Added ${item.name}!`);
    setTimeout(() => setToast(''), 2000);
  };

  const logout = async () => {
    try { await supabase.auth.signOut(); } 
    catch (e) { console.error(e); } 
    finally { onNavigate('landing'); }
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-[400px] h-[800px] bg-slate-50 relative overflow-hidden flex flex-col sm:rounded-[2.5rem] border-slate-800 border-8 shadow-2xl">
        
        <header className="bg-emerald-600 text-white p-6 pb-8 rounded-b-[2rem] shadow-lg">
          <h1 className="text-2xl font-bold">Bantay Presyo</h1>
          <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} className="bg-emerald-700 mt-2 p-1 rounded text-sm outline-none">
            <option value="Cebu">Cebu</option>
            <option value="Metro Manila">Metro Manila</option>
            <option value="Davao">Davao</option>
          </select>
        </header>

        {toast && <div className="absolute top-32 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-xs z-50">{toast}</div>}

        <main className="flex-1 overflow-y-auto p-5 pb-24">
          <div className="space-y-3">
            {loading ? <p className="text-center mt-10">Loading...</p> : items.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-emerald-600">₱{item.price}</p>
                  <button onClick={() => addToStorage(item)} className="text-emerald-500"><PlusCircle size={24} /></button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <nav className="absolute bottom-0 w-full bg-white border-t p-4 flex justify-around items-center">
          <button className="text-emerald-600 flex flex-col items-center"><Home size={20}/><span className="text-[10px]">Home</span></button>
          <button onClick={() => onNavigate('list')} className="text-slate-400 flex flex-col items-center"><ClipboardList size={20}/><span className="text-[10px]">Listahan</span></button>
          <button onClick={logout} className="text-slate-400 flex flex-col items-center"><LogOut size={20}/><span className="text-[10px]">Logout</span></button>
        </nav>
      </div>
    </div>
  );
}