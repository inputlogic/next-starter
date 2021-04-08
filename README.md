This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and modified with some useful utilities, components, and settings that we ([Input Logic](https://github.com/inputlogic)) often need.

## Getting Started

After cloning this repo:

```
npm install
```

Then run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## API

You'll need to make a local env file with the projects settings in it. Make a file named `.env.local` in the root of the project, and paste the API url into it:

```
NEXT_PUBLIC_API_URL=http://input-logic-api.herokuapp.com/
```

## Admin

You can control the data in the API by logging into the Django admin.

```
http://input-logic-api.herokuapp.com/admin/login
```

Please be careful, as this API powers our live web site at inputlogic.ca. 

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [React useState](https://reactjs.org/docs/hooks-state.html) - learn about the useState hook in React
- [React useEffect](https://reactjs.org/docs/hooks-effect.html) - learn about the useEffect hook in React
