# Design Document

## Overview

The Git Command Finder is a client-side React application that provides instant access to Git commands through a search-driven interface. The application follows a simple, single-page architecture with no backend dependencies. All command data is stored locally in a JSON file and loaded at application startup. The design emphasizes performance, simplicity, and a terminal-inspired aesthetic that resonates with developer workflows.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         React Application               │
│  ┌───────────────────────────────────┐  │
│  │      App Component                │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   SearchBar Component       │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   CommandList Component     │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │  CommandCard (×N)     │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      State Management             │  │
│  │  - Search Query (useState)        │  │
│  │  - Filtered Commands (useMemo)    │  │
│  │  - Copy Status (useState)         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │      Data Layer                   │  │
│  │  - data.json (static import)      │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Technology Stack

- **React 18+**: UI framework with hooks for state management
- **Vite**: Build tool and development server for fast HMR
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide-React**: Icon library for copy button and UI elements
- **TypeScript**: Type safety for better developer experience (optional but recommended)

### Design Principles

1. **Client-Side Only**: No backend, API calls, or server-side logic
2. **Performance First**: Optimized filtering with memoization, minimal re-renders
3. **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML
4. **Mobile-First**: Responsive design starting from mobile breakpoints
5. **Progressive Enhancement**: Core functionality works without JavaScript enhancements

## Components and Interfaces

### Component Hierarchy

```
App
├── SearchBar
└── CommandList
    └── CommandCard (multiple instances)
```

### Component Specifications

#### App Component

**Responsibilities:**
- Load command data from data.json
- Manage search query state
- Filter commands based on search query
- Coordinate child components

**State:**
```typescript
interface AppState {
  searchQuery: string;
  commands: GitCommand[];
}
```

**Key Logic:**
- Import data.json at build time (static import)
- Filter commands using case-insensitive substring matching
- Pass filtered results to CommandList

#### SearchBar Component

**Props:**
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

**Responsibilities:**
- Render large, centered search input
- Handle user input and trigger onChange callback
- Provide visual focus states
- Display search icon (optional)

**Styling:**
- Large font size (text-2xl or larger)
- Full width on mobile, max-width on desktop
- Green text on black background
- Subtle green border with glow effect on focus

#### CommandList Component

**Props:**
```typescript
interface CommandListProps {
  commands: GitCommand[];
  searchQuery: string;
}
```

**Responsibilities:**
- Render list of CommandCard components
- Display "no results" message when commands array is empty
- Handle empty state gracefully

**Layout:**
- Vertical stack with consistent spacing
- Centered container with max-width
- Responsive padding

#### CommandCard Component

**Props:**
```typescript
interface CommandCardProps {
  command: GitCommand;
}
```

**Responsibilities:**
- Display command description and code snippet
- Handle copy-to-clipboard functionality
- Show copy success/failure feedback
- Provide hover states

**State:**
```typescript
interface CommandCardState {
  copyStatus: 'idle' | 'success' | 'error';
}
```

**Interactions:**
- Click copy button → copy code to clipboard
- Show checkmark icon for 2 seconds on success
- Reset to copy icon after timeout

## Data Models

### GitCommand Interface

```typescript
interface GitCommand {
  id: string;
  description: string;
  command: string;
  category: 'branching' | 'merging' | 'commits' | 'logs' | 'reset' | 'stash' | 'remote' | 'other';
  tags?: string[];
}
```

**Field Descriptions:**
- `id`: Unique identifier for the command (e.g., "reset-soft-head")
- `description`: Human-readable explanation (e.g., "Undo the last commit but keep changes")
- `command`: The actual Git command (e.g., "git reset --soft HEAD~1")
- `category`: Grouping for potential future filtering
- `tags`: Optional array of keywords for enhanced search matching

### data.json Structure

```json
{
  "commands": [
    {
      "id": "reset-soft-head",
      "description": "Undo the last commit but keep changes",
      "command": "git reset --soft HEAD~1",
      "category": "reset",
      "tags": ["undo", "commit", "keep changes"]
    }
  ]
}
```

