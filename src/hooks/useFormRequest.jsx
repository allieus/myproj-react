import { useApiAxios } from 'api/base';

function useFormRequest(resourceUrl, resourcePk) {
  const [{ data: object, loading: queryLoading, error: queryError }] =
    useApiAxios(`${resourceUrl}${resourcePk}/`, { manual: !resourcePk });

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !resourcePk ? resourceUrl : `${resourceUrl}${resourcePk}/`,
      method: !resourcePk ? 'POST' : 'PUT',
    },
    { manual: true },
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
