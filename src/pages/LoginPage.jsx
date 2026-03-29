import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowLeft, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LoginPage({ onLogin, onBack, onGuest }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const auth = async (type) => {
    const { error } = type === 'in' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) setMsg(error.message);
    else type === 'in' ? onLogin() : alert("Success! Log in now.");
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-[400px] h-[800px] bg-white relative flex flex-col sm:rounded-[2.5rem] border-8 border-slate-800">
        <button onClick={onBack} className="p-10 text-slate-400 self-start"><ArrowLeft /></button>
        <div className="px-10 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-black mb-6">Sign In</h2>
          {msg && <p className="text-rose-500 text-xs mb-4">{msg}</p>}
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-slate-100 rounded-xl mb-3 outline-none" />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-slate-100 rounded-xl mb-6 outline-none" />
          <button onClick={() => auth('in')} className="w-full bg-emerald-600 text-white p-4 rounded-xl font-bold mb-3 shadow-lg shadow-emerald-200">Log In</button>
          <button onClick={() => auth('up')} className="w-full bg-slate-200 text-slate-700 p-4 rounded-xl font-bold mb-8">Register</button>
          <button onClick={onGuest} className="text-emerald-600 font-bold hover:underline">Continue as Guest</button>
        </div>
      </div>
    </div>
  );
}