import useLocalStorage from './useLocalStorage';

const INITIAL_AUTH = { isLoggedIn: false };

function useAuth() {
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);
  return [auth, setAuth];
}

export default useAuth;
