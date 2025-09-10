# ZeroDayOne React Web Application

ZeroDayOne is a React + TypeScript + Vite web application with Redux state management, Three.js 3D graphics, and Tailwind CSS styling. The application features a loading screen with shader compilation and progressive state management.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Development
- Install dependencies: `npm install` -- takes 6-25 seconds depending on cache. NEVER CANCEL. Set timeout to 60+ seconds.
- **CRITICAL**: Must install with optional dependencies (do NOT use --no-optional flag) for esbuild support
- Start development server: `npm run dev` -- starts in ~340ms on localhost:5173. NEVER CANCEL development server.
- Access application: http://localhost:5173/

### Build and Quality Checks  
- **WARNING**: `npm run build` -- FAILS due to missing GraphQL dependencies. Do NOT attempt to build for production.
- Run linting: `npm run lint` -- takes 2 seconds, reports 100+ problems but doesn't prevent development.
- Preview built app: `npm run preview` -- DO NOT USE until build issues are resolved.

### Critical Timing Information
- **NEVER CANCEL**: Development server starts quickly but may take time to compile shaders
- **NEVER CANCEL**: npm install takes 6-25 seconds (varies by cache state) with deprecation warnings (normal)
- **CRITICAL**: Must use `npm install` (not `npm install --no-optional`) to avoid esbuild errors
- Build fails in 4.5 seconds due to missing GraphQL client setup
- Linting completes in 2 seconds with known issues

## Validation

### Manual Testing Requirements
**ALWAYS run through this complete validation scenario after making changes:**

1. Start development server: `npm run dev`
2. Open http://localhost:5173/ in browser
3. Verify loading screen displays with:
   - "zerodayone" branding text
   - Progress bar for "Compiling shaders..."
   - "Reading state... Done" status
   - "All good things take time" message
4. Check browser console for Three.js WebGL initialization
5. Wait for shader compilation to complete (may take 30+ seconds)

### Browser Testing
- Application displays loading screen correctly despite build failures
- WebGL shaders compile successfully with some expected driver warnings
- Redux state management initializes properly
- No critical runtime errors prevent application loading

## Known Issues and Limitations

### Build System Issues
- **CRITICAL**: Production build (`npm run build`) fails due to missing dependencies:
  - Missing `@apollo/client` GraphQL client
  - Missing `react-toastify` notification library
  - Missing GraphQL schema files in `src/graphql/` directory
  - Missing `src/lib/utils` utility file
- Development mode works perfectly despite these missing dependencies

### Linting Issues (Non-blocking)
- 60+ ESLint errors after auto-fix (originally 100+) primarily from:
  - Unused variables and imports in Redux actions
  - TypeScript `any` types in shader and auth code
  - Missing type declarations for GraphQL modules
- Run `npm run lint -- --fix` to auto-fix many issues (reduces from 100+ to 60+ problems)
- Remaining issues are mostly unused variables and type safety problems

### Git Submodules
- Lygia shader library submodule exists but is not initialized
- Application works without initializing the submodule

## Architecture Overview

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components  
│   ├── navbar/         # Navigation components
│   └── noise-plane/    # Three.js shader components
├── pages/              # Page components
│   ├── Landing/        # Landing page
│   ├── Loading/        # Loading screen (currently shown)
│   └── App/           # Main application
├── redux/              # Redux state management
│   ├── auth/          # Authentication state
│   ├── global/        # Global application state
│   └── loader/        # Loading state
├── router/             # React Router setup
└── utils/              # Utility functions
```

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui components  
- **State**: Redux Toolkit with async thunks
- **3D Graphics**: Three.js + React Three Fiber
- **Build**: Vite with TypeScript compilation
- **Quality**: ESLint + TypeScript strict mode

### Key Dependencies
- `@react-three/fiber` and `@react-three/drei` for 3D graphics
- `@reduxjs/toolkit` for state management
- `framer-motion` for animations
- `lucide-react` for icons
- Various Radix UI components for accessibility

## Common Development Tasks

### Working with Components
- UI components are in `src/components/ui/` using Shadcn/ui pattern
- Three.js components are in `src/components/noise-plane/`
- Always import UI components using the `@/components` alias

### State Management
- Redux store is in `src/redux/index.tsx`
- Auth state handles user authentication (currently has GraphQL dependencies)
- Loader state manages loading screen progression
- Use Redux DevTools for debugging state changes

### Styling and Assets
- Tailwind configuration is in `tailwind.config.ts`
- Global styles are in `src/index.css`
- Public assets are in `public/` directory
- Use Tailwind classes and CSS variables for theming

### Code Quality
- Always run `npm run lint` before committing changes
- Fix auto-fixable linting issues with `npm run lint -- --fix`  
- TypeScript strict mode is enabled - resolve type errors
- Do NOT disable linting rules to work around GraphQL dependency issues

## Debugging and Troubleshooting

### Common Error Patterns
1. **GraphQL import errors**: Expected due to missing backend setup
2. **TypeScript `any` type errors**: Use proper typing when possible
3. **Shader compilation warnings**: Normal WebGL driver messages
4. **Deprecation warnings during install**: Safe to ignore

### Development Workflow
1. Always start with `npm run dev` for development
2. Make changes incrementally and test in browser
3. Run `npm run lint` to check code quality
4. Use browser DevTools to debug Three.js and Redux state
5. Check browser console for runtime errors

### Performance Notes
- Initial shader compilation may cause brief loading delay
- Development server includes hot module replacement
- Large bundle size due to Three.js and multiple UI libraries
- Redux state updates trigger React re-renders efficiently

## File Outputs for Reference

### Repository Root Structure
```
.eslintrc.cjs          # ESLint configuration
.gitignore            # Git ignore patterns  
.gitmodules           # Git submodule (lygia)
README.md             # Basic project description
components.json       # Shadcn/ui configuration
index.html           # HTML entry point
package-lock.json    # Dependency lock file
package.json         # Project configuration and scripts
postcss.config.js    # PostCSS configuration
public/              # Static assets
src/                 # Source code
tailwind.config.ts   # Tailwind CSS configuration
tsconfig.json        # TypeScript configuration
tsconfig.node.json   # Node.js TypeScript configuration
vite.config.ts       # Vite build configuration
```

### Key Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite --host",           // Development server
    "build": "tsc && vite build",   // Production build (FAILS)
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"       // Preview built app
  }
}
```