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

## Code Style

- SCSS classnames should always use kebab-case (e.g., `my-class-name`, not `myClassName` or `my_class_name`)
- File names should also use kebab-case (e.g., `my-component.js`, not `MyComponent.js` or `my_component.js`)

## Forms

The project uses two different form systems depending on the section:

### Standard Forms

For most forms in the app, use the components/form system:

```javascript
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Form, useForm, TextInput, SubmitButton } from 'components/form';

const ExampleForm = () => {
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ),
    onSubmit: async (data) => {
      // Handle form submission
    }
  });
  
  return (
    <Form methods={methods}>
      <TextInput name="email" type="email" placeholder="example@email.com" />
      <TextInput name="password" type="password" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
};
```

### Admin Forms

For forms in the admin section, use the dedicated form inputs from app/admin/components/form:

```javascript
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { useForm } from 'components/form/util/use-form';
import { Form } from 'components/form/form';
import { TextFormInput, AdminSubmitButton } from 'app/admin/components/form';

const AdminForm = () => {
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required('Email is required'),
        password: y.string().required('Password is required')
      })
    ),
    onSubmit: async (data) => {
      // Handle form submission
    }
  });
  
  return (
    <Form methods={methods}>
      <TextFormInput name="email" type="email" />
      <TextFormInput name="password" type="password" />
      <AdminSubmitButton>Submit</AdminSubmitButton>
    </Form>
  );
};
```

Important: 
- Do not mix form input components between the two systems. Always use the admin-specific inputs for admin forms.
- Admin forms use Radix UI components and require the following packages: `@radix-ui/themes` and `@radix-ui/react-icons`.

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