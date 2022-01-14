import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

function TopNav() {
  const navigate = useNavigate();

  const {
    loggedOut,
    authStates: {
      isLogged,
      user: { username },
    },
  } = useAuth();

  const handleLogout = () => {
    loggedOut().then(() => {
      navigate('/accounts/login/');
    });
  };

  return (
    <div className="my-3">
      <div className="flex place-content-between gap-4">
        <NavLink to="/" className="px-4 py-3 font-semibold">
          이진석 블로그
        </NavLink>
        <div className="flex">
          <MyLink to="/blog/">블로그</MyLink>
          <MyLink to="/news/">뉴스룸</MyLink>
          {isLogged && (
            <>
              <MyLink to="/accounts/profile/">{username} 프로필</MyLink>
              <MyLink to="" onClick={handleLogout}>
                로그아웃
              </MyLink>
            </>
          )}
          {!isLogged && (
            <>
              <MyLink to="/accounts/login/">로그인</MyLink>
              <MyLink to="/accounts/profile/">회원가입</MyLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MyLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        baseClassName + ' ' + (isActive ? 'border-b-4 border-red-400' : '')
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

const baseClassName =
  'px-4 pt-3 pb-2 font-semibold hover:bg-red-200 hover:text-red-500 hover:text-white';

export default TopNav;
