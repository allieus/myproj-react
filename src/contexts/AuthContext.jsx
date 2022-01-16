import { createContext, useCallback, useContext } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';

import jwtDecode from 'jwt-decode';
import useLocalStorage from 'hooks/useLocalStorage';

// 주의: 전역 컨텍스트에는 최소한의 값만 담습니다. (ex: 로그인)
// 많은 값을 담을 경우, 성능이 급격하게 떨어집니다.
const INITIAL_STATES = {
  isLogged: false,
  // FIXME: 어떤 토큰을 저장해야 하는가???
  // user: access, refresh
  user: {},
};

const AuthContext = createContext();
AuthContext.displayName = 'Auth Context'; // TODO: 이 설정은 어디에 어떻게 보여지나???

function AuthProvider({ children }) {
  const {
    data: authStates,
    set: saveAuthStates,
    init: initAuthStates,
  } = useLocalStorage('auth', INITIAL_STATES);

  const loggedIn = useCallback(
    ({ access, refresh }) => {
      // DRF Token 응답의 Payload
      //  + exp, iat, jti, token_type, user_id
      //  + username, first_name, last_name
      const { exp, username, first_name, last_name } = jwtDecode(access);
      console.log('expire timestamp :', exp);

      return saveAuthStates({
        isLogged: true,
        user: { access, refresh, username, first_name, last_name },
      });
    },
    [saveAuthStates],
  );

  const loggedOut = useCallback(() => {
    return initAuthStates();
  }, [initAuthStates]);

  return (
    <AuthContext.Provider value={{ authStates, loggedIn, loggedOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
