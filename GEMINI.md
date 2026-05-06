# Project Context: Symbols Starter Kit / Chef Recipe Station

This project is built using the [Symbols.app](https://symbols.app/) framework, specifically utilizing DOMQL v3. It acts as a starter kit or boilerplate for a web application.

## 🏗️ Project Overview

- **Framework**: Symbols / DOMQL (v3)
- **Directory Structure**: All project code (components, pages, design system) is located in the `symbols/` directory (as configured in `symbols.json`).
- **Dependencies**: The primary tool is `@symbo.ls/cli` (installed as `smbls`).

## 🚀 Building and Running

The project uses the `smbls` CLI for all major operations. Commands are wrapped in npm scripts.

- **Start Development Server**: `npm start` (Runs `npx smbls start`)
- **Build for Production**: `npm run build` (Runs `npx smbls build`)
- **Deploy**: `npm run deploy` (Runs `npx smbls deploy`) - Interactive prompt to deploy to various targets like Symbols, Cloudflare Pages, Vercel, etc.
- **AI Assistant**: `npx smbls ask "your question"`

## 📐 Development Conventions & Rules

When modifying or generating code for this project, you **MUST** adhere to the following DOMQL v3 conventions:

### Component Structure
- **Components are plain objects**, never functions.
- **NO imports between project files**: Reference other components by their PascalCase key name.
- `extends` and `childExtends` properties must be quoted strings (e.g., `extends: 'Flex'`).
- Use `children` and `childExtends` for lists/collections — never use `$collection`.

### Design System & Styling
- **Design system keys are ALWAYS lowercase** (e.g., `color`, `theme`, `typography` — never UPPERCASE).
- **Use Design System Tokens ONLY**: All values must use tokens. No raw `px` values, no raw hex colors.
- **Colors**: Define each color once and use shading modifiers (e.g., `'blue.7'`, `'gray+50'`). Do not create Tailwind-style palettes.
- **CSS Selectors**: Never chain CSS selectors (e.g., `'@dark :hover'`). Use nesting instead: `'@dark': { ':hover': {} }`.

### DOM & Routing
- **No raw DOM methods**: Never use `document.querySelector` or similar. Always use the DOMQL element tree.
- **Routing**: Use `el.router(path, el.getRoot())` for navigation — never `window.location`.
- **Links**: Use `extends: 'Link'` with an `href` prop instead of `attr: { href }`.

### File Organization
- `cases.js` belongs at the root level of the `symbols/` directory, **NOT** inside `symbols/designSystem/`.
- Shared libraries are handled by the CLI and generally located in `.symbols_local/libs/`. The CLI auto-generates `symbols/sharedLibraries.js`, which should not be edited manually.

## 🤖 MCP Tools

You should always use the `symbols-mcp` tools when working on this project (e.g., `mcp_symbols-mcp_get_project_rules`, `mcp_symbols-mcp_generate_component`, `mcp_symbols-mcp_audit_component`, etc.) to ensure compliance with the latest Symbols.app framework rules.
