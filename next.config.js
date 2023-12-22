/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: ["images.unsplash.com", "files.edgestore.dev"],
    },
};

module.exports = nextConfig;
