# online-grocery

This project is a web interface for the [model](public/modelv7.xlsx) built by Santiago Gallino and Joel Brock. It was developed at West Monroe for the Wharton School.

The app is built using

- React
- [NextJS](https://nextjs.org/)
- [Mantine](https://mantine.dev/) components
- [SheetJS](https://sheetjs.com/)

## Deployment notes

### Base Path Configuration

Update the `basePath` option of [`next.config.mjs`](next.config.mjs) to match the pathname at which the app will be deployed.

For example, if the app is being deployed to
www.wharton.upenn.edu/foo/bar/online-grocery:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/foo/bar/online-grocery",
  images: { unoptimized: true },
};

export default nextConfig;
```

Make sure to include the leading slash, or set it to an empty string if deploying at the root.

### Build

Use NextJS to create a production build

```sh
npm install
npm run build
```

The files will be built to the `out` directory.
