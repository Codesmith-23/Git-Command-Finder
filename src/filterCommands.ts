import { GitCommand } from './types';

/**
 * Filters commands based on case-insensitive substring matching
 * Requirements: 1.2, 1.3, 1.4, 1.5
 * 
 * @param commands - Array of Git commands to filter
 * @param query - Search query string
 * @returns Filtered array of commands matching the query
 */
export function filterCommands(commands: GitCommand[], query: string): GitCommand[] {
  // Handle empty query - return all commands (Requirement 1.4)
  if (!query || query.trim() === '') {
    return commands;
  }

  const lowerQuery = query.toLowerCase();

  // Filter commands by case-insensitive substring matching (Requirement 1.3)
  const matches = commands.filter((command) => {
    const descriptionMatch = command.description.toLowerCase().includes(lowerQuery);
    const commandMatch = command.command.toLowerCase().includes(lowerQuery);
    
    return descriptionMatch || commandMatch;
  });

  // Return empty array if no matches (Requirement 1.5)
  return matches;
}
