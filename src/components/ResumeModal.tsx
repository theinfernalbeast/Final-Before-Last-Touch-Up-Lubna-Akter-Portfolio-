import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Printer, FileText, Download } from 'lucide-react';
import { downloadCvFile } from '../utils/downloadCv';
import { useTheme } from '../context/ThemeContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { isClinical } = useTheme();
  const [isPaperTheme, setIsPaperTheme] = useState(isClinical);
  const { data } = usePortfolio();

  useEffect(() => {
    setIsPaperTheme(isClinical);
  }, [isClinical]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white print:static">
      <motion.div
        id="cv-modal-content"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border transition-all ${
          isPaperTheme
            ? 'bg-white text-slate-900 border-slate-300'
            : 'bg-slate-950 text-slate-100 border-purple-500/30'
        } print:border-none print:shadow-none print:text-black print:bg-white`}
      >
        {/* Top Action Toolbar */}
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b print:hidden ${
            isPaperTheme
              ? 'bg-slate-100 border-slate-200 text-slate-800'
              : 'bg-slate-900/90 border-purple-500/20 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-xs sm:text-sm font-bold font-mono">Curriculum Vitae · {data.profile.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaperTheme(!isPaperTheme)}
              className="px-2.5 py-1 text-xs font-mono rounded-lg border border-slate-700/60 hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              {isPaperTheme ? 'Dark View' : 'Paper View'}
            </button>
            <button
              onClick={downloadCvFile}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-700/60 hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Content */}
        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto print:max-h-none print:overflow-visible space-y-6 text-sm">
          {/* Header */}
          <div className="text-center pb-6 border-b border-current/15 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{data.profile.name}</h1>
            <p className="text-sm font-semibold text-purple-500 dark:text-purple-400 print:text-black">
              {data.profile.headline}
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 print:text-slate-600 flex flex-wrap justify-center items-center gap-2 pt-1 font-mono">
              <span>{data.profile.location}</span>
              <span aria-hidden="true">|</span>
              <a href={data.profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                WhatsApp
              </a>
              <span aria-hidden="true">|</span>
              <a href={`mailto:${data.profile.email}`} className="hover:underline">
                {data.profile.email}
              </a>
              <span aria-hidden="true">|</span>
              <a href={data.profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {data.profile.linkedin}
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-1.5">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 print:text-slate-800">
              {data.profile.summary}
            </p>
          </div>

          {/* Core Competencies & Soft Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-2">
                Pharmaceutical Knowledge
              </h2>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 print:text-slate-800 list-disc list-inside">
                {data.coreCompetencies.map((comp, idx) => (
                  <li key={idx}>{comp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-2">
                Professional Strengths
              </h2>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 print:text-slate-800 list-disc list-inside">
                {data.softSkills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tools & Research Support */}
          <div className="pt-2">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-2">
              Tools & Research Support
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600 dark:text-slate-300 print:text-slate-800">
              {data.computerLiteracy.map((tool, idx) => (
                <div key={idx}>• {tool}</div>
              ))}
            </div>
          </div>

          {/* Educational Qualification */}
          <div className="pt-2">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-2">
              Educational Qualification
            </h2>
            <div className="border border-current/20 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-current/20 bg-current/5 font-mono text-[11px]">
                    <th className="p-2 font-bold">Qualification</th>
                    <th className="p-2 font-bold">Institution</th>
                    <th className="p-2 font-bold">Timeline</th>
                    <th className="p-2 font-bold">Location</th>
                    <th className="p-2 font-bold text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                  {data.education.map((edu, idx) => (
                    <tr key={idx}>
                      <td className="p-2 font-semibold">{edu.discipline}</td>
                      <td className="p-2">{edu.institution}</td>
                      <td className="p-2">{edu.timeline}</td>
                      <td className="p-2">{edu.location}</td>
                      <td className="p-2 text-right font-mono font-semibold">{edu.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Research Projects */}
          <div className="pt-2 space-y-3">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black">
              Academic Research Projects
            </h2>

            {data.researchProjects.map((proj, idx) => (
              <div key={idx} className="space-y-1 bg-current/5 p-3 rounded-xl border border-current/10">
                <h3 className="text-xs font-bold">{proj.title}</h3>
                <div className="text-[11px] text-purple-600 dark:text-purple-400 font-mono">
                  {proj.role} | {proj.status}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-800 pt-1 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>

          {/* Training and Certifications */}
          <div className="pt-2">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-1.5">
              Training and Certifications
            </h2>
            <ul className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-800 list-disc list-inside space-y-0.5">
              {data.certifications.map((cert, idx) => (
                <li key={idx}>
                  {cert.title} - {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>

          {/* Work & Entrepreneurial Experience */}
          <div className="pt-2 space-y-4">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black">
              Work & Entrepreneurial Experience
            </h2>

            {data.workExperience.map((job, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs">
                    {job.role} | {job.organization}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {job.period} | {job.location}
                  </span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-800 list-disc list-inside pt-1 space-y-0.5">
                  {job.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Affiliations, Voluntary & Personal Details */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-1.5">
                Affiliations and Volunteering
              </h2>
              {data.extraCurricular.map((act, idx) => (
                <div key={idx} className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-800 mb-1.5">
                  <strong>{act.role}, {act.organization} ({act.period}):</strong>
                  <ul className="list-disc list-inside mt-0.5">
                    {act.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-1.5">
                Personal Details
              </h2>
              <div className="text-xs text-slate-600 dark:text-slate-300 print:text-slate-800 space-y-0.5">
                <div>Nationality: {data.personalDetails.nationality}</div>
                <div>Blood Group: {data.personalDetails.bloodGroup}</div>
                <div>Languages: {data.personalDetails.languages}</div>
              </div>
            </div>
          </div>

          {/* References */}
          <div className="pt-2 border-t border-current/15">
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-purple-600 dark:text-purple-400 print:text-black mb-2">
              References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300 print:text-slate-800">
              {data.references.map((ref, idx) => (
                <div key={idx} className="p-3 border border-current/10 rounded-xl">
                  <div className="font-bold text-sm">{ref.name}</div>
                  <div>{ref.institution}</div>
                  <div>{ref.title}</div>
                  <div className="font-mono text-[11px] pt-1 text-purple-600 dark:text-purple-400">
                    {ref.phone} | {ref.email}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