**Minimum Dataset Requirements:**
- At least 20 commands
- Coverage across categories: branching (4+), merging (3+), commits (4+), logs (3+), reset (3+), stash (2+), remote (2+)
- Common use cases: undo commits, view history, manage branches, resolve conflicts, sync with remote


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Real-time filtering without submission
*For any* text input entered into the search bar, the displayed command list should update immediately without requiring a form submission or button click.
**Validates: Requirements 1.2**

### Property 2: Case-insensitive substring matching
*For any* search query and command in the database, if the query appears as a substring in either the command's description or code snippet (ignoring case), then that command should appear in the filtered results.
**Validates: Requirements 1.3**

### Property 3: Command card completeness
*For any* command displayed in the results, its rendered card should contain the command description, the code snippet, and a copy button.
**Validates: Requirements 2.1, 2.2**

### Property 4: Clipboard copy correctness
*For any* command, when the copy button is clicked, the clipboard should contain exactly the command text with leading and trailing whitespace removed.
**Validates: Requirements 3.1, 3.4**

### Property 5: Copy success feedback
*For any* successful copy operation, the UI should transition to a success state (showing visual confirmation) and then return to the idle state after a timeout.
**Validates: Requirements 3.2**

### Property 6: Data validation
*For any* command loaded from data.json, that command object should have both a non-empty description field and a non-empty command field.
**Validates: Requirements 4.5**

### Property 7: Responsive layout without overflow
*For any* viewport width (including mobile sizes below 768px), the application should render without horizontal scrolling, with all command cards fitting within the viewport width.
**Validates: Requirements 5.1, 5.3**

### Property 8: Touch event equivalence
*For any* interactive element (copy button), touch events should trigger the same behavior as click events.
**Validates: Requirements 5.4**

## Error Handling

### Search Errors
- **Invalid Input**: All text input is valid for search; no validation errors possible
- **Empty Results**: Display friendly "No commands found" message with suggestion to try different keywords

### Clipboard Errors
- **Copy Failure**: If `navigator.clipboard.writeText()` fails (e.g., permissions denied, unsecure context), catch the error and display error feedback on the copy button
- **Fallback Strategy**: Implement fallback using `document.execCommand('copy')` for older browsers
- **User Feedback**: Show error icon and message for 2 seconds before returning to idle state

### Data Loading Errors
- **Missing data.json**: If import fails, display error message: "Failed to load command database"
- **Invalid JSON**: If parsing fails, display error message with details
- **Schema Validation**: Validate each command has required fields; filter out invalid entries and log warnings

### Responsive Layout Errors
- **Viewport Detection**: Use CSS media queries and React hooks to detect viewport size
- **Overflow Prevention**: Use `overflow-x: hidden` and `max-width: 100%` to prevent horizontal scroll
- **Touch Target Size**: Ensure buttons are at least 44x44px for touch accessibility

## Testing Strategy

### Unit Testing

