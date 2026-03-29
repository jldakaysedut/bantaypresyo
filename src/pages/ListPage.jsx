import React, { useState, useEffect } from 'react';
import { Home, ClipboardList, LogOut, Wallet, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ListPage({ onNavigate }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('bantaypresyo_list')) || []);
  const [budget, setBudget] = useState(() => Number(localStorage.getItem('bantaypresyo_budget')) || 1000);

  useEffect(() => {
    localStorage.setItem('bantaypresyo_list', JSON.stringify(items));
    localStorage.setItem('bantaypresyo_budget', budget.toString());
  }, [items, budget]);

  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, is_done: !i.is_done } : i));
  const remove = (id) => setItems(items.filter(i => i.id !== id));
  
  const logout = async () => {
    try { await supabase.auth.signOut(); } finally { onNavigate('landing'); }
  };

  const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-[400px] h-[800px] bg-slate-50 relative overflow-hidden flex flex-col sm:rounded-[2.5rem] border-slate-800 border-8 shadow-2xl">
        <header className="bg-emerald-600 text-white p-8 rounded-b-[2rem]">
          <h1 className="text-2xl font-bold mb-4 tracking-tight">Listahan Ko</h1>
          <div className="bg-white/20 p-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold flex items-center gap-1"><Wallet size={12}/> Budget</p>
            <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="bg-transparent text-2xl font-bold outline-none w-full" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 pb-40">
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggle(item.id)} className={item.is_done ? "text-emerald-500" : "text-slate-300"}>
                    {item.is_done ? <CheckCircle2 /> : <Circle />}
                  </button>
                  <p className={`text-sm font-bold ${item.is_done ? 'line-through text-slate-400' : ''}`}>{item.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-bold text-emerald-600">₱{item.price}</p>
                  <button onClick={() => remove(item.id)} className="text-rose-400"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="absolute bottom-16 w-full bg-white p-6 border-t shadow-lg flex justify-between items-center">
          <p className="font-bold text-slate-500">Total:</p>
          <p className={`text-2xl font-black ${total > budget ? 'text-rose-600' : 'text-emerald-600'}`}>₱{total}</p>
        </div>

        <nav className="absolute bottom-0 w-full bg-slate-50 border-t p-4 flex justify-around items-center">
          <button onClick={() => onNavigate('dashboard')} className="text-slate-400 flex flex-col items-center"><Home size={20}/><span className="text-[10px]">Home</span></button>
          <button className="text-emerald-600 flex flex-col items-center"><ClipboardList size={20}/><span className="text-[10px]">Listahan</span></button>
          <button onClick={logout} className="text-slate-400 flex flex-col items-center"><LogOut size={20}/><span className="text-[10px]">Logout</span></button>
        </nav>
      </div>
    </div>
  );
}