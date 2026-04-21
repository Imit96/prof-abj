'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const sendMessage = useMutation(api.contacts.send);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await sendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-[100svh] bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh]">
        {/* Form Side */}
        <div className="px-8 md:px-24 pt-32 pb-24 flex flex-col justify-center">
          <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-8">Get in Touch</h1>
          <p className="text-lg md:text-xl text-ink/70 font-light mb-12 max-w-md leading-relaxed">Whether you are interested in research collaboration, joining the DRTC, or specific inquiries, please reach out.</p>
          
          {status === 'success' ? (
            <div className="bg-secondary/10 border border-secondary p-8 rounded-lg max-w-md">
              <h3 className="font-serif text-2xl text-primary mb-2">Message Sent</h3>
              <p className="text-ink/70">Thank you for reaching out. Professor Abolaji or a member of the DRTC team will get back to you shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-xs uppercase tracking-[0.2em] font-bold text-secondary border-b border-secondary pb-1"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-10 max-w-md" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest font-bold text-primary mb-3">Name</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-primary/10 pb-2 text-lg focus:outline-none focus:border-secondary transition-colors" 
                  placeholder="Dr. Jane Doe" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest font-bold text-primary mb-3">Email</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-primary/10 pb-2 text-lg focus:outline-none focus:border-secondary transition-colors" 
                  placeholder="jane@university.edu" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest font-bold text-primary mb-3">Message</label>
                <textarea 
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4} 
                  className="w-full bg-transparent border-b-2 border-primary/10 pb-2 text-lg focus:outline-none focus:border-secondary transition-colors resize-none" 
                  placeholder="Your inquiry..."
                ></textarea>
              </div>
              <button 
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-10 py-4 bg-secondary text-primary font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#F2CD5C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-sm mt-4">Something went wrong. Please try again or email us directly.</p>
              )}
            </form>
          )}
        </div>

        {/* Info Side */}
        <div className="bg-primary px-8 md:px-24 pt-24 pb-24 lg:pt-32 flex flex-col justify-center text-background">
          <h2 className="font-serif text-4xl md:text-5xl text-secondary mb-12 drop-shadow-sm">Drosophila Research & Toxicity Centre</h2>
          
          <div className="space-y-12 font-light text-xl text-background/80">
            <div>
              <h3 className="font-bold text-background tracking-widest text-sm uppercase mb-3 drop-shadow-md">Direct Email</h3>
              <a href="mailto:abolaji.amos@ui.edu.ng" className="hover:text-secondary block mb-1">abolaji.amos@ui.edu.ng</a>
              <a href="mailto:amos_abolaji@yahoo.com" className="hover:text-secondary block">amos_abolaji@yahoo.com</a>
            </div>
            
            <div>
              <h3 className="font-bold text-background tracking-widest text-sm uppercase mb-3 drop-shadow-md">Location</h3>
              <p className="leading-relaxed">Department of Biochemistry<br/>University of Ibadan<br/>Ibadan, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
