import { useRequest } from './base';

function usePostList(initialAutoRequest = true) {
  const {
    data: postList,
    loading,
    error,
    errorMessages,
    request,
  } = useRequest('/blog/api/posts/', [], initialAutoRequest);
  return { postList, loading, error, errorMessages, request };
}

function usePost(id, initialAutoRequest = true) {
  const {
    data: post,
    loading,
    error,
    errorMessages,
    request,
  } = useRequest(`/blog/api/posts/${id}/`, null, initialAutoRequest);
  return { post, loading, error, errorMessages, request };
}

export { usePostList, usePost };
