# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UniMeet is a React + TypeScript application built with Vite. The project uses:
- **React 19.2.0** with TypeScript
- **Vite** as the build tool and dev server
- **Radix UI** for component primitives
- **Tailwind CSS 4.x** (latest version) for styling
- **pnpm** as the package manager

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server with HMR
- `pnpm build` - Type-check with `tsc -b` then build production bundle with Vite
- `pnpm lint` - Run ESLint on the codebase
- `pnpm preview` - Preview production build locally

### Important Notes
- Always use `pnpm` for package management (not npm or yarn)
- The build command includes TypeScript checking before building

## Tech Stack & Architecture

### Core Stack
- **React 19.2.0**: Latest React with modern features
- **TypeScript 5.9.3**: Strict mode enabled with comprehensive linting rules
- **Vite 7.x**: Fast build tool with HMR
- **Tailwind CSS 4.x**: Using the new Vite plugin (`@tailwindcss/vite`)
- **Radix UI Themes**: Component library for accessible UI primitives

### Project Structure
- `src/` - All application source code
  - `main.tsx` - Application entry point with Radix Theme provider
  - `App.tsx` - Root application component
  - `assets/` - Static assets
- `public/` - Public static files served as-is

### Styling Setup
The project uses Tailwind CSS 4.x with the Vite plugin. The Radix UI theme styles are imported globally in `main.tsx`.

### TypeScript Configuration
- Strict mode enabled with aggressive linting rules
- Uses `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`
- Bundler module resolution with `verbatimModuleSyntax`
- Project references split between app code (`tsconfig.app.json`) and node tooling (`tsconfig.node.json`)

### ESLint Configuration
Uses flat config format with:
- TypeScript ESLint recommended rules
- React Hooks plugin (flat config)
- React Refresh plugin for Vite
- Global ignores for `dist/`

## Development Notes

### React Setup
- App is wrapped in `StrictMode` and Radix `Theme` provider
- Uses React 19's `createRoot` API
- HMR enabled via Vite React plugin

### Radix UI Integration
Radix Theme is imported from `@radix-ui/themes` with styles loaded globally. The import path in `main.tsx` uses the CJS dist path which may need attention if ESM is preferred.

Use lucide react for icons. do not define your own svgs

### Vite Configuration
Minimal configuration with React and Tailwind plugins. Hot Module Replacement works out of the box.

## Building guidelines
When building, do not build into monolithic components. Instead build decomposed, modular, reusable components. We are aiming for high maintainability.
