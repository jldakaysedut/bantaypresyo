import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowLeft, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LoginPage({ onLogin, onBack, onGuest }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMessage(error.message);
    else onLogin();
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMessage("Maglagay ng email at password para makapag-register.");
      return;
    }
    setLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setErrorMessage(error.message);
    else alert("Success! Pwede ka na mag-login.");
    setLoading(false);
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen font-sans">
      <div className="w-full max-w-[400px] h-[800px] bg-slate-50 relative overflow-hidden flex flex-col sm:rounded-[2.5rem] sm:shadow-2xl sm:border-8 border-slate-800">
        
        <div className="p-6 pt-10">
          <button onClick={onBack} className="text-slate-500 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="px-8 flex-1 flex flex-col justify-center -mt-10">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Sign In</h1>
            <p className="text-slate-500 text-sm">I-save ang iyong listahan kahit saan.</p>
          </div>

          {errorMessage && (
            <div className="bg-rose-100 text-rose-600 p-3 rounded-xl text-sm mb-4 font-medium text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4 mb-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-700 py-3 pl-11 pr-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input type="password" placeholder="Password (min 6 chars)" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-700 py-3 pl-11 pr-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-70">
              <LogIn size={18} /> {loading ? "Nagloload..." : "Mag-Login"}
            </button>
          </form>

          <button type="button" onClick={handleSignUp} disabled={loading} className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 mb-6 disabled:opacity-70">
            <UserPlus size={18} /> Gumawa ng Account
          </button>

          <div className="text-center mt-4">
            <button onClick={onGuest} className="text-emerald-600 font-semibold text-sm hover:underline">
              Tumuloy bilang Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}