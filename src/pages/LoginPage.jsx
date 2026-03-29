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
      setErrorMessage("Please enter an email and password to register.");
      return;
    }
    setLoading(true);
    setErrorMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setErrorMessage(error.message);
    else alert("Success! You can now log in.");
    setLoading(false);
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen font-sans text-slate-900">
      <div className="w-full max-w-[400px] h-[800px] bg-slate-50 relative overflow-hidden flex flex-col sm:rounded-[2.5rem] shadow-2xl border-slate-800 sm:border-8">
        
        {/* Back Button */}
        <div className="p-6 pt-10">
          <button onClick={onBack} className="text-slate-500 hover:text-emerald-600 transition-colors p-2">
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="px-8 flex-1 flex flex-col justify-center -mt-10">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Sign In</h1>
            <p className="text-slate-500 text-sm">Access live market prices and save your lists.</p>
          </div>

          {errorMessage && (
            <div className="bg-rose-100 text-rose-600 p-3 rounded-xl text-xs mb-4 font-medium text-center">
              {errorMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4 mb-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="Email address" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-white border border-slate-200 py-3 pl-11 pr-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" 
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Password (min 6 chars)" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-white border border-slate-200 py-3 pl-11 pr-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-70 transition-all"
            >
              <LogIn size={18} /> {loading ? "Loading..." : "Log In"}
            </button>
          </form>

          {/* Register Option */}
          <button 
            type="button" 
            onClick={handleSignUp} 
            disabled={loading} 
            className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold py-4 rounded-xl flex items-center justify-center gap-2 mb-8 active:scale-95 transition-all text-sm"
          >
            <UserPlus size={18} /> Create Account
          </button>

          {/* Guest Mode */}
          <div className="text-center">
            <button 
              onClick={onGuest} 
              className="text-emerald-600 font-bold text-sm hover:underline p-2"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}