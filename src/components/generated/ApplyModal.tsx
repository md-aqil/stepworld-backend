import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

export type ApplyContext = {
  collegeName: string;
  courseName: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  context: ApplyContext;
};

export const ApplyModal = ({ open, onClose, context }: Props) => {
  const [studentName, setStudentName] = useState('');
  const [city, setCity] = useState('');

  if (!open) return null;

  const handleWhatsAppRedirect = () => {
    let msg = `Hi StepWorld! I want to get Free Counselling & Apply for ${context.courseName} at ${context.collegeName}.`;
    if (studentName.trim()) {
      msg += ` My name is ${studentName.trim()}.`;
    }
    if (city.trim()) {
      msg += ` I am from ${city.trim()}.`;
    }
    msg += ` Please guide me with admissions and direct university fee details.`;

    window.open(`https://wa.me/919910245535?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full w-max text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Admissions Desk</span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
          Apply & Counselling
        </h2>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          {context.courseName} · {context.collegeName}
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              City / State (Optional)
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Bangalore / Delhi"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-3 border border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Free personalized guidance & seat check</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Direct fees payment on official university portal</span>
          </div>
        </div>

        <button
          onClick={handleWhatsAppRedirect}
          className="mt-6 w-full rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-4 font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.88 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.71 14.5 13.56 14.66C13.42 14.83 13.28 14.85 13.03 14.73C12.78 14.6 11.99 14.34 11.04 13.5C10.3 12.84 9.8 12.03 9.66 11.78C9.51 11.53 9.64 11.4 9.77 11.27C9.88 11.16 10.02 10.98 10.15 10.83C10.27 10.68 10.31 10.58 10.39 10.41C10.48 10.24 10.43 10.1 10.37 9.97C10.31 9.85 9.81 8.63 9.61 8.13C9.4 7.63 9.2 7.7 9.05 7.69C8.91 7.69 8.74 7.69 8.58 7.69C8.41 7.69 8.14 7.75 7.91 8C7.68 8.25 7.03 8.86 7.03 10.1C7.03 11.34 7.93 12.54 8.06 12.71C8.18 12.87 9.83 15.42 12.36 16.51C12.96 16.77 13.43 16.92 13.79 17.04C14.4 17.23 14.95 17.2 15.39 17.14C15.88 17.07 16.89 16.53 17.1 15.95C17.31 15.37 17.31 14.87 17.24 14.76C17.18 14.65 17.03 14.52 16.78 14.39H16.57Z" />
          </svg>
          <span>Chat on WhatsApp (99102 45535)</span>
        </button>
      </div>
    </div>
  );
};

export default ApplyModal;
