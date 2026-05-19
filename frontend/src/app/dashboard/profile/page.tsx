'use client';
import React, { useEffect, useState } from 'react';
import { UserCircle, Mail, Phone, MapPin, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

export default function MyProfilePage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (user?.id) {
      getDoc(doc(db, 'users', user.id)).then(snap => {
        const d = snap.data();
        if (d) setProfile({ name: d.name || '', email: d.email || '', phone: d.phone || '', address: d.address || '' });
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.id), {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      });
      toast.success('Profile updated!');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-secondary tracking-tight">My Profile</h2>
        <p className="text-sm font-semibold text-gray-400 mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Avatar banner */}
        <div className="p-8 border-b border-gray-100 flex items-center gap-6 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="w-20 h-20 rounded-full bg-white shadow-md border-4 border-white flex items-center justify-center text-primary">
            <UserCircle className="w-14 h-14 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-secondary">{profile.name || user?.name || 'Customer'}</h3>
            <p className="text-sm font-semibold text-gray-400 mt-0.5">{profile.email || user?.email || ''}</p>
          </div>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Full Name</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" value={profile.email} readOnly
                className="w-full pl-9 pr-4 py-3 border border-gray-100 rounded-xl text-sm font-semibold bg-gray-50 text-gray-400 cursor-not-allowed outline-none" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1 font-semibold">Email cannot be changed here.</p>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })}
                placeholder="Enter your phone number"
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Default Pickup Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })}
                placeholder="Enter your home/office address (optional)"
                rows={2}
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:border-primary transition-all resize-none" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1 font-semibold">This is optional. You can enter address at time of booking.</p>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
