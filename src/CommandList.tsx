import CommandCard from './CommandCard';
import { GitCommand } from './types';

interface CommandListProps {
  commands: GitCommand[];
  searchQuery: string;
}

/**
 * CommandList component that renders a list of CommandCard components
 * Requirements: 1.5, 2.1, 2.3
 */
export default function CommandList({ commands, searchQuery }: CommandListProps) {
  // Display "No commands found" message when empty (Requirement 1.5)
  if (commands.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 text-center">
        <p className="text-green-500 text-xl">
          No commands found{searchQuery ? ` for "${searchQuery}"` : ''}
        </p>
        <p className="text-green-700 text-sm mt-2">
          Try a different search term
        </p>
      </div>
    );
  }

  // Render list of CommandCard components (Requirements 2.1, 2.3)
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="space-y-4">
        {commands.map((command) => (
          <CommandCard key={command.id} command={command} />
        ))}
      </div>
    </div>
  );
}
