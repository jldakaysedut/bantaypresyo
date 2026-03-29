import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen font-sans">
      <div className="w-full max-w-[400px] h-[800px] bg-emerald-600 relative overflow-hidden flex flex-col sm:rounded-[2.5rem] shadow-2xl border-slate-800 sm:border-8">
        
        {/* Decorative Background Glows */}
        <div className="absolute top-[-10%] right-[-20%] w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-80 h-80 bg-emerald-700 rounded-full blur-2xl opacity-50"></div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center px-8 z-10 text-white mt-10">
          <div className="w-20 h-20 bg-white text-emerald-600 rounded-3xl flex items-center justify-center shadow-xl mb-8 rotate-12">
            <ShoppingBag size={40} />
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Bantay <br/>
            <span className="text-emerald-200">Presyo</span>
          </h1>
          
          <p className="text-emerald-50 text-lg mb-10 opacity-90 leading-relaxed">
            Your smart companion for the Minglanilla public market. Track live prices and master your budget.
          </p>

          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-200" size={24} />
              <span className="font-medium text-emerald-50">Avoid Overpricing</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingDown className="text-emerald-200" size={24} />
              <span className="font-medium text-emerald-50">Live Market Trends</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="p-8 z-10 mb-6">
          <button 
            onClick={onStart}
            className="w-full bg-white text-emerald-700 font-bold text-lg py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all active:scale-95"
          >
            Magsimula Na <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}