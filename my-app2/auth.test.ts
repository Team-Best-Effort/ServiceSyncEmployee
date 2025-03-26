
/// <reference types="vitest" />
import { vi } from 'vitest';

import { signIn } from './auth';
import { db } from './app/(dashboard)/editProfile/lib/firebase';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';

vi.mock('next/server', () => ({}));


vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  get: vi.fn(),
  query: vi.fn(),
  orderByChild: vi.fn(),
  equalTo: vi.fn(),
}));

const mockValidUser = {
  email: 'test@example.com',
  password: 'correctpassword',
  name: 'Test User',
  role: 'employee',
  image: 'https://example.com/image.jpg'
};

const mockSuccessSnapshot = {
  exists: () => true,
  val: () => ({
    userId1: mockValidUser
  })
};

const mockFailedSnapshot = {
  exists: () => false,
  val: () => null
};

describe('Authentication Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signIn', () => {
    it('should successfully authenticate with valid credentials', async () => {
      // Mock the Firebase query chain for success case
      (ref as unknown as import('vitest').Mock).mockReturnValue({});
      (query as unknown as import('vitest').Mock).mockReturnValue({});
      (get as unknown as import('vitest').Mock).mockResolvedValue(mockSuccessSnapshot);

      const result = await signIn('credentials', {
        email: 'test@example.com',
        password: 'correctpassword',
        redirect: false,
      });

      expect(result).toEqual({
        ok: true,
        error: null,
        url: expect.any(String),
      });

      expect(ref).toHaveBeenCalledWith(db, 'employees');
      expect(orderByChild).toHaveBeenCalledWith('email');
      expect(equalTo).toHaveBeenCalledWith('test@example.com');
    });

    it('should fail authentication with invalid credentials', async () => {
      (ref as unknown as import('vitest').Mock).mockReturnValue({});
      (query as unknown as import('vitest').Mock).mockReturnValue({});
      (get as unknown as import('vitest').Mock).mockResolvedValue(mockFailedSnapshot);

      const result = await signIn('credentials', {
        email: 'test@example.com',
        password: 'wrongpassword',
        redirect: false,
      });

      expect(result).toEqual({
        ok: false,
        error: 'Invalid login credentials.',
      });
    });

    it('should handle database errors gracefully', async () => {
      (ref as unknown as import('vitest').Mock).mockReturnValue({});
      (query as unknown as import('vitest').Mock).mockReturnValue({});
      (get as unknown as import('vitest').Mock).mockRejectedValue(new Error('Database error'));

      const result = await signIn('credentials', {
        email: 'test@example.com',
        password: 'password',
        redirect: false,
      });

      expect(result).toEqual({
        ok: false,
        error: 'Authentication service is currently unavailable.',
      });
    });
  });

  describe('User Info Retrieval', () => {
    it('should successfully retrieve user info after authentication', async () => {
      (ref as unknown as import('vitest').Mock).mockReturnValue({});
      (query as unknown as import('vitest').Mock).mockReturnValue({});
      (get as unknown as import('vitest').Mock).mockResolvedValue(mockSuccessSnapshot);

      const result = await signIn('credentials', {
        email: 'test@example.com',
        password: 'correctpassword',
        redirect: false,
      });

      expect(result).toEqual({
        ok: true,
        error: null,
        url: expect.any(String),
      });

      const session = await result.session;
      expect(session?.user).toEqual({
        name: mockValidUser.name,
        email: mockValidUser.email,
        role: mockValidUser.role,
        image: mockValidUser.image,
      });
    });
  });
});
