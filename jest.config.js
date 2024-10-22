module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Для TypeScript файлів
    "^.+\\.jsx?$": "babel-jest", // Для JavaScript файлів
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)", // Дозволяємо Jest трансформувати axios
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Для обробки SCSS або CSS
  },
};
