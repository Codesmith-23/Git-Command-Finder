import { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import CommandList from './CommandList';
import { getCommands } from './data';
import { filterCommands } from './filterCommands';

/**
 * Main App component
 * Requirements: 1.2, 1.3, 1.4, 4.1, 6.1, 6.2
 */
function App() {
  // Load commands on mount (Requirement 4.1)
  const commands = getCommands();
  
  // Search query state (Requirement 1.2)
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter commands with useMemo for performance (Requirements 1.3, 1.4)
  const filteredCommands = useMemo(() => {
    return filterCommands(commands, searchQuery);
  }, [commands, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-green-500">
      <header className="pt-12 pb-8">
        <h1 className="text-4xl font-bold text-center text-green-500 mb-2">
          Git Command Finder
        </h1>
        <p className="text-center text-green-700 text-sm">
          Search and copy Git commands instantly
        </p>
      </header>
      
      <main>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
        />
        
        <CommandList 
          commands={filteredCommands}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

export default App;
