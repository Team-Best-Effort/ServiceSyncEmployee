import '@testing-library/jest-dom';
import { vi } from 'vitest';

declare global {
  var vi: any;
}

global.vi = vi;