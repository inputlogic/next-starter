This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and modified with some useful utilities, components, and settings that we ([Input Logic](https://github.com/inputlogic)) often need.

## Local development

Start by creating a `.env.local` file in the project root. You can use the [1Password Generator](https://1password.com/password-generator/) to create a random session secret easily.

```
NEXT_PUBLIC_ENV=dev
API_URL=http://localhost:8000 or http://localhost:8000/api depending on your setup
SESSION_SECRET=[RANDOM-32-CHARACTER-STRING]
```

Now install and run the project:

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## DEMOS

- [Network Requests](https://www.loom.com/share/75b811bbc4d54fbda7f3d62b6e8083a3)
- [Billing](https://www.loom.com/share/b3de864e9c0a4d0db4f9fd44fb88ac5c)

## Connect to the API

Now that your frontend is running, you'll need an API. For a local development API, setup the [Ninja Starter](https://github.com/inputlogic/ninja-starter).

If you'd like to skip this step, simply update your `.env.local` file to point to our staging API on Heroku:

```
API_URL=https://ninja-starter-9ee94834650e.herokuapp.com
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [React useState](https://reactjs.org/docs/hooks-state.html) - learn about the useState hook in React
- [React useEffect](https://reactjs.org/docs/hooks-effect.html) - learn about the useEffect hook in React

## Email

This project includes react-email for creating HTML emails with React components. Email templates are located in the `emails/` directory. Note that this app is not responsible for sending any emails at this time.

To run the react-email server (for development) run `npm run email`

For example templates and documentation, visit: https://react.email/templates

## Storybook

Next Starter supports Storybook, a component documentation tool. Adding stories for components is entirely optional, but it is encouraged for any components that are reused in many locations.

run storybook:

```
npm run storybook
```

see [https://storybook.js.org/](https://storybook.js.org/) for more info.
