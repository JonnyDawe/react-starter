# React Starter

A modern, production-ready React starter template built with TypeScript, TanStack Router, and Tailwind CSS v4.

## Tech Stack

### Core
- **React 19** - Latest React with modern features
- **TypeScript 5.9** - Full type safety
- **Vite 7** - Fast build tool and dev server with SWC
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Powerful data fetching and caching
- **TanStack Form** - Type-safe form management

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Tailwind Variants** - Type-safe component variants
- **React Aria Components** - Accessible component primitives
- **Work Sans Variable** - Modern variable font

### Development Tools
- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing utilities
- **ESLint** - Code linting with Antfu config
- **Husky** - Git hooks
- **Commitlint** - Conventional commit messages
- **Lint-staged** - Run linters on staged files
- **Plop** - Component generator for Atomic Design

### Utilities
- **T3 Env** - Type-safe environment variables with Zod
- **Zod** - Schema validation
- **Internationalized Date/Number** - i18n support for dates and numbers

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (Button, Input, etc.)
│   ├── molecules/      # Simple component groups
│   ├── organisms/      # Complex components
│   └── templates/      # Page-level layouts
├── routes/             # File-based routes (TanStack Router)
├── integrations/       # Third-party integrations
│   └── tanstack-query/ # Query client setup
├── lib/
│   ├── hooks/          # Custom React hooks
│   ├── helpers/         # Utility functions
│   └── types/           # TypeScript types and type guards
└── styles/             # Global styles and Tailwind recipes
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run serve
```

## Component Architecture

This project follows **Atomic Design** principles:

- **Atoms** - Basic building blocks (buttons, inputs, labels, icons)
- **Molecules** - Simple groups of UI elements (search bar, form field)
- **Organisms** - Complex components (navigation, data tables, forms)
- **Templates** - Page-level layouts

### Generating Components

Use Plop to generate new components following the project structure:

```bash
npx plop
```

Select the component type (atom, molecule, organism, or template) and provide a name. The generator will create the component file and index export.

## Routing

Routes are defined as files in `src/routes/`. TanStack Router automatically generates the route tree.

### Adding a Route

Create a new file in `src/routes/`:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>About Page</div>
}
```

The route will be available at `/about`.

### Route Loaders

Load data before rendering:

```tsx
export const Route = createFileRoute('/users')({
  loader: async () => {
    const users = await fetchUsers()
    return { users }
  },
  component: Users,
})

function Users() {
  const { users } = Route.useLoaderData()
  return <div>{/* render users */}</div>
}
```

## Data Fetching

### TanStack Query

The project includes TanStack Query for server state management:

```tsx
import { useQuery } from '@tanstack/react-query'

function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <div>Loading...</div>
  return <div>{/* render data */}</div>
}
```

Query client is configured in `src/integrations/tanstack-query/root-provider.tsx`.

## Styling

### Tailwind CSS v4

The project uses Tailwind CSS v4 with the Vite plugin. Styles are configured in `src/styles/`.

### Component Variants

Use `tailwind-variants` for type-safe component variants:

```tsx
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'px-4 py-2 rounded',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
    },
  },
})

function Button({ color, ...props }) {
  return <button className={button({ color })} {...props} />
}
```

### Recipes

Reusable style recipes are in `src/styles/recipes/`:
- `button.ts` - Button variants
- `fieldRecipes.ts` - Form field styles
- `typography.ts` - Text styles
- `tooltip.ts` - Tooltip styles
- `listbox.ts` - Listbox styles
- `focusRing.ts` - Focus ring utilities

## Environment Variables

Environment variables are type-safe using T3 Env with Zod validation.

Add variables to `src/env.ts`:

```ts
export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_URL: z.string().url(),
    VITE_APP_TITLE: z.string().min(1),
  },
  runtimeEnv: import.meta.env,
})
```

Use in your code:

```ts
import { env } from '@/env'

console.log(env.VITE_API_URL)
```

## Testing

Run tests:

```bash
npm run test
```

Tests are written with Vitest and Testing Library. Test files should be named `*.test.ts` or `*.test.tsx`.

## Code Quality

### Linting

Lint and fix code:

```bash
npm run lint
```

Uses ESLint with Antfu's config for modern JavaScript/TypeScript.

### Git Hooks

- **Pre-commit** - Runs lint-staged to lint staged files
- **Commit-msg** - Validates commit messages with Commitlint

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve navigation bug
docs: update README
```

## Development Tools

### TanStack Devtools

The project includes TanStack Devtools for:
- Router debugging
- Query inspection
- Form state visualization

Available in development mode at the bottom-right corner.

### Component Generator

Generate components with Plop:

```bash
npx plop
```

Follows Atomic Design structure and creates proper TypeScript exports.

## TypeScript

Strict TypeScript configuration with:
- Path aliases (`@/*` → `src/*`)
- Strict type checking
- Modern ES module support
- Bundler module resolution

## Browser Support

Modern browsers with ES2022 support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved
