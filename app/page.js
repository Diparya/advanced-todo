'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/AuthContext';

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Redirect based on authentication status
      if (user) {
        router.push('/tasks'); // Redirect to the tasks page if logged in
      } else {
        router.push('/auth'); // Redirect to the auth page if not logged in
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return null; // Prevent UI from flashing during redirect
};

export default HomePage;
