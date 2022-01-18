import { NavLink } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

function TopNav() {
  const [auth, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
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
          {!auth.isLoggedIn && (
            <>
              <MyLink to="/accounts/login/">로그인</MyLink>
              <MyLink to="#">회원가입</MyLink>
            </>
          )}
          {auth.isLoggedIn && (
            <>
              <MyLink to="/accounts/profile/">프로필</MyLink>
              <button onClick={handleLogout} className={baseClassName}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        baseClassName + ' ' + (isActive ? 'border-b-4 border-red-400' : '')
      }
    >
      {children}
    </NavLink>
  );
}

const baseClassName =
  'px-4 pt-3 pb-2 font-semibold hover:bg-red-200 hover:text-red-500 hover:text-white';

export default TopNav;
