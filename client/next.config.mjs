/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    transpilePackages: ['ol', 'rlayers'],
    experimental: {
        esmExternals: 'loose'
    }
};

export default nextConfig;

