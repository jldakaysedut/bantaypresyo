import React, { useState, useEffect } from 'react';
import { 
  Home, ClipboardList, Wallet, CheckCircle2, 
  Circle, Trash2, AlertCircle, LogOut 
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ListPage({ onNavigate }) {
  // 1. Load data from Local Storage (Offline functionality)
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('bantaypresyo_list');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('bantaypresyo_budget');
    return savedBudget ? Number(savedBudget) : 1000;
  });

  // 2. Sync changes back to Local Storage
  useEffect(() => {
    localStorage.setItem('bantaypresyo_list', JSON.stringify(items));
    localStorage.setItem('bantaypresyo_budget', budget.toString());
  }, [items, budget]);

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, is_done: !item.is_done } : item));
    if (navigator.vibrate) navigator.vibrate(50); 
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      onNavigate('landing');
    }
  };

  // 3. Math for the Budget Tracker
  const totalSpent = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const isOverBudget = totalSpent > budget;

  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen font-sans text-slate-900">
      <div className="w-full max-w-[400px] h-[800px] bg-slate-50 relative overflow-hidden flex flex-col sm:rounded-[2.5rem] shadow-2xl border-slate-800 sm:border-8">
        
        {/* Header - Budget Section */}
        <header className="bg-emerald-600 text-white px-6 pt-10 pb-6 rounded-b-[2rem] shadow-md z-10 relative">
          <h1 className="text-2xl font-bold tracking-tight mb-4">Listahan Ko</h1>
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-emerald-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Wallet size={12} /> Palengke Budget
              </span>
            </div>
            <div className="flex items-center text-3xl font-black">
              ₱ <input 
                  type="number" 
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))} 
                  className="bg-transparent border-none focus:outline-none w-full ml-1 placeholder-emerald-200" 
                />
            </div>
          </div>
        </header>

        {/* List Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-5 pb-32 z-20">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-70 mt-10">
              <ClipboardList size={64} className="mb-4" />
              <p className="text-sm font-bold">Walang laman ang listahan.</p>
              <p className="text-xs">Mag-add ng items sa Home screen.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className={`bg-white p-4 rounded-2xl shadow-sm border flex items-center justify-between transition-all ${item.is_done ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <button onClick={() => toggleItem(item.id)} className={`${item.is_done ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-400'}`}>
                      {item.is_done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    <div>
                      <div className={`font-bold text-sm ${item.is_done ? 'text-slate-400 line-through font-normal' : 'text-slate-800'}`}>{item.name}</div>
                      <div className="text-emerald-600 font-bold text-xs">₱{item.price} <span className="text-slate-400 font-normal">x {item.quantity}</span></div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-600 p-2 bg-rose-50 rounded-xl transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Floating Total Display */}
        <div className="absolute bottom-16 w-full bg-white border-t border-slate-100 p-5 pb-8 z-30 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-end">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total:</div>
            <div className={`text-2xl font-black flex items-center gap-2 ${isOverBudget ? 'text-rose-600' : 'text-emerald-600'}`}>
              {isOverBudget && <AlertCircle size={20} className="text-rose-500 animate-pulse" />}
              ₱{totalSpent.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 w-full bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-between items-center z-40">
          <div onClick={() => onNavigate('dashboard')} className="flex flex-col items-center text-slate-400 hover:text-emerald-500 gap-1.5 cursor-pointer transition-colors">
            <Home size={22} />
            <span className="text-[10px] font-semibold">Home</span>
          </div>
          <div className="flex flex-col items-center text-emerald-600 gap-1.5 cursor-pointer">
            <ClipboardList size={22} />
            <span className="text-[10px] font-bold">Listahan</span>
          </div>
          <div onClick={handleLogout} className="flex flex-col items-center text-slate-400 hover:text-rose-500 gap-1.5 cursor-pointer transition-colors">
            <LogOut size={22} />
            <span className="text-[10px] font-semibold">Logout</span>
          </div>
        </nav>
        
      </div>
    </div>
  );
}