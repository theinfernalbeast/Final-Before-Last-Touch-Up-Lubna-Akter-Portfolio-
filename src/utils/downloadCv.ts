/**
 * Opens and downloads Lubna Akter's authentic Curriculum Vitae PDF in a new tab or custom uploaded CV
 */
export const downloadCvFile = () => {
  try {
    for (let i = 1; i <= 11; i++) {
      const key = i === 1 ? 'lubna_portfolio_data_v1' : `lubna_portfolio_data_v${i}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.profile?.customCvUrl) {
          const link = document.createElement('a');
          link.href = parsed.profile.customCvUrl;
          link.download = parsed.profile.customCvName || 'Lubna_Akter_BPharm_Resume.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }

  const pdfUrl = '/Lubna_Akter_BPharm_Resume.pdf';
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Lubna_Akter_BPharm_Resume.pdf';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
