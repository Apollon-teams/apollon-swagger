module.exports = {
  '**/*.{yaml,yml}': (filenames) =>
    filenames.map((filename) => `openapi-format ${filename} -o ${filename}`),
};