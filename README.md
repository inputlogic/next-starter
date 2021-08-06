This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and modified with some useful utilities, components, and settings that we ([Input Logic](https://github.com/inputlogic)) often need.

## Local development

Start by creating a `.env.local` file in the project root. You can use the [1Password Generator](https://1password.com/password-generator/) to create a random session secret easily.

```
NEXT_PUBLIC_ENV=dev
NEXT_PUBLIC_API_URL=http://localhost:8000
SESSION_SECRET=[RANDOM-32-CHARACTER-STRING]
```

Now install and run the project:

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Run the API

Now that your frontend is running, you'll need an API. Setup the [Django API Starter](https://github.com/inputlogic/django-api-starter).

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [React useState](https://reactjs.org/docs/hooks-state.html) - learn about the useState hook in React
- [React useEffect](https://reactjs.org/docs/hooks-effect.html) - learn about the useEffect hook in React
