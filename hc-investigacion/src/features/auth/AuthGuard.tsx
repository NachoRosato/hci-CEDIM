"use client";
import { useEffect, useState } from 'react';
import { getRuntimeConfig } from '@/utils/runtimeConfig';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const cfg = await getRuntimeConfig();
        if (cfg.authOptional) {
          setAllowed(true);
          return;
        }
      } catch {}
      const token = sessionStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      } else {
        setAllowed(true);
      }
    })();
  }, [router]);

  if (!allowed) return null;
  return <>{children}</>;
}


