import React, { useState } from 'react';
import { X } from 'lucide-react';

export const WhatsAppChatBubble: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '9910245535';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    'Hi StepWorld! I want to get Free Admission Counselling & Guidance. Please assist me.'
  )}`;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Speech preview bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-[260px] sm:max-w-xs rounded-2xl bg-white p-3.5 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-3 duration-300 relative group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center shadow-xs text-xs transition-colors cursor-pointer"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.88 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.71 14.5 13.56 14.66C13.42 14.83 13.28 14.85 13.03 14.73C12.78 14.6 11.99 14.34 11.04 13.5C10.3 12.84 9.8 12.03 9.66 11.78C9.51 11.53 9.64 11.4 9.77 11.27C9.88 11.16 10.02 10.98 10.15 10.83C10.27 10.68 10.31 10.58 10.39 10.41C10.48 10.24 10.43 10.1 10.37 9.97C10.31 9.85 9.81 8.63 9.61 8.13C9.4 7.63 9.2 7.7 9.05 7.69C8.91 7.69 8.74 7.69 8.58 7.69C8.41 7.69 8.14 7.75 7.91 8C7.68 8.25 7.03 8.86 7.03 10.1C7.03 11.34 7.93 12.54 8.06 12.71C8.18 12.87 9.83 15.42 12.36 16.51C12.96 16.77 13.43 16.92 13.79 17.04C14.4 17.23 14.95 17.2 15.39 17.14C15.88 17.07 16.89 16.53 17.1 15.95C17.31 15.37 17.31 14.87 17.24 14.76C17.18 14.65 17.03 14.52 16.78 14.39H16.57Z" />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 leading-tight">StepWorld Admissions</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Need help with university choice or fees? Chat with us live!
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-[#128C7E] hover:underline"
              >
                Start Chat &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Button - ICON ONLY */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xl shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-200 group cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current group-hover:rotate-12 transition-transform duration-200" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.88 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.71 14.5 13.56 14.66C13.42 14.83 13.28 14.85 13.03 14.73C12.78 14.6 11.99 14.34 11.04 13.5C10.3 12.84 9.8 12.03 9.66 11.78C9.51 11.53 9.64 11.4 9.77 11.27C9.88 11.16 10.02 10.98 10.15 10.83C10.27 10.68 10.31 10.58 10.39 10.41C10.48 10.24 10.43 10.1 10.37 9.97C10.31 9.85 9.81 8.63 9.61 8.13C9.4 7.63 9.2 7.7 9.05 7.69C8.91 7.69 8.74 7.69 8.58 7.69C8.41 7.69 8.14 7.75 7.91 8C7.68 8.25 7.03 8.86 7.03 10.1C7.03 11.34 7.93 12.54 8.06 12.71C8.18 12.87 9.83 15.42 12.36 16.51C12.96 16.77 13.43 16.92 13.79 17.04C14.4 17.23 14.95 17.2 15.39 17.14C15.88 17.07 16.89 16.53 17.1 15.95C17.31 15.37 17.31 14.87 17.24 14.76C17.18 14.65 17.03 14.52 16.78 14.39H16.57Z" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
          </span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppChatBubble;
