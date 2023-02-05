const withInit = require("./scripts/init");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withInit(nextConfig);
