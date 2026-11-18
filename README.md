This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CI/CD

- **CI:** `.github/workflows/ci.yml` runs lint, type-check and a production build on every push and pull request to `main` and `sandbox`.
- **CD:** AWS Amplify Hosting deploys the `sandbox` branch (build spec: `amplify.yml`).

### One-time Amplify setup (sandbox)
1. AWS Console → **Amplify** → **Create new app** → **GitHub** → pick this repo and the `sandbox` branch.
2. Platform: **Next.js – SSR (WEB_COMPUTE)**. Amplify picks up `amplify.yml` automatically.
3. Environment variables: `STRIPE_SECRET_KEY` (use a **test** key `sk_test_...`) and `NEXT_PUBLIC_SITE_URL` (the Amplify URL, e.g. `https://sandbox.<id>.amplifyapp.com`).
4. Save and deploy. Every push to `sandbox` now redeploys.
