/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // Assuming images are served over HTTPS
        hostname: process.env.WP_IMAGE_URL, // Use the environment variable for the hostname
        port: "", // Leave empty if not needed
        pathname: "**", // Allow all paths under the domain
      },
    ],
  },
};

module.exports = nextConfig;
