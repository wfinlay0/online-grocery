# online-grocery

This project is a web interface for the [model](public/modelv7.xlsx) built by Santiago Gallino and Joel Brock. It was developed at West Monroe for the Wharton School.

The app is built using

- React
- [NextJS](https://nextjs.org/)
- [Mantine](https://mantine.dev/) components
- [SheetJS](https://sheetjs.com/)

## Deployment notes

### Base Path Configuration

If you plan on deploying the app to a sub-path (anything but the root) of your domain, you must add the path to the `basePath` option of [`next.config.mjs`](next.config.mjs).

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

### Build

Use NextJS to create a production build

```sh
npm install
npm run build
```

The files will be built to the `out` directory.
