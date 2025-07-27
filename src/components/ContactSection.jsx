import React, { useState } from 'react';
import { FaPaperPlane, FaSearchPlus, FaSearchMinus, FaFilePdf } from 'react-icons/fa';

const ContactSection = ({ setActiveSection, darkMode }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, success: false, message: '' });
  // PDF zoom state (height in px)
  const [pdfHeight, setPdfHeight] = useState(400);
  const [showResume, setShowResume] = useState(false);
  
  

  // Validation logic
  const errors = {
    name: !form.name ? 'Name is required.' : '',
    email: !form.email
      ? 'Email is required.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? 'Enter a valid email address.'
      : '',
    message: !form.message ? 'Message is required.' : '',
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (errors.name || errors.email || errors.message) return;
    setLoading(true);
    setPopup({ show: false, success: false, message: '' });
    try {
      const res = await fetch('https://grabeats-server.onrender.com/user/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setPopup({ show: true, success: true, message: data.message || 'Message sent successfully!' });
        setForm({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
      } else {
        setPopup({ show: true, success: false, message: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setPopup({ show: true, success: false, message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
      setTimeout(() => setPopup({ show: false, success: false, message: '' }), 3500);
    }
  };

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-6 py-12 relative overflow-hidden">
      {/* Location Section */}
      <div className="w-full max-w-lg mb-8 p-6 rounded-2xl shadow-xl glass-effect border border-purple-900 bg-white/10 backdrop-blur-lg flex flex-col items-center gap-4" style={{background: darkMode ? 'rgba(44,20,80,0.5)' : 'rgba(255,255,255,0.7)', boxShadow: '0 8px 32px 0 rgba(162, 89, 255, 0.25)'}}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl text-purple-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7-7.5 11-7.5 11s-7.5-4-7.5-11a7.5 7.5 0 1115 0z" /></svg></span>
          <h3 className="text-xl font-bold text-purple-200">Location</h3>
        </div>
        <div className="text-center text-purple-100 text-base font-medium">
          Ajay Kumar Garg Engineering College<br />Ghaziabad, Delhi NCR, India
        </div>
        {/* Embedded Google Map with new coordinates */}
        <div className="w-full mt-4 rounded-xl overflow-hidden border border-purple-900 shadow-lg" style={{height:'260px', minHeight:'180px', background:'#18122b'}}>
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4348.121152017592!2d77.5025031!3d28.6784491!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf243a45cd65b%3A0x90f68b9636329241!2sAjay%20Kumar%20Garg%20Engineering%20College%20Amphitheatre!5e1!3m2!1sen!2sin!4v1753603083464!5m2!1sen!2sin" 
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen="" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
    />
        </div>
      </div>

      {/* Resume View Section (Embedded, view-only, with zoom) */}
      <div className="w-full max-w-lg mb-8 flex flex-col items-center">
        <button
          onClick={() =>{     window.open('https://docs.google.com/document/d/1zt7mpPuFSvC54h1kNjGowrUIHcyGkwf3NjopoytGwgM/edit?usp=sharing', '_blank');
          }}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition-transform mb-2"
        >
          {showResume ? 'Hide Resume' : 'View Resume'}
        </button>
        {/* Zoom controls only show if resume is visible */}
      
        {/* Embedded PDF, view-only, no pointer events */}
        {showResume && (
          <div id="resume-embed" className="w-full flex justify-center mt-2" style={{pointerEvents: 'none', userSelect: 'none'}}>
            <iframe
              src="/tushar-resume..pdf"
              title="Resume PDF"
              width="100%"
              style={{ minHeight: pdfHeight + 'px', height: pdfHeight + 'px', maxHeight: '1000px', border: 'none', borderRadius: '1rem', background: 'rgba(44,20,80,0.5)' }}
              allow=""
            />
          </div>
        )}
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">Contact <span className="text-purple-300">Me</span></h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-4 p-8 rounded-2xl shadow-xl glass-effect border border-purple-900 bg-white/10 backdrop-blur-lg relative" style={{background: darkMode ? 'rgba(44,20,80,0.5)' : 'rgba(255,255,255,0.7)', boxShadow: '0 8px 32px 0 rgba(162, 89, 255, 0.25)'}}>
        {/* Loading Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20 rounded-2xl">
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin shadow-xl bg-gradient-to-tr from-purple-400 via-pink-400 to-blue-400" style={{boxShadow:'0 0 32px 8px #a259ff55'}}></div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} onBlur={handleBlur} required className="px-4 py-2 rounded bg-purple-900/20 text-purple-100 placeholder-purple-400 focus:outline-none" />
          {touched.name && errors.name && <span className="text-red-400 text-xs mt-0.5">{errors.name}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} onBlur={handleBlur} required className="px-4 py-2 rounded bg-purple-900/20 text-purple-100 placeholder-purple-400 focus:outline-none" />
          {touched.email && errors.email && <span className="text-red-400 text-xs mt-0.5">{errors.email}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} onBlur={handleBlur} required rows={5} className="px-4 py-2 rounded bg-purple-900/20 text-purple-100 placeholder-purple-400 focus:outline-none" />
          {touched.message && errors.message && <span className="text-red-400 text-xs mt-0.5">{errors.message}</span>}
        </div>
        <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform">
          {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
        </button>
      </form>
      {/* Popup Modal/Toast */}
      {popup.show && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg text-lg font-semibold transition-all duration-300 ${popup.success ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {popup.message}
        </div>
      )}
    </section>
  );
};

export default ContactSection; 