The application will use **Vitest** as the testing framework (Vite's native test runner) along with **React Testing Library** for component testing.

**Unit Test Coverage:**
- **SearchBar Component**: Test that onChange callback is triggered with correct values
- **CommandCard Component**: Test copy button click handler, state transitions
- **Filtering Logic**: Test edge cases like empty strings, special characters, exact matches
- **Data Loading**: Test that data.json is imported correctly and has expected structure
- **Empty States**: Test "no results" message displays when filter returns empty array
- **Error Handling**: Test clipboard API failures trigger error state

**Example Unit Tests:**
```typescript
describe('SearchBar', () => {
  it('should call onChange when user types', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'commit' } });
    expect(onChange).toHaveBeenCalledWith('commit');
  });
});

describe('CommandCard', () => {
  it('should display no results message when commands array is empty', () => {
    render(<CommandList commands={[]} searchQuery="xyz" />);
    expect(screen.getByText(/no commands found/i)).toBeInTheDocument();
  });
});
```

### Property-Based Testing

The application will use **fast-check** for property-based testing in JavaScript/TypeScript.

**Configuration:**
- Minimum 100 iterations per property test
- Each property test must include a comment referencing the design document property

**Property Test Coverage:**

1. **Real-time Filtering Property**: Generate random search strings and verify filtering happens synchronously
2. **Case-Insensitive Matching Property**: Generate random commands and search queries with mixed case, verify matches are found regardless of case
3. **Card Completeness Property**: Generate random command objects, verify rendered output contains all required fields
4. **Clipboard Correctness Property**: Generate random command strings with various whitespace, verify clipboard content is trimmed
5. **Copy Feedback Property**: Generate random commands, trigger copy, verify UI state transitions correctly
6. **Data Validation Property**: Generate random command objects (including invalid ones), verify validation catches missing fields
7. **Responsive Layout Property**: Generate random viewport widths, verify no horizontal overflow
8. **Touch Event Property**: Generate random touch events, verify they trigger same behavior as clicks

**Example Property Test:**
```typescript
import fc from 'fast-check';

/**
 * Feature: git-command-finder, Property 2: Case-insensitive substring matching
 * Validates: Requirements 1.3
 */
test('search should match commands case-insensitively', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 20 }),
      fc.constantFrom('upper', 'lower', 'mixed'),
      (searchTerm, caseType) => {
        const command = {
          id: '1',
          description: `This contains ${searchTerm} in description`,
          command: 'git example',
          category: 'other'
        };
        
        const query = caseType === 'upper' ? searchTerm.toUpperCase() :
                      caseType === 'lower' ? searchTerm.toLowerCase() :
                      searchTerm;
        
        const matches = filterCommands([command], query);
        expect(matches).toContain(command);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

- **End-to-End Flow**: Test complete user journey from search to copy
- **Data Integration**: Verify data.json loads correctly and integrates with filtering logic
- **Responsive Behavior**: Test layout at different viewport sizes using viewport emulation

### Accessibility Testing

- **Keyboard Navigation**: Verify tab order, focus states, and keyboard-only operation
- **Screen Reader**: Test with screen reader to ensure proper ARIA labels and semantic HTML
- **Color Contrast**: Verify green-on-black theme meets WCAG AA standards (4.5:1 for normal text)

## Performance Considerations

### Optimization Strategies

1. **Memoization**: Use `useMemo` to cache filtered results and prevent unnecessary recalculations
2. **Debouncing**: Consider debouncing search input if dataset grows beyond 100 commands
3. **Virtual Scrolling**: Not needed for 20-50 commands, but consider for larger datasets
4. **Code Splitting**: Not necessary for single-page app with minimal dependencies
5. **Asset Optimization**: Vite handles tree-shaking and minification automatically

### Performance Targets

- **Initial Load**: < 1 second on 3G connection
- **Search Response**: < 16ms (60fps) for filtering operations
- **Copy Action**: < 100ms from click to clipboard update
- **Bundle Size**: < 100KB gzipped (React + dependencies)

## Deployment

### Build Process

```bash
npm run build
```

Vite will generate optimized static files in the `dist/` directory:
- `index.html`: Entry point
- `assets/`: JavaScript, CSS, and other assets with content hashes
- `data.json`: Copied to output directory

### Hosting Options

- **Vercel**: Zero-config deployment with automatic HTTPS
- **Netlify**: Drag-and-drop deployment with CDN
- **GitHub Pages**: Free hosting for static sites
- **Any Static Host**: Can be served from any web server (nginx, Apache, S3, etc.)

### Environment Requirements

- **HTTPS**: Required for clipboard API to work (except on localhost)
- **Modern Browsers**: Chrome 63+, Firefox 53+, Safari 13.1+, Edge 79+
- **No Server**: Pure static hosting, no Node.js or backend required

## Future Enhancements

### Potential Features (Out of Scope for MVP)

1. **Category Filtering**: Add buttons to filter by command category
2. **Favorites**: Allow users to star frequently used commands (localStorage)
3. **Command History**: Track recently copied commands
4. **Dark/Light Toggle**: Add theme switcher (currently dark-only)
5. **Keyboard Shortcuts**: Add hotkeys for search focus, navigation
6. **Command Explanations**: Add detailed explanations with examples
7. **Custom Commands**: Allow users to add their own commands
8. **Export/Import**: Share command collections between users
9. **Analytics**: Track popular searches (privacy-respecting)
10. **PWA**: Add service worker for offline functionality

### Extensibility Points

- **Data Source**: Easy to swap data.json for API or localStorage
- **Styling**: Tailwind makes theme customization straightforward
- **Components**: Modular design allows easy addition of new features
- **Search Algorithm**: Filtering logic isolated for easy enhancement (fuzzy search, ranking)
