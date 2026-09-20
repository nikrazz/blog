module.exports = {
  plugins: {
    tailwindcss: {},
    // Keep the default targets and disable ancestor config AND custom-stat lookups.
    // Both searches otherwise escape Hugo's project-only Node read permissions.
    autoprefixer: { overrideBrowserslist: ["defaults"], stats: {} },
  },
};
