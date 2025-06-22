# Fillout Assessment: Page Navigation Component

A modern, clean and accessible form builder application built with TypeScript, React and Nextjs v15.
This assessment is part of the Fillout job application process, showcasing the Page Navigation Component
with functionalities like drag-and-drop re-ordering tabs, context menus, subtle animations and a clean, professional UI.

## Decisions and Clarifications

- In alignment with the assessment instructions, I focused on a good UI/UX, on good practices, and performance.

- Also, as discussed through email with Dominic, and considering I didn't have access to the Figma "dev mode" (as it is a paid feature), I created an implementation as close to the design as possible (but not necessarily pixel perfect, understading that wans't the main focus here).

- I also took the liberty of slightly changing a few things here and there, like for example the color of the "plus" button in-between tabs.

- I made the navigation horizontally scrollable so that the number of pages is not a problem.

- Also added an ellipsis truncating the page name on the tab for when the name is too long, to prevent tabs from being too large.

- I decided that keeping the context menu trigger button even in non-active tabs was a good idea for users wanting to just rename a page real quick without changing the selected page.

- I ensure that the navigation doesn't change focus or change to an active state when drag and dropping non-active tabs (meaning keeping the tab in grey if it was grey before dragging).

- As suggested by the assignment overview, I made use of common AI tools and helpers to improve the development experience and also reduce the required time to complete it.

Bonus:

- I know it wasn't required but to make it more interactive/fun I implemented some of the actions on the context menu like: "Set as first page", "Rename", "Duplicate" and "Delete".

- I added accessibility good practices and some keyboard shortcuts to navigate and and be able to interact with the page navigation component with the keyboard (see [instructions here](KEYBOARD_NAVIGATION.md))


## Features

- **Drag & Drop Navigation**: Reorder pages by dragging tabs
- **Context Menu**: use the three-dot menu for page options
- **Page Management**: Add, rename, duplicate, copy, and delete pages
- **Keyboard Navigation**: Almost full keyboard support with shortcuts (see [details here](KEYBOARD_NAVIGATION.md))
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Responsive Design**: Works seamlessly on many screen sizes (desktop only)
- **TypeScript**: Fully typed for better development experience
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Getting Started: run locally

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fillout-assessment
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── page-navigation/    # Page navigation components
│   ├── ui/                 # Reusable UI components
│   └── theme-provider.tsx  # Theme provider
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── styles/                 # Global styles
└── types/                  # TypeScript type definitions
```
