# Chit Chat AI Agent Instructions

## Project Overview
Chit Chat is a web application built with a client-server architecture. The client is a React application using Vite as the build tool, while the server component is separate.

### Architecture
- **Client (`/client`)**: React-based frontend using Vite
- **Server (`/server`)**: Backend service (separate component)

## Key Technologies & Dependencies
- React 19.x with Vite
- Material-UI (@mui/material) for UI components with dark theme default
- React Router for navigation
- DaisyUI for additional UI components
- ESLint for code quality

## Project Structure
```
client/
├── src/
│   ├── pages/
│   │   ├── authentication/      # Auth-related pages
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   └── home/
│   │       └── Home.jsx        # Main home page
│   ├── App.jsx                 # Root component
│   └── main.jsx               # Entry point with router setup
```

## Development Workflows

### Starting Development Server
```bash
# From client directory
npm run dev     # Starts Vite dev server with HMR
```

### Building for Production
```bash
npm run build   # Creates optimized production build
npm run preview # Preview production build locally
```

## Key Patterns & Conventions
1. **Routing**: Uses React Router with route definitions in `main.jsx`
2. **Theming**: Material-UI dark theme configured in `main.jsx`
3. **Component Organization**: Page components are organized by feature in the `pages` directory

## Common Tasks
- Add new route: Update router configuration in `main.jsx`
- Style components: Use Material-UI's `styled` API or CSS modules
- Update theme: Modify theme configuration in `main.jsx`

## Integration Points
- Client-server communication: TBD (server implementation pending)
- Authentication flows: Implementation in progress in `/pages/authentication`

## Project-Specific Guidelines
- Keep page components in appropriate feature directories under `pages/`
- Use Material-UI components for consistent styling
- Follow existing dark theme palette for new UI elements
- Ensure mobile responsiveness using Material-UI's responsive utilities