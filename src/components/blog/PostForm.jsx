import { usePost, usePostList } from 'api/blog';
import useFieldValues from 'hooks/useFieldValues';
import { useCallback } from 'react';

const INITIAL_FIELD_VALUES = {
  title: '',
  content: '',
};

function PostForm({ postId, handleSuccess }) {
  const { request: postRequest } = usePostList(false);

  // 생성(postId==undefined)에서는 post는 null
  const {
    post,
    errorMessages,
    request: putRequest,
  } = usePost(postId, !!postId);

  const { fieldValues, handleFieldChange } = useFieldValues(
    post || INITIAL_FIELD_VALUES,
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!postId) {
        postRequest('POST', fieldValues).then((response) => {
          const post = response?.data;
          if (handleSuccess) handleSuccess(post);
        });
      } else {
        putRequest('PUT', fieldValues).then((response) => {
          const post = response?.data;
          if (handleSuccess) handleSuccess(post);
        });
      }
    },
    [postId, fieldValues, postRequest, putRequest, handleSuccess],
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="제목을 입력해주세요."
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
          />
          <ErrorMessages errorMessages={errorMessages.title} />
        </div>

        <div className="mb-4">
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessages errorMessages={errorMessages.content} />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}

function ErrorMessages({ errorMessages }) {
  if (!errorMessages) return null;
  return (
    <div className="text-xs text-red-500 p-1">
      {errorMessages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  );
}

export default PostForm;
