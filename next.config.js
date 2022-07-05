/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = {
      "react-smooth": false,
      "react-toastify": false,
    };
    return config;
  },
};
