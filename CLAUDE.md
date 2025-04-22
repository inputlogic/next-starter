
## Expected Behavior

- if the task you are given is non-trivial, ask clarifying questions and list your plan for confirmation before continuing.
- make sure to follow naming conventions before finishing a task.
    - files should be kebab-case
    - css and scss class names should be kebab-case
    - use named exports in javascript rather than default exports

## Project Overview
- Next.js 14.1.0 project with App Router architecture
- React 18.2.0 + SCSS modules for styling
- iron-session for authentication
- @tanstack/react-query for data fetching (custom useQuery found in hooks/use-query for GET requests)
- Storybook for component documentation

## Commands

### Development
```
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
```

### Documentation
```
npm run storybook       # Run Storybook
npm run build-storybook # Build Storybook
```

### Linting and Formatting

- do not use semicolons

```
npx eslint .            # Run ESLint
npx prettier --write .  # Format code with Prettier
npx tsc --noEmit        # Run TypeScript type checking
```

## Project Structure
- `app/` - Next.js App Router pages and API routes
  - `(app)/` - Main application routes
  - `(marketing)/` - Marketing pages
  - `(auth)/` - Authentication routes
  - `api/` - API routes and authentication endpoints
- `components/` - Reusable UI components
- `hooks/` - Custom React hooks
- `public/` - Static assets
- `styles/` - Global SCSS styles
- `util/` - Utility functions

## Component Architecture
Components are organized in individual folders with:
- `index.js` - Implementation
- `component-name.module.scss` - Component-specific styles
- `component-name.stories.js` - Storybook documentation

## Forms

- When asked to build a form for a specific api route, check for an architecture/openapi.yaml file.
    - if the endpoint exists in this document, use it to determine which fields to include in the form.
    - if there are fields without an obvious existing input to use, just use a text input with a "TODO" note to create a custom input for that field type.
- See `components/forms/signup` for an example form. All forms should follow this standard.
- Use input components that in `components/form` when available
- In `components/form/inputs` the basic inputs are connected to the form.
- Forms rely on state so add 'use client' at the top of forms.
- Forms should be named based on the route they are built for.
    - eg 1. if the path is /api/user/my-profile the form name should be user-my-profile
    - eg 2. if the path is /api/user/my-posts the form name should be user-my-posts
    - eg 3. if the path is /api/user/my-posts/:id the form name should be user-my-posts-edit
- See ## Inputs section for adding for inputs

## Inputs

- Basic inputs are in `components/inputs` these inputs are not connected to the form and do not generally handle state. Typically, they expect a value and setValue prop to be passed in.
- When basic inputs are used in a form, they should be wrapped in components/form/inputs such that managing the form value and error is handled automatically based on the name provided to the input. (Use useFormContext to retrieve necessary tooling)
- When basic inputs are used in a list, they should be wrapped in components/list/inputs such that the wrapper manages setting the value as a query param based on the name of the input. (Use useListContext to retrieve necessary tooling)


## API Requests

- Use hooks/use-query to make get requests inside of components.
- Use axiosClient in util/axios-client for other requests (eg. posting in a form)

## Lists

- Lists should use the tools/components found in components/list
- see `app/dev/list/page` for an example list
- filters in a list should update their value in the query params
