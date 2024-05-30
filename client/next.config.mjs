
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    transpilePackages: ['ol', 'rlayers'],
    experimental: {
        esmExternals: 'loose'
    },
    sassOptions: {
        includePaths: ['./src/assets/styles'],
    },
    images: {
        unoptimized: true
    }
};

export default nextConfig;

