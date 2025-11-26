/**
 * Git command categories
 */
export type GitCommandCategory = 
  | 'branching' 
  | 'merging' 
  | 'commits' 
  | 'logs' 
  | 'reset' 
  | 'stash' 
  | 'remote' 
  | 'other';

/**
 * Interface representing a Git command
 */
export interface GitCommand {
  id: string;
  description: string;
  command: string;
  category: GitCommandCategory;
  tags?: string[];
}

/**
 * Interface for the data.json structure
 */
export interface GitCommandData {
  commands: GitCommand[];
}
