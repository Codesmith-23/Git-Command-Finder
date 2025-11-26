import { describe, it, expect } from 'vitest';
import { loadCommands, getCommands } from './data';
import { GitCommand } from './types';

describe('Data Loading', () => {
  it('should load commands from data.json', () => {
    const commands = loadCommands();
    expect(commands).toBeDefined();
    expect(Array.isArray(commands)).toBe(true);
    expect(commands.length).toBeGreaterThan(0);
  });

  it('should validate that each command has required fields', () => {
    const commands = loadCommands();
    
    commands.forEach((command: GitCommand) => {
      expect(command.id).toBeDefined();
      expect(typeof command.id).toBe('string');
      expect(command.id.trim()).not.toBe('');
      
      expect(command.description).toBeDefined();
      expect(typeof command.description).toBe('string');
      expect(command.description.trim()).not.toBe('');
      
      expect(command.command).toBeDefined();
      expect(typeof command.command).toBe('string');
      expect(command.command.trim()).not.toBe('');
      
      expect(command.category).toBeDefined();
      expect(typeof command.category).toBe('string');
    });
  });

  it('should cache commands on subsequent calls', () => {
    const commands1 = getCommands();
    const commands2 = getCommands();
    
    expect(commands1).toBe(commands2); // Same reference
  });

  it('should load at least 20 commands (Requirement 4.2)', () => {
    const commands = loadCommands();
    expect(commands.length).toBeGreaterThanOrEqual(20);
  });
});
