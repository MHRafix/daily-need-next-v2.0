/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = {
  future: { webpack5: true },
  webpack: (config) => {
    config.resolve.fallback = {
      "react-smooth": false,
      "react-toastify": false,
    };
  },
};
