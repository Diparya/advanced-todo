'use client';

import { useAuth } from '@/utils/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, signInWithPopup } from '@/utils/firebase';

const AuthPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      router.push('/tasks'); // Redirect to tasks page if already logged in
    }
  }, [loading, user, router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/tasks'); // Redirect after successful login/signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
      router.push('/tasks'); // Redirect after successful Google Sign-In
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="text-gray-600 w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="text-gray-600 w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 mt-4"
        >
          Sign In with Google
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
