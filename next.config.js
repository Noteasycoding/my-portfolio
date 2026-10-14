const { execSync } = require('child_process');

function git(command) {
  try {
    return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

// Real build metadata for the status bar. Vercel provides it; locally, ask git.
const commit = process.env.VERCEL_GIT_COMMIT_SHA || git('git rev-parse HEAD');
const branch = process.env.VERCEL_GIT_COMMIT_REF || git('git rev-parse --abbrev-ref HEAD');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BUILD_COMMIT: commit.slice(0, 7),
    NEXT_PUBLIC_BUILD_BRANCH: branch,
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
};

module.exports = nextConfig;
