/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ideathon-kjfd.onrender.com/api/:path*", 
      },
    ];
  },
};

export default nextConfig;
