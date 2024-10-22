/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "11MB"
        }
    }
};

export default nextConfig;
