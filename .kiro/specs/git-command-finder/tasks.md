# Implementation Plan

- [x] 1. Initialize project with Vite and dependencies





  - Create new Vite + React project with TypeScript
  - Install dependencies: Tailwind CSS, Lucide-React, fast-check, Vitest, React Testing Library
  - Configure Tailwind with dark theme colors (black background, green text)
  - Set up Vitest configuration for testing
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 2. Create data.json with Git commands





  - Create public/data.json file with at least 20 Git commands
  - Include commands covering: branching (4+), merging (3+), commits (4+), logs (3+), reset (3+), stash (2+), remote (2+)
  - Ensure each command has id, description, command, category, and optional tags fields
  - Add common use cases: undo commits, view history, manage branches, resolve conflicts, sync with remote
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 3. Implement TypeScript interfaces and data loading





  - Define GitCommand interface with all required fields
  - Create data loading utility to import and validate data.json
  - _Requirements: 4.1, 4.5_

- [ ]* 3.1 Write property test for data validation
  - **Property 6: Data validation**
  - **Validates: Requirements 4.5**

- [ ]* 3.2 Write unit tests for data loading
  - Test that data.json loads successfully
  - Test that dataset contains at least 20 commands
  - Test that all required categories are represented
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 4. Implement SearchBar component


  - Create SearchBar component with large, centered input field
  - Style with Tailwind: black background, green text, green border with glow on focus
  - Implement controlled input with onChange handler
  - Make responsive for mobile (full width) and desktop (max-width)
  - _Requirements: 1.1, 5.1, 5.2, 6.1, 6.2_

- [ ]* 4.1 Write unit tests for SearchBar
  - Test that onChange callback is triggered with correct values
  - Test that value prop controls the input
  - Test that placeholder displays correctly
  - _Requirements: 1.1_

- [x] 5. Implement filtering logic


  - Create filterCommands utility function
  - Implement case-insensitive substring matching against description and command fields
  - Handle empty query (return all commands)
  - Handle no matches (return empty array)
  - _Requirements: 1.2, 1.3, 1.4, 1.5_

- [ ]* 5.1 Write property test for real-time filtering
  - **Property 1: Real-time filtering without submission**
  - **Validates: Requirements 1.2**

- [ ]* 5.2 Write property test for case-insensitive matching
  - **Property 2: Case-insensitive substring matching**
  - **Validates: Requirements 1.3**

- [ ]* 5.3 Write unit tests for filtering edge cases
  - Test empty query returns all commands
  - Test no matches returns empty array
  - Test special characters in search query
  - Test matching in both description and command fields
  - _Requirements: 1.3, 1.4, 1.5_

- [x] 6. Implement CommandCard component


  - Create CommandCard component displaying description, code snippet, and copy button
  - Style with terminal aesthetic: dark background, green text, monospace font for code
  - Implement copy-to-clipboard functionality using navigator.clipboard API
  - Add fallback using document.execCommand for older browsers
  - Implement copy state management (idle, success, error)
  - Show visual feedback: checkmark icon on success, error icon on failure
  - Auto-reset to idle state after 2 seconds
  - Trim whitespace from command text before copying
  - _Requirements: 2.1, 2.2, 2.5, 3.1, 3.2, 3.3, 3.4, 6.1, 6.2_

- [ ]* 6.1 Write property test for clipboard correctness
  - **Property 4: Clipboard copy correctness**
  - **Validates: Requirements 3.1, 3.4**

- [ ]* 6.2 Write property test for copy feedback
  - **Property 5: Copy success feedback**
  - **Validates: Requirements 3.2**

- [ ]* 6.3 Write property test for command card completeness
  - **Property 3: Command card completeness**
  - **Validates: Requirements 2.1, 2.2**

