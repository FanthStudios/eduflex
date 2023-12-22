/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        edgestoreAccessKey: process.env.EDGE_STORE_ACCESS_KEY,
        edgestoreSecretKey: process.env.EDGE_STORE_SECRET_KEY,
    },
    images: {
        domains: ["images.unsplash.com", "files.edgestore.dev"],
    },
};

module.exports = nextConfig;
