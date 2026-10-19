import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, ExternalLink, Check, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { t } = useLanguage();
  const { isClinical } = useTheme();
  const { data } = usePortfolio();

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/heyitslubnaakter@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          _subject: `[Portfolio Inquiry] ${subject || 'General Message'} - from ${senderName}`,
          message: message,
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setIsSent(true);
      } else {
        throw new Error('Service fallback');
      }
    } catch (err) {
      // Direct mailto fallback in case of strict ad-blockers or offline environment
      const mailtoUrl = `mailto:${data.profile.email}?subject=${encodeURIComponent(
        `[Portfolio] ${subject || 'Inquiry'} - ${senderName}`
      )}&body=${encodeURIComponent(
        `From: ${senderName} (${senderEmail})\n\nMessage:\n${message}\n\n---\nSent via Lubna Akter Portfolio`
      )}`;
      window.location.href = mailtoUrl;
      setIsSent(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-purple-500/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Central aligned on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12 flex flex-col items-center text-center lg:items-start lg:text-left px-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2 mx-auto lg:mx-0">
            <Mail className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
            <span>{t.contact.tag}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mt-1 tracking-tight text-center lg:text-left">
            {t.contact.title}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1.5 max-w-2xl text-center lg:text-left mx-auto lg:mx-0 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Direct Functional Email Transmission Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-slate-900/60 border border-purple-500/20 rounded-2xl p-4 sm:p-8 shadow-xl shadow-black/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 pb-4 mb-5 border-b border-purple-500/20">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Send className="w-4 h-4 text-purple-400" />
                  <span>{t.contact.sendDirectly}</span>
                </h3>
                <span className="text-[11px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-400/30">
                  {data.profile.email}
                </span>
              </div>

              {isSent ? (
                <div className="p-8 bg-purple-500/10 border border-purple-400/30 rounded-2xl text-center space-y-3 my-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-2 border border-emerald-400/40">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">Message Delivered to heyitslubnaakter@gmail.com!</h4>
                  <p className="text-xs sm:text-sm text-purple-200/80 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message has been sent directly to Lubna Akter's primary inbox at <span className="font-mono text-purple-200 font-semibold">heyitslubnaakter@gmail.com</span>.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSent(false);
                        setMessage('');
                        setSubject('');
                      }}
                      className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                    >
                      {t.contact.sendAnother || 'Send another message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendEmail} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-purple-200 mb-1.5">{t.contact.nameLabel}</label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-slate-950 border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-purple-200 mb-1.5">{t.contact.emailLabel}</label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-purple-200 mb-1.5">{t.contact.subjectLabel}</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-purple-200 mb-1.5">{t.contact.messageLabel}</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-indigo-300 hover:from-purple-300 hover:to-indigo-200 disabled:opacity-60 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20 hover:scale-[1.01]"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Sending Message Directly...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>{t.contact.sendBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Embedded Google Location Map */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="bg-slate-900/60 border border-purple-500/20 rounded-2xl overflow-hidden shadow-xl shadow-black/20 flex flex-col h-full">
              <div className="p-3 sm:p-4 border-b border-purple-500/20 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-1.5 bg-slate-950/60">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-purple-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{t.contact.locationMapTitle}</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Vatara%2C+Gulshan%2C+Dhaka%2C+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-purple-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
                >
                  <span>{t.contact.openInMaps}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full flex-1 min-h-[260px] sm:min-h-[320px] bg-slate-950">
                <iframe
                  title="Lubna Akter Location Map"
                  src="https://maps.google.com/maps?q=Vatara%2C%20Gulshan%2C%20Dhaka%2C%20Bangladesh&t=m&z=14&ie=UTF8&iwloc=&output=embed"
                  className={`w-full h-full border-0 transition-opacity ${
                    isClinical
                      ? 'opacity-100'
                      : 'opacity-90 hover:opacity-100 grayscale-[0.5] contrast-100'
                  }`}
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-purple-500/20 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-mono text-purple-400 block uppercase">Address</span>
                  <span className="font-medium text-slate-200">{data.profile.location}</span>
                </div>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-400/25">
                  Dhaka Division
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
