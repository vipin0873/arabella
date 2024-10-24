/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "placehold.co"
            },
            {
                protocol: 'https',
                hostname: "encrypted-tbn0.gstatic.com"
            },
            {
                protocol: 'https',
                hostname: "i.pravatar.cc"
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
