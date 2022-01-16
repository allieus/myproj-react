import { useAuthenticatedApiAxios } from 'api/base';

function useFormRequest(resourceUrl, resourcePk, noAuthenticate) {
  const [{ data: object, loading: queryLoading, error: queryError }] =
    useAuthenticatedApiAxios(`${resourceUrl}${resourcePk}/`, {
      manual: !resourcePk,
      noAuthenticate,
    });

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useAuthenticatedApiAxios(
    {
      url: !resourcePk ? resourceUrl : `${resourceUrl}${resourcePk}/`,
      method: !resourcePk ? 'POST' : 'PUT',
    },
    { manual: true, noAuthenticate },
  );

  return {
    object,
    queryLoading,
    queryError,
    saveLoading,
    saveError,
    saveErrorMessages,
    saveRequest,
  };
}

export default useFormRequest;
