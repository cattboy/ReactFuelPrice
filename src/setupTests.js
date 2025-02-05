// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure React Testing Library
configure({ testIdAttribute: 'data-testid' });

// Reset any mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
}); 