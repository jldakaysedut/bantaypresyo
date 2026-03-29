import React, { useState, useEffect } from 'react';
import { 
  MapPin, Search, SlidersHorizontal, 
  Calculator, Home, ClipboardList, LogOut, PlusCircle 
} from 'lucide-react';
import { supabase } from '../lib/supabase'; 

export default function Dashboard({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState('Cebu'); 
  const [toastMessage, setToastMessage] = useState('');

  // Fetch Live Prices mula sa Supabase
  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      const { data, error } = await supabase
        .from('bilihin')
        .select('*')
        .eq('province', selectedProvince);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setItems(data); 
      }
      setLoading(false);
    }
    fetchPrices();
  }, [selectedProvince]);

  // Price Snapshotting & Offline Save
  const handleAddToList = (item) => {
    const savedList = JSON.parse(localStorage.getItem('bantaypresyo_list')) || [];
    const existingIndex = savedList.findIndex(i => i.name === item.name);
    
    if (existingIndex >= 0) {
      savedList[existingIndex].quantity += 1;
    } else {
      savedList.push({
        id: crypto.randomUUID(),
        name: item.name,
        price: item.price, 
        category: item.category,
        icon: item.icon,
        quantity: 1,
        is_done: false
      });
    }
    
    localStorage.setItem('bantaypresyo_list', JSON.stringify(savedList));
    if (navigator.vibrate) navigator.vibrate(50);
    setToastMessage(`Naidagdag ang ${item.name}!`);
    setTimeout(() => setToastMessage(''), 2000); 
  };

  // FIXED LOGOUT: Gumagana kahit Guest o Registered User
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      onNavigate('landing');
    }
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen font-sans">
      <div className="w-full max-w-[400px] h-[800px] bg-slate-50 relative overflow-hidden flex flex-col sm:rounded-[2.5rem] sm:shadow-2xl sm:border-8 border-slate-800">
        
        {/* Header */}
        <header className="bg-emerald-600 text-white px-6 pt-6 pb-8 rounded-b-[2rem] shadow-md z-10 relative">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Bantay Presyo</h1>
              <div className="flex items-center gap-1 mt-1 bg-emerald-700/50 rounded-lg px-2 py-1 w-max">
                <MapPin size={14} className="text-emerald-100" />
                <select 
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="bg-transparent text-emerald-50 text-sm font-medium focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Cebu" className="text-slate-800">Cebu</option>
                  <option value="Metro Manila" className="text-slate-800">Metro Manila</option>
                  <option value="Davao" className="text-slate-800">Davao</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold shadow-inner uppercase">DK</div>
                <p className="text-[10px] text-emerald-100 font-medium">Dev: dkay</p>
            </div>
          </div>
        </header>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-28 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg z-50 animate-bounce">
            {toastMessage}
          </div>
        )}

        <main className="flex-1 overflow-y-auto no-scrollbar pb-24 -mt-4 z-20">
          <div className="px-5 pt-2 mb-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input type="text" placeholder="Maghanap..." className="w-full bg-white border border-slate-200 py-3 pl-11 pr-4 rounded-full shadow-sm focus:outline-none text-sm" />
            </div>
            <button className="bg-white border border-slate-200 text-slate-500 w-12 rounded-2xl shadow-sm flex items-center justify-center">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="px-5">
            <h2 className="text-slate-800 font-semibold mb-3 text-sm">Live Updates: {selectedProvince}</h2>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              </div>
            ) : items.length === 0 ? (
              <p className="text-center text-slate-400 text-sm mt-5">Walang data.</p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center text-xl border border-slate-100 shadow-sm">{item.icon}</div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                        <div className="text-slate-400 text-[10px] font-medium uppercase">{item.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-emerald-600 text-lg">₱{item.price}</div>
                        <div className="text-slate-300 text-[10px] font-medium">/ kilo</div>
                      </div>
                      <button onClick={() => handleAddToList(item)} className="text-emerald-500 hover:text-emerald-700 bg-emerald-50 p-2 rounded-full active:scale-90">
                        <PlusCircle size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-4 rounded-b-[2rem] z-30">
          <div className="flex justify-between items-center text-slate-400">
            <div className="flex flex-col items-center text-emerald-600 gap-1.5 cursor-pointer">
              <Home size={20} />
              <span className="text-[10px] font-bold">Home</span>
            </div>
            <div onClick={() => onNavigate('list')} className="flex flex-col items-center hover:text-emerald-500 gap-1.5 cursor-pointer">
              <ClipboardList size={20} />
              <span className="text-[10px] font-semibold">Listahan</span>
            </div>
            <div onClick={handleLogout} className="flex flex-col items-center hover:text-rose-500 gap-1.5 cursor-pointer">
              <LogOut size={20} />
              <span className="text-[10px] font-semibold">Logout</span>
            </div>
          </div>
        </nav>

      </div>
    </div>
  );
}