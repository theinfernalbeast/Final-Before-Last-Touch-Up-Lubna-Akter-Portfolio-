import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  MapPin, 
  Check, 
  MessageCircle, 
  Linkedin, 
  Facebook, 
  Instagram,
  Globe
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { isClinical } = useTheme();
  const { data } = usePortfolio();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <footer
      className={`relative z-20 py-12 sm:py-16 px-4 sm:px-6 md:px-8 w-full pointer-events-auto transition-colors overflow-hidden ${
        isClinical
          ? 'bg-gradient-to-t from-white via-white/60 to-transparent backdrop-blur-md'
          : 'bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent backdrop-blur-md'
      }`}
    >
      {/* Smooth gradient transparency ambient glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isClinical
            ? 'opacity-30 [background:radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(168,85,247,0.06),transparent_75%)]'
            : 'opacity-70 [background:radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(147,51,234,0.15),transparent_75%)]'
        }`}
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center relative z-20">
        
        {/* Interactive Icon Row for Social Networks & Contact Channels with Increased Spacing */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto">
          {/* Email Icon */}
          <motion.button
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyEmail}
            title={`Email: ${data.profile.email} (Click to copy)`}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              isClinical
                ? 'bg-white/90 hover:bg-white border-purple-300/80 text-purple-600 hover:border-purple-400 hover:shadow-purple-100/60'
                : 'bg-slate-900/80 hover:bg-slate-900 border-purple-500/30 text-purple-400 hover:border-purple-400 hover:shadow-[0_0_12px_rgba(192,132,252,0.25)]'
            }`}
            aria-label="Copy Email"
          >
            {copiedEmail ? <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-400" /> : <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
          </motion.button>

          {/* WhatsApp Icon */}
          <motion.a
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href={data.profile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Chat"
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              isClinical
                ? 'bg-white/90 hover:bg-white border-emerald-300/80 text-emerald-600 hover:border-emerald-400 hover:shadow-emerald-100/60'
                : 'bg-slate-900/80 hover:bg-slate-900 border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(52,211,153,0.25)]'
            }`}
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.a>

          {/* Location / Maps Icon */}
          <motion.a
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href="https://maps.google.com/?q=Vatara%2C+Gulshan%2C+Dhaka%2C+Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            title={`Location: ${data.profile.location}`}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              isClinical
                ? 'bg-white/90 hover:bg-white border-indigo-300/80 text-indigo-600 hover:border-indigo-400 hover:shadow-indigo-100/60'
                : 'bg-slate-900/80 hover:bg-slate-900 border-indigo-500/30 text-indigo-400 hover:border-indigo-400 hover:shadow-[0_0_12px_rgba(129,140,248,0.25)]'
            }`}
            aria-label="Location Maps"
          >
            <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.a>

          {/* LinkedIn Icon */}
          <motion.a
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href={data.profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              isClinical
                ? 'bg-white/90 hover:bg-white border-sky-300/80 text-sky-600 hover:border-sky-400 hover:shadow-sky-100/60'
                : 'bg-slate-900/80 hover:bg-slate-900 border-sky-500/30 text-sky-400 hover:border-sky-400 hover:shadow-[0_0_12px_rgba(56,189,248,0.25)]'
            }`}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.a>

          {/* Facebook Icon */}
          <motion.a
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href={data.profile.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Profile"
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              isClinical
                ? 'bg-white/90 hover:bg-white border-blue-300/80 text-blue-600 hover:border-blue-400 hover:shadow-blue-100/60'
                : 'bg-slate-900/80 hover:bg-slate-900 border-blue-500/30 text-blue-400 hover:border-blue-400 hover:shadow-[0_0_12px_rgba(96,165,250,0.25)]'
            }`}
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.a>

          {/* Instagram Icon */}
          <motion.a
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            href={data.profile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Profile"
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              isClinical
                ? 'bg-white/90 hover:bg-white border-pink-300/80 text-pink-600 hover:border-pink-400 hover:shadow-pink-100/60'
                : 'bg-slate-900/80 hover:bg-slate-900 border-pink-500/30 text-pink-400 hover:border-pink-400 hover:shadow-[0_0_12px_rgba(244,114,182,0.25)]'
            }`}
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.a>

          {/* Google Blogger Icon - Orange brand button with cut-out B */}
          {data.profile.bloggerUrl && (
            <motion.a
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href={data.profile.bloggerUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Google Blogger"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
                isClinical
                  ? 'bg-white/90 hover:bg-white border-amber-300/80 text-amber-600 hover:border-amber-400 hover:shadow-amber-100/60'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-amber-500/30 text-amber-500 hover:border-amber-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]'
              }`}
              aria-label="Google Blogger"
            >
              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 bg-[#ff5722] rounded-[4px] flex items-center justify-center font-black text-white text-[11px] leading-none shadow-xs select-none">
                B
              </div>
            </motion.a>
          )}

          {/* Any Custom Social Links Added via Dashboard */}
          {data.profile.customSocialLinks && data.profile.customSocialLinks.map((custom) => (
            <motion.a
              key={custom.id}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href={custom.url}
              target="_blank"
              rel="noopener noreferrer"
              title={custom.platform}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
                isClinical
                  ? 'bg-white/90 hover:bg-white border-purple-300/80 text-purple-600 hover:border-purple-400'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-purple-500/30 text-purple-400 hover:border-purple-400 hover:shadow-[0_0_12px_rgba(192,132,252,0.25)]'
              }`}
              aria-label={custom.platform}
            >
              <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </motion.a>
          ))}
        </div>

        {/* Centered Pill Badge with Reduced Glow/Brightness in Dark Theme */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className={`inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border backdrop-blur-md cursor-default group transition-all ${
            isClinical
              ? 'bg-white/95 border-purple-200 shadow-[0_4px_16px_rgba(168,85,247,0.1)] text-purple-950 font-bold'
              : 'bg-[#030712]/90 border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.06)] text-purple-100/90 font-semibold'
          }`}
        >
          {/* Active Status Indicator (Luminous pulsing emerald dot) */}
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
          </span>

          <span className="text-xs sm:text-sm tracking-wide">
            Lubna Akter Portfolio
          </span>
        </motion.div>

      </div>
    </footer>
  );
};
