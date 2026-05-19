'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { auth, db } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';

type AuthMode = 'email-login' | 'email-register' | 'phone';

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('email-login');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const setAuth = useAuthStore(s => s.setAuth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const redirectUser = (role: string) => {
    if (role === 'admin') window.location.href = '/admin';
    else if (role === 'rider') window.location.href = '/rider';
    else window.location.href = '/dashboard';
  };

  // ── Email login/register ───────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let credential;
      if (mode === 'email-login') {
        credential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        credential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(credential.user, { displayName: formData.name });
        await setDoc(doc(db, 'users', credential.user.uid), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          role: formData.email === 'admin@cleanova.com' ? 'admin' : 'customer',
          createdAt: new Date().toISOString(),
        });
      }
      const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
      const data = userDoc.data();
      if (data) {
        const authUser = { id: credential.user.uid, name: data.name || credential.user.displayName || '', email: credential.user.email || '', role: (data.role as 'customer' | 'admin' | 'rider') || 'customer' };
        setAuth(authUser, await credential.user.getIdToken());
        toast.success(mode === 'email-login' ? 'Welcome back!' : 'Account created!');
        redirectUser(authUser.role);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Phone OTP ──────────────────────────────────────────────────────────────
  const setupRecaptcha = () => {
    if (!(window as { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier) {
      (window as { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) return toast.error('Enter a valid 10-digit phone number.');
    setIsLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier!;
      const phone = formData.phone.startsWith('+') ? formData.phone : `+91${formData.phone}`;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmResult(result);
      setOtpSent(true);
      toast.success('OTP sent to your phone!');
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmResult || !otp) return;
    setIsLoading(true);
    try {
      const result = await confirmResult.confirm(otp);
      const user = result.user;

      // Check if user exists in Firestore, else create
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: formData.name || `Customer`,
          email: user.email || '',
          phone: formData.phone,
          role: 'customer',
          createdAt: new Date().toISOString(),
        });
      }
      const data = (await getDoc(userRef)).data()!;
      const authUser = { id: user.uid, name: data.name || '', email: data.email || '', role: (data.role as 'customer' | 'admin' | 'rider') || 'customer' };
      setAuth(authUser, await user.getIdToken());
      toast.success('Phone verified! Welcome 🎉');
      redirectUser(authUser.role);
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || 'Invalid OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      {/* Invisible recaptcha */}
      <div id="recaptcha-container" ref={recaptchaRef} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-28 h-28">
            <Image src="/logo.png" alt="CleaNova" fill className="object-contain" priority />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Blue header */}
          <div className="bg-primary px-8 py-6">
            <h1 className="text-xl font-black text-white">
              {mode === 'phone' ? (otpSent ? 'Verify OTP' : 'Phone Login') : mode === 'email-register' ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-white/70 text-sm mt-1 font-semibold">CleaNova Laundry Management</p>
          </div>

          <div className="p-8">
            {/* Mode tabs */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-6 gap-1">
              <button onClick={() => { setMode('email-login'); setOtpSent(false); }}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${mode === 'email-login' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>
                Email Login
              </button>
              <button onClick={() => { setMode('phone'); setOtpSent(false); }}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${mode === 'phone' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>
                Phone OTP
              </button>
              <button onClick={() => { setMode('email-register'); setOtpSent(false); }}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${mode === 'email-register' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>
                Register
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={mode + String(otpSent)} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>

                {/* ── Email Login ── */}
                {mode === 'email-login' && (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} required
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <button type="submit" disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60">
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>
                )}

                {/* ── Email Register ── */}
                {mode === 'email-register' && (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input name="name" type="text" placeholder="Full name" value={formData.name} onChange={handleChange} required
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} required
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input name="phone" type="tel" placeholder="Phone number (optional)" value={formData.phone} onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input name="password" type="password" placeholder="Create password (min. 6 chars)" value={formData.password} onChange={handleChange} required
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <button type="submit" disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60">
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>
                )}

                {/* ── Phone OTP ── */}
                {mode === 'phone' && !otpSent && (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+91</span>
                      <input name="phone" type="tel" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} required maxLength={10}
                        className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
                    </div>
                    <button type="submit" disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60">
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                    <p className="text-center text-xs text-gray-400 font-semibold">We will send a 6-digit OTP to your mobile number.</p>
                  </form>
                )}

                {mode === 'phone' && otpSent && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
                      <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-bold text-green-700">OTP sent to +91{formData.phone}</p>
                      <button type="button" onClick={() => setOtpSent(false)} className="text-xs text-primary underline mt-1">Change number</button>
                    </div>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all tracking-[0.3em] text-center" />
                    </div>
                    <button type="submit" disabled={isLoading || otp.length < 6}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60">
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                      {isLoading ? 'Verifying...' : 'Verify & Continue'}
                    </button>
                  </form>
                )}

              </motion.div>
            </AnimatePresence>

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