- [ ]* 6.4 Write unit tests for CommandCard
  - Test copy button click triggers clipboard write
  - Test success state shows checkmark icon
  - Test error state shows error message
  - Test state resets after timeout
  - Test whitespace trimming in copied text
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 7. Implement CommandList component


  - Create CommandList component that renders array of CommandCard components
  - Display "No commands found" message when commands array is empty
  - Style with vertical layout and consistent spacing
  - Make responsive with proper padding for mobile and desktop
  - _Requirements: 1.5, 2.1, 2.3_

- [ ]* 7.1 Write unit tests for CommandList
  - Test that each command renders as a CommandCard
  - Test that empty array shows "no results" message
  - Test that search query is displayed in empty state message
  - _Requirements: 1.5, 2.1_

- [x] 8. Implement App component and integrate all pieces


  - Create App component as main container
  - Import data.json and load commands on mount
  - Implement search query state with useState
  - Implement filtered commands with useMemo for performance
  - Wire SearchBar onChange to update search query state
  - Pass filtered commands to CommandList
  - Apply global styles: black background, green text theme
  - _Requirements: 1.2, 1.3, 1.4, 4.1, 6.1, 6.2_

- [ ]* 8.1 Write integration tests for complete search flow
  - Test end-to-end: type in search → see filtered results
  - Test that filtering updates in real-time
  - Test that copy button works on filtered results
  - _Requirements: 1.2, 1.3, 3.1_

- [x] 9. Implement responsive design and mobile optimization


  - Add responsive breakpoints using Tailwind (mobile-first approach)
  - Ensure SearchBar adapts width at mobile breakpoint (< 768px)
  - Ensure CommandCards fit within viewport without horizontal scroll
  - Test layout at various viewport sizes (320px, 768px, 1024px, 1440px)
  - Add touch event handlers for mobile interactions
  - Ensure copy button has adequate touch target size (44x44px minimum)
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 9.1 Write property test for responsive layout
  - **Property 7: Responsive layout without overflow**
  - **Validates: Requirements 5.1, 5.3**

- [ ]* 9.2 Write property test for touch events
  - **Property 8: Touch event equivalence**
  - **Validates: Requirements 5.4**

- [ ]* 9.3 Write unit tests for responsive behavior
  - Test SearchBar width adjusts at mobile breakpoint
  - Test CommandCards render without overflow on mobile
  - Test touch events trigger copy action
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 10. Add accessibility features


  - Add ARIA labels to SearchBar (role="searchbox", aria-label)
  - Add ARIA labels to copy buttons (aria-label="Copy command")
  - Add ARIA live region for copy success/error announcements
  - Ensure proper focus management and keyboard navigation
  - Add semantic HTML (main, section, article elements)
  - Test keyboard-only navigation (tab order, enter to copy)
  - _Requirements: 6.4_

- [ ]* 10.1 Write unit tests for accessibility
  - Test ARIA labels are present
  - Test keyboard navigation works
  - Test focus states are visible
  - _Requirements: 6.4_

- [x] 11. Verify color contrast and theme consistency


  - Verify green text on black background meets WCAG AA contrast ratio (4.5:1)
  - Ensure consistent use of color variables throughout components
  - Test theme in different lighting conditions
  - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [ ]* 11.1 Write unit tests for theme consistency
  - Test that primary background color is black
  - Test that primary text color is green
  - Test that color values are consistent across components
  - _Requirements: 6.1, 6.2, 6.5_

- [x] 12. Optimize performance


  - Verify useMemo is used for filtered commands
  - Test that filtering completes in < 16ms for 60fps
  - Verify bundle size is < 100KB gzipped
  - Test initial load time on throttled connection
  - _Requirements: 1.2_

- [x] 13. Final checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Create production build and verify deployment readiness



  - Run `npm run build` to create production bundle
  - Verify dist/ folder contains index.html and assets
  - Verify data.json is included in build output
  - Test production build locally with preview server
  - Verify clipboard API works over HTTPS (or localhost)
  - Verify no console errors or warnings
  - _Requirements: 7.5_

- [ ]* 14.1 Write unit test for static build output
  - Test that build produces static files only
  - Test that no server-side code is required
  - _Requirements: 7.5_
