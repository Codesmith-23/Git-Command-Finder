import { useState, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { GitCommand } from './types';

interface CommandCardProps {
  command: GitCommand;
}

type CopyStatus = 'idle' | 'success' | 'error';

/**
 * CommandCard component displaying a Git command with copy functionality
 * Requirements: 2.1, 2.2, 2.5, 3.1, 3.2, 3.3, 3.4, 6.1, 6.2
 */
export default function CommandCard({ command }: CommandCardProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

  // Auto-reset copy status after 2 seconds
  useEffect(() => {
    if (copyStatus !== 'idle') {
      const timer = setTimeout(() => {
        setCopyStatus('idle');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  const handleCopy = async () => {
    // Trim whitespace from command text (Requirement 3.4)
    const textToCopy = command.command.trim();

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        setCopyStatus('success');
      } else {
        // Fallback for older browsers using execCommand
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopyStatus('success');
        } else {
          setCopyStatus('error');
        }
      }
    } catch (error) {
      setCopyStatus('error');
    }
  };

  return (
    <article className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 hover:border-green-400 transition-all hover:shadow-lg hover:shadow-green-500/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-green-400 text-lg mb-3">{command.description}</p>
          <code className="block bg-black text-green-500 font-mono text-base p-3 rounded border border-green-700">
            {command.command}
          </code>
        </div>
        
        <button
          onClick={handleCopy}
          aria-label="Copy command"
          className="flex-shrink-0 p-3 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          {copyStatus === 'idle' && <Copy className="h-5 w-5" />}
          {copyStatus === 'success' && <Check className="h-5 w-5" />}
          {copyStatus === 'error' && <AlertCircle className="h-5 w-5" />}
        </button>
      </div>
      
      {/* ARIA live region for screen reader announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {copyStatus === 'success' && 'Command copied to clipboard'}
        {copyStatus === 'error' && 'Failed to copy command'}
      </div>
      
      {copyStatus === 'error' && (
        <p className="text-red-400 text-sm mt-2">Failed to copy command</p>
      )}
    </article>
  );
}
