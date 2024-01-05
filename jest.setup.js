import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);


jest.mock('./src/constants', () => ({
  VITE_API_URL: 'VITE_API_URL',
}));