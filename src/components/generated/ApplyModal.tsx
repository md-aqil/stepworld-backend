import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';

const GRADIENT_BG = 'bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';

export type ApplyContext = {
  collegeName: string;
  courseName: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  context: ApplyContext;
};

const STEPS = [
  { title: 'Personal Details', fields: ['fullName', 'email', 'mobile'] },
  { title: 'Education', fields: ['qualification', 'passingYear', 'percentage'] },
  { title: 'Documents & Submit', fields: ['workExperience', 'agree'] },
];

export const ApplyModal = ({ open, onClose, context }: Props) => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    fullName: '', email: '', mobile: '',
    qualification: '', passingYear: '', percentage: '',
    workExperience: '', agree: false,
  });
  const update = <K extends keyof typeof data>(k: K, v: typeof data[K]) => setData((d) => ({ ...d, [k]: v }));

  if (!open) return null;

  const canProceed = () => {
    if (step === 0) return data.fullName && data.email && data.mobile.length >= 10;
    if (step === 1) return data.qualification && data.passingYear && data.percentage;
    return data.agree;
  };

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const close = () => {
    setStep(0);
    setSubmitted(false);
    setData({ fullName: '', email: '', mobile: '', qualification: '', passingYear: '', percentage: '', workExperience: '', agree: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={close}>
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className="absolute right-4 top-4 z-10 rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <div className="border-b border-slate-200 px-6 py-5">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Apply for Admission</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900">{context.courseName} · {context.collegeName}</h2>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-3 text-xs font-bold">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.title}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${i <= step ? `${GRADIENT_BG} text-white` : 'bg-slate-100 text-slate-500'}`}>{i + 1}</span>
                  <span className={i <= step ? 'text-slate-900' : 'text-slate-400'}>{s.title}</span>
                  {i < STEPS.length - 1 && <ChevronRight className="h-3 w-3 text-slate-300" />}
                </React.Fragment>
              ))}
            </div>

            <div className="px-6 py-6">
              {step === 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Full Name</span>
                    <input value={data.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Rahul Sharma" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Email</span>
                    <input type="email" value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Mobile</span>
                    <input type="tel" value={data.mobile} onChange={(e) => update('mobile', e.target.value)} placeholder="9876543210" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Highest Qualification</span>
                    <select value={data.qualification} onChange={(e) => update('qualification', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500">
                      <option value="">Select…</option>
                      <option>10+2</option>
                      <option>Diploma</option>
                      <option>Bachelor's</option>
                      <option>Master's</option>
                      <option>PhD</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Passing Year</span>
                    <input type="number" value={data.passingYear} onChange={(e) => update('passingYear', e.target.value)} placeholder="2022" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Percentage / CGPA</span>
                    <input value={data.percentage} onChange={(e) => update('percentage', e.target.value)} placeholder="65%" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Work Experience (optional)</span>
                    <select value={data.workExperience} onChange={(e) => update('workExperience', e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500">
                      <option value="">Select…</option>
                      <option>Fresher</option>
                      <option>0–2 years</option>
                      <option>2–5 years</option>
                      <option>5+ years</option>
                    </select>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={data.agree} onChange={(e) => update('agree', e.target.checked)} className="mt-1" />
                    <span>I agree to be contacted by StepWorld and the university about my application.</span>
                  </label>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={() => canProceed() && setStep((s) => s + 1)} disabled={!canProceed()}
                  className={`inline-flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-bold text-white ${GRADIENT_BG} disabled:opacity-40`}>
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={!canProceed() || submitting}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-bold text-white ${GRADIENT_BG} disabled:opacity-40`}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Submit Application
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="px-6 py-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="mt-4 text-center text-2xl font-extrabold text-slate-900">Application Submitted!</h3>
            <p className="mt-2 text-center text-sm text-slate-600">
              Thanks {data.fullName.split(' ')[0]}, a counsellor will reach out within 24 hours about {context.courseName} at {context.collegeName}.
            </p>
            <button onClick={close} className={`mx-auto mt-6 block rounded-xl px-5 py-2 text-sm font-bold text-white ${GRADIENT_BG}`}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;