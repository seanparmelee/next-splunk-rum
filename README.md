This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
1) Install the dependencies
```bash
npm install
```

2) Build the project
```bash
npm run build
```

This application is instrumented with `@next/bundle-analyzer` so your default browser should automatically open a few html files that have tree maps. The one of note is the one named `client.html` as it'll show the numerous (and duplicate) `@opentelemetry` dependencies that are included in the bundle.

Another thing of note is in the console. The build should fail with an error similar to `ReferenceError: NodeList is not defined`.