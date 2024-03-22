/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')
const { codecovWebpackPlugin } = require('@codecov/webpack-plugin');

const ContentSecurityPolicy = `
  default-src 'self' vercel.live;
	script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live www.googletagmanager.com/gtag/js;
	style-src 'self' 'unsafe-inline';
	img-src * blob: data:;
	media-src 'none';
	connect-src *;
	font-src 'self';
`.replace(/\n/g, '')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/blog/Razorpay-Integration-with-Reactjs-and-Node',
        destination: '/blog/razorpay-integration-in-reactjs',
        permanent: true,
      },
      {
        source: '/blog/What-are-Design-Tokens-How-to-Create-Design-tokens-in-React',
        destination: '/blog/design-tokens-nextjs',
        permanent: true,
      },
      {
        source: '/blog/Structuring-SEO-and-Format-of-a-page-in-Nextjs-Effectively',
        destination: '/blog/seo-format-nextjs',
        permanent: true,
      },
      {
        source: '/blog/Connect-Database-with-nodejs-Part-1-MongoDB-using-Mongoose',
        destination: '/blog/connect-mongodb-with-nodejs',
        permanent: true,
      },
      {
        source: '/blog/Why-Did-Discord-Go-From-MongoDB-To-Cassandra-Then-ScyllaDB-Simplified',
        destination: '/blog/discord-mongodb-cassandra-scylladb',
        permanent: true,
      },
    ]
  },
  headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  webpack: (config) => {
    config.plugins.push(
      codecovWebpackPlugin({
        enableBundleAnalysis: typeof process.env.CODECOV_TOKEN === 'string',
        bundleName: 'sentry-docs',
        uploadToken: process.env.CODECOV_TOKEN,
      })
    );

    return config;
  }
}

module.exports = withContentlayer(nextConfig)


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "shubhdeep-chhabra",
    project: "shubhdeepchhabra",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
