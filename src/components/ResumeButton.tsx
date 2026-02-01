'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResumeButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      // Get the PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume_Riddhiman_Raut.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={handleDownload}
        disabled={isGenerating}
        whileHover={{ scale: isGenerating ? 1 : 1.05 }}
        whileTap={{ scale: isGenerating ? 1 : 0.95 }}
        className={`group relative flex items-center gap-2 rounded-lg border px-5 py-2.5 font-mono text-sm transition-all ${
          isGenerating
            ? 'cursor-wait border-zinc-700 bg-zinc-800/50 text-slate-500'
            : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:text-cyan-300'
        }`}
      >
        {isGenerating ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download Resume</span>
          </>
        )}
      </motion.button>

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      <p className="text-xs text-slate-600">
        Generated from portfolio data
      </p>
    </div>
  );
}
