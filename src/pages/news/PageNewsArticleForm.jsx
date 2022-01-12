import useAxios from 'axios-hooks';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = { title: '', content: '' };

function PageNewsArticleForm() {
  const navigate = useNavigate();

  const [{ loading: saveLoading, error: saveError }, saveRequest] = useAxios(
    {
      url: 'http://localhost:8000/news/api/articles/',
      method: 'POST',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedPost = response.data;
      navigate(`/news/${savedPost.id}/`);
    });
  };

  return (
    <div>
      <H2>Article Form</H2>

      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>

        <div className="my-3">
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>

        <div className="my-3">
          <Button>저장하기</Button>
        </div>
      </form>
      <DebugStates fieldValues={fieldValues} />
    </div>
  );
}

export default PageNewsArticleForm;
