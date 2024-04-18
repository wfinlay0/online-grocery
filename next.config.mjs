/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * tell next to build as a static web app
     */
    output: 'export',
    /**
     * will be deployed to a sub-path (repo site) on github pages for testing
     * prefixed to any reference to static assets in the `public` directory
     */
    basePath: '/online-grocery',
    /**
     * no custom image loader for now
     * https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization
     */
    images: { unoptimized: true },
};

// [ ] figure out hosting, then devops work and have a separate testing env
export default nextConfig;
