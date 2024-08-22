
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_REACT_APP='dev' ? '/client' : '/',
    transpilePackages: ['ol', 'rlayers'],
    experimental: {
        esmExternals: 'loose'
    },
    sassOptions: {
        includePaths: ['./src/assets/styles'],
    },
    images: {
        unoptimized: true
    },
};

export default nextConfig;

