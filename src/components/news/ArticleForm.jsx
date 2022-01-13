import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import FieldErrorMessages from 'components/forms/FieldErrorMessages';
import H2 from 'components/H2';
import Input from 'components/forms/Input';
import Loading from 'components/icons/Loading';
import Textarea from 'components/forms/Textarea';
import useFieldValues from 'hooks/useFieldValues';
import useFormRequest from 'hooks/useFormRequest';

const INIT_FIELD_VALUES = { title: '', content: '' };

function ArticleForm({ articleId, handleDidSave }) {
  const {
    object: article,
    queryError,
    saveLoading,
    saveError,
    saveErrorMessages,
    saveRequest,
  } = useFormRequest('/news/api/articles/', articleId);

  const { fieldValues, handleFieldChange, formData } = useFieldValues(
    article || INIT_FIELD_VALUES,
  );

  // Input 컴포넌트에서 input[type=file]의 null에 대한 처리를 하기에
  // 관련 useEffect 로직은 제거합니다.

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  if (queryError) {
    return `로딩 중 에러가 발생했습니다. (${queryError.response?.status} ${queryError.response?.statusText})`;
  }

  return (
    <div>
      <H2>Article Form</H2>

      <FieldErrorMessages errorMessages={saveErrorMessages.non_field_errors} />

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <Input
            type="text"
            name="title"
            value={fieldValues.title}
            placeholder="기사 제목을 입력해주세요."
            onChange={handleFieldChange}
            errorMessages={saveErrorMessages.title}
          />
        </div>

        <div className="my-3">
          <Textarea
            name="content"
            value={fieldValues.content}
            placeholder="기사 내용을 입력해주세요."
            onChange={handleFieldChange}
            errorMessages={saveErrorMessages.content}
          />
        </div>

        <div className="my-3">
          <Input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            value={fieldValues.photo}
            onChange={handleFieldChange}
            errorMessages={saveErrorMessages.photo}
          />
        </div>

        <div className="my-3">
          <Button disabled={saveLoading}>
            {saveLoading && <Loading className="w-10 h-10" />}
            저장하기
          </Button>
          {saveError &&
            saveError.response?.status !== 400 &&
            `저장 중 에러가 발생했습니다. (${saveError.response?.status} ${saveError.response?.statusText})`}
        </div>
      </form>

      <DebugStates
        article={article}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default ArticleForm;
