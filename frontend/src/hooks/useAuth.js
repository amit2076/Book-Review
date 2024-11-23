import { useState, useEffect } from 'react';

export function useAuth() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token });
    }
  }, []);

  return { auth, setAuth };
}
