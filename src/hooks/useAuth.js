import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const INITIAL_AUTH = { isLoggedIn: false };

function useAuth() {
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  const login = useCallback(
    ({ access, refresh, username, first_name, last_name }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        username,
        first_name,
        last_name,
      });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  return [auth, setAuth, login, logout];
}

export default useAuth;
