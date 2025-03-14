# Project Information

## Import Paths

This project uses absolute imports from the root directory. For imports, use the following format:

```javascript
// Correct
import Component from 'components/component';
import useHook from 'hooks/use-hook';
import { util } from 'util/util-file';

// Incorrect - don't use relative paths like ../../
import Component from '../../components/component';

// Incorrect - don't use @ prefix
import Component from '@/components/component';
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Project Structure

- `app/` - Next.js App Router
- `components/` - Reusable UI components
- `hooks/` - React hooks
- `styles/` - Global styles and theme
- `util/` - Utility functions and helpers
- `public/` - Static assets