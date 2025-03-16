'use server';
import { AuthError } from 'next-auth';
import type { AuthProvider } from '@toolpad/core';
import { signIn } from '../../../auth';

export default async function serverSignIn(provider: AuthProvider, formData: FormData, callbackUrl?: string) {
  try {
    return await signIn(provider.id, {
      ...(formData && { email: formData.get('email'), password: formData.get('password') }),
      redirectTo: callbackUrl ?? '/',
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      console.log("Redirecting user as part of NextAuth flow.");
      throw error;
    }

    if (error instanceof AuthError) {
      console.warn(`⚠️ Authentication failed: ${error.type}`);
      return {
        error: error.type === 'CredentialsSignin' ? 'Invalid credentials.' : 'An authentication issue occurred.',
        type: error.type,
      };
    }

    console.error("Unexpected authentication error:", error);
    return {
      error: 'An unexpected error occurred during authentication.',
      type: 'UnknownError',
    };

  }
}