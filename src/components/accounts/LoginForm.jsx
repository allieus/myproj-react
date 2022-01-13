import Input from 'components/forms/Input';
import SubmitButton from 'components/forms/SubmitButton';
import useFieldValues from 'hooks/useFieldValues';
import useFormRequest from 'hooks/useFormRequest';

const INITIAL_FIELD_VALUES = { username: '', password: '' };

function LoginForm() {
  // /accounts/api/token/ 주소에 jwt token 발급 API가 구현되어있습니다. (using djangorestframework-simplejwt)
  const { saveLoading, saveError, saveErrorMessages, saveRequest } =
    useFormRequest('/accounts/api/token/');

  const { fieldValues, handleFieldChange, formData } =
    useFieldValues(INITIAL_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: formData,
    }).then((response) => {
      const { access, refresh } = response.data;
      console.log(access);
      console.log(refresh);
    });
  };

  return (
    <div>
      {saveError && saveError.response?.status !== 400 && (
        <div className="text-red-400">{`저장 중 에러가 발생했습니다. (${saveError.response?.status} ${saveError.response?.statusText})`}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <Input
            type="text"
            name="username"
            value={fieldValues.username}
            placeholder="아이디를 입력해주세요."
            onChange={handleFieldChange}
            errorMessages={saveErrorMessages.username}
          />
        </div>
        <div className="my-3">
          <Input
            type="password"
            name="password"
            value={fieldValues.password}
            placeholder="암호를 입력해주세요."
            onChange={handleFieldChange}
            errorMessages={saveErrorMessages.password}
          />
        </div>
        <div className="my-3">
          <SubmitButton saveLoading={saveLoading} />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
