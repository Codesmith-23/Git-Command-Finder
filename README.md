# Git Command Finder

A fast, intuitive web application for discovering and copying Git commands. Search using natural language and get instant access to commonly used Git commands with one-click copy functionality.

## Features

- **Real-time Search** - Filter commands as you type without page reloads
- **One-Click Copy** - Copy any Git command to your clipboard instantly
- **Terminal-Inspired UI** - Clean, dark interface with green-on-black aesthetic
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Accessible** - Keyboard navigation and screen reader support
- **Lightning Fast** - No backend required, all data loads locally
- **29+ Commands** - Covers branching, merging, commits, logs, reset, stash, and remote operations

## Tech Stack

- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Vitest** - Unit and property-based testing
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/git-command-finder.git

# Navigate to project directory
cd git-command-finder

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. Type a search query in the search bar (e.g., "undo commit", "create branch", "merge")
2. Browse the filtered results
3. Click the copy button on any command card
4. Paste the command into your terminal

## Project Structure

```
git-command-finder/
├── public/
│   └── data.json          # Git commands database
├── src/
│   ├── components/
│   │   ├── App.tsx        # Main application component
│   │   ├── SearchBar.tsx  # Search input component
│   │   ├── CommandList.tsx # Command list container
│   │   └── CommandCard.tsx # Individual command card
│   ├── types.ts           # TypeScript interfaces
│   ├── data.ts            # Data loading utilities
│   ├── filterCommands.ts  # Search filtering logic
│   └── index.css          # Global styles
└── package.json
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

09## Acknowledgments

Built with modern web technologies and designed for developers who want quick access to Git commands without leaving their workflow.
