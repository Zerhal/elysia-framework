export default {
    '**/*.(ts|js)': filenames => [
      `bun lint ${filenames.join(' ')}`,
      `bun format ${filenames.join(' ')}`,
    ],
  }
  