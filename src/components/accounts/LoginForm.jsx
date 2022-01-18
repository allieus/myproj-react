import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INITIAL_FIELD_VALUES = { username: '', password: '' };

function LoginForm() {
  const navigate = useNavigate();

  const [{ loading, error }, requestToken] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      const { access, refresh } = response.data;
      // TODO: access/refresh token을 브라우저 어딘가에 저장해야 합니다.
      // 저장해서 페이지 새로고침이 발생하더라도 그 token이 유실되지 않아야 합니다.
      console.log('access :', access);
      console.log('refresh :', refresh);

      // 인증 후, 이동할 주소를 지정합니다.
      navigate('/');
    });
  };

  return (
    <div>
      <h2>Login</h2>

      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            type="text"
            name="username"
            value={fieldValues.username}
            onChange={handleFieldChange}
            placeholder="username"
            className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
          />
        </div>
        <div className="my-3">
          <input
            type="password"
            name="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            placeholder="passowrd"
            className="p-3 bg-gray-100 focus:outline-none focus:border focus:border-gray-400 w-full"
          />
        </div>
        <Button>로그인</Button>
      </form>

      <DebugStates fieldValues={fieldValues} />
    </div>
  );
}

export default LoginForm;
