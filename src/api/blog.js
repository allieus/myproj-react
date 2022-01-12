import { useRequest } from './base';

function usePostList(manual = false) {
  const {
    data: postList,
    loading,
    error,
    errorMessages,
    request,
  } = useRequest('/blog/api/posts/', [], manual);
  return { postList, loading, error, errorMessages, request };
}

function usePost(id, manual = false) {
  const {
    data: post,
    loading,
    error,
    errorMessages,
    request,
  } = useRequest(`/blog/api/posts/${id}/`, null, manual);
  return { post, loading, error, errorMessages, request };
}

export { usePostList, usePost };
