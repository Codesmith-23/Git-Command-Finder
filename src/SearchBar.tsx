import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * SearchBar component with terminal-inspired styling
 * Requirements: 1.1, 5.1, 5.2, 6.1, 6.2
 */
export default function SearchBar({ value, onChange, placeholder = "Search Git commands..." }: SearchBarProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-green-500" />
        </div>
        <input
          type="text"
          role="searchbox"
          aria-label="Search Git commands"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-4 py-4 text-2xl bg-black text-green-500 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-green-700 transition-all"
        />
      </div>
    </div>
  );
}
