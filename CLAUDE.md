# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Claude Code playground repository, currently configured for Angular development based on the .gitignore settings.

## Current State

This repository is currently in its initial state with no application code, dependencies, or build configuration. The following need to be set up before development can begin:

- `package.json` - Node.js dependencies and scripts
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
- Source code structure (typically `src/` directory)

## Development Setup

Once the project is initialized with Angular CLI:

```bash
# Install dependencies
npm install

# Serve the application locally
ng serve

# Run tests
ng test

# Run linting
ng lint

# Build for production
ng build --configuration production
```

## Notes

The .gitignore is configured to exclude:
- Angular build artifacts (`/dist/`, `/out-tsc/`, `/.angular/`)
- Node modules and lock files
- Environment files (`.env`)
- TypeScript build info
- Test coverage reports
