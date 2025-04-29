import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EditProfilePage from './page';
import { SessionProvider } from 'next-auth/react';

// ✅ MOCK firebase/app
vi.mock('firebase/app', () => {
  const mockApp = {
    options: {},
    name: '[DEFAULT]',
    automaticDataCollectionEnabled: false,
  };
  return {
    initializeApp: vi.fn(() => mockApp),
    getApp: vi.fn(() => mockApp),
    SDK_VERSION: '11.3.1',
    _registerComponent: vi.fn(),
    registerVersion: vi.fn(),
  };
});

// ✅ MOCK firebase/auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ app: { name: '[DEFAULT]' }, currentUser: { email: 'test@example.com' } })),
  signOut: vi.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
  EmailAuthProvider: { credential: vi.fn(() => 'mockCredential') },
  reauthenticateWithCredential: vi.fn(() => Promise.resolve()),
  updatePassword: vi.fn(() => Promise.resolve()),
}));

// ✅ MOCK firebase/database
vi.mock('firebase/database', () => ({
  ref: vi.fn(() => ({})),
  get: vi.fn(() => Promise.resolve({ exists: () => false })),
  update: vi.fn(() => Promise.resolve()),
  query: vi.fn(),
  orderByChild: vi.fn(),
  equalTo: vi.fn(),
  getDatabase: vi.fn(() => ({})),
}));

const mockSession = {
  user: {
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg',
  },
  expires: 'fake-expiry',
};

const renderWithSession = () => {
  render(
    <SessionProvider session={mockSession}>
      <EditProfilePage />
    </SessionProvider>
  );
};

describe('EditProfilePage', () => {
  it('updates the avatar URL when a new URL is entered', async () => {
    renderWithSession();

    await waitFor(() => expect(screen.getByDisplayValue('https://example.com/avatar.jpg')).toBeInTheDocument());

    const imageInput = screen.getByLabelText(/profile image url/i);
    fireEvent.change(imageInput, { target: { value: 'https://new-avatar.com/image.png' } });

    expect(imageInput).toHaveValue('https://new-avatar.com/image.png');
  });

  it('submits password change when original and new password are provided', async () => {
    renderWithSession();

    await waitFor(() => {
      expect(screen.getByLabelText(/Original Password/i)).toBeInTheDocument();
    });

    const originalPasswordInput = screen.getByLabelText(/Original Password/i);
    const newPasswordInput = screen.getByLabelText(/New Password/i);

    fireEvent.change(originalPasswordInput, { target: { value: 'oldPass123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPass456' } });

    const saveButton = screen.getByRole('button');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Changes saved successfully!/i)).toBeInTheDocument();
    });
  });
});
