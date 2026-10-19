import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Lock, KeyRound, X, CheckCircle2 } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { isClinical } = useTheme();

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password is LubnaAkterPortfolio (or custom from localStorage)
    const storedPwd = localStorage.getItem('lubna_admin_pwd') || 'LubnaAkterPortfolio';
    if (password === storedPwd || (storedPwd === 'lubna2026' && password === 'LubnaAkterPortfolio')) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className={`relative w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-6 ${
        isClinical ? 'bg-white text-slate-900 border-purple-200' : 'bg-slate-900 text-slate-100 border-purple-900/60'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Admin Authentication</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${isClinical ? 'border-slate-200 hover:bg-slate-100 text-slate-600' : 'border-slate-700 hover:bg-slate-800 text-slate-300'}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-purple-400">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password..."
                className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm ${
                  isClinical ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                } focus:outline-none focus:border-purple-500`}
              />
            </div>
            {error && (
              <p className="text-xs text-red-500 font-medium mt-1.5">Incorrect password. Please try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-600/30 hover:opacity-90 transition-all text-sm cursor-pointer"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
