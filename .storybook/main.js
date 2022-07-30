module.exports = {
  core: {
    builder: 'webpack5',
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/preset-scss',
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  typescript: {
    // We check typescript elsewhere; this should speed up builds
    check: false
  }
}
