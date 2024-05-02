/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    instrumentationHook: true,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
        poll: 500,
    }
    return config
  },
};

export default nextConfig;
