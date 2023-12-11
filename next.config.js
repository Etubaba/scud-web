require("dotenv").config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MAPS_API_KEY3: process.env.MAPS_API_KEY3
  }

  // async rewrites() {
  //   return [
  //     {
  //       source: "/auth/register",
  //       destination: "http://test.scud.io/api/v1/*",
  //     },
  //   ];
  // },

  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;
