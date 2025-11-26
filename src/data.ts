import { GitCommand, GitCommandData } from './types';
import commandData from '../public/data.json';

/**
 * Validates that a command object has all required fields
 * Requirements: 4.5
 */
function isValidCommand(command: any): command is GitCommand {
  return (
    typeof command === 'object' &&
    command !== null &&
    typeof command.id === 'string' &&
    command.id.trim() !== '' &&
    typeof command.description === 'string' &&
    command.description.trim() !== '' &&
    typeof command.command === 'string' &&
    command.command.trim() !== '' &&
    typeof command.category === 'string' &&
    command.category.trim() !== ''
  );
}

/**
 * Loads and validates Git commands from data.json
 * Requirements: 4.1, 4.5
 * 
 * @returns Array of validated GitCommand objects
 * @throws Error if data cannot be loaded or is invalid
 */
export function loadCommands(): GitCommand[] {
  try {
    const data = commandData as GitCommandData;
    
    if (!data || !Array.isArray(data.commands)) {
      throw new Error('Invalid data structure: commands array not found');
    }

    // Validate each command and filter out invalid entries
    const validCommands = data.commands.filter((command, index) => {
      const isValid = isValidCommand(command);
      if (!isValid) {
        console.warn(`Invalid command at index ${index}:`, command);
      }
      return isValid;
    });

    if (validCommands.length === 0) {
      throw new Error('No valid commands found in data.json');
    }

    return validCommands;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load command database: ${error.message}`);
    }
    throw new Error('Failed to load command database: Unknown error');
  }
}

/**
 * Get all commands (cached result)
 * Requirements: 4.1
 */
let cachedCommands: GitCommand[] | null = null;

export function getCommands(): GitCommand[] {
  if (cachedCommands === null) {
    cachedCommands = loadCommands();
  }
  return cachedCommands;
}
