/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      return config;
    }

    const origEntry = config.entry;
    const entry = async () => {
      let entries = origEntry;
      if (typeof entries === 'function') {
        entries = await entries();
      }

      const instrumentFile = './instrument.ts';

      // Webpack accepts string, string[] or object as entrypoint's value.
      // https://webpack.js.org/configuration/entry-context/#entry
      // Generally in our testing main is just a string value
      // but for completeness/future saftey this covers all
      if (typeof entries.main === 'string') {
        entries.main = [instrumentFile, entries.main];
      } else if (Array.isArray(entries.main)) {
        entries.main = [instrumentFile, ...entries.main];
      } else {
        let imported = entries.main.import;
        if (typeof imported === 'string') {
          imported = [instrumentFile, imported];
        } else {
          imported = [instrumentFile, ...imported];
        }

        entries.main = {
          ...entries.main,
          import: imported
        };
      }

      return entries;
    };

    // Replace entry in config with new value
    return {
      ...config,
      entry
    };
  }
}

module.exports = withBundleAnalyzer(nextConfig);
