import { useCallback, useEffect, useState } from 'react';

import { API_HOST } from 'Constants';
import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useAuth } from 'contexts/AuthContext';

const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

const useAxios = makeUseAxios({
  axios: axiosInstance,
});

function useAuthenticatedApiAxios(defaultConfig, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isInit, setIsInit] = useState(true);

  const {
    // loggedOut,
    authStates: {
      isLogged,
      user: { access },
    },
  } = useAuth();

  const execute = useCallback(
    (config) => {
      if (!options?.noAuthenticate && !isLogged) {
        console.warn(
          'useAuthenticatedApiAxios를 통한 API 요청에는 인증토큰이 필요합니다.',
        );
      } else {
        const newConfig = {
          ...(typeof defaultConfig === 'string'
            ? { url: defaultConfig }
            : defaultConfig),
          ...(typeof config === 'string' ? { url: config } : config),
        };

        if (!options?.noAuthenticate) {
          newConfig['headers'] ||= {};
          newConfig['headers']['Authorization'] = isLogged
            ? `Bearer ${access}`
            : '';
        }

        setLoading(true);
        setError(null);

        return axiosInstance(newConfig)
          .then((response) => {
            setResponse(response);
            setData(response.data);
            return response;
          })
          .catch((e) => {
            setError(e);
            throw e;
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [defaultConfig, isLogged, access, options],
  );

  useEffect(() => {
    // TODO: token이 만료되기 전에, refresh를 해줘야합니다. 현재는 강제 로그아웃 처리를 합니다.
    // 토큰이 만료되었다. 상태 코드는 403 Firbidden  // loggedOut 호출
    // 권한이 없다. 상태 코드는?

    if (error?.response?.status === 400) {
      setErrorMessages(error.response.data);
    } else {
      setErrorMessages({});
    }
  }, [error]);

  useEffect(() => {
    if (isInit && isLogged && !options.manual) {
      execute();
      setIsInit(false);
    }
  }, [options, isLogged]); // eslint-disable-line

  return [{ data, loading, error, response, errorMessages }, execute];
}

function useApiAxios(config, options) {
  const [{ data, loading, error, response }, execute, manualCancel] = useAxios(
    config,
    options,
  );

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    if (error?.response?.status === 400) {
      setErrorMessages(error.response.data);
    } else {
      setErrorMessages({});
    }
  }, [error]);

  return [
    { data, loading, error, response, errorMessages },
    execute,
    manualCancel,
  ];
}

function useRequest(resourceUrl, initialState, manual = false) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});

  // api 요청을 한 axios 인스턴스를 반환합니다. (Promise 객체)
  const request = useCallback(
    (method = 'GET', data) => {
      setLoading(true);
      setError(null);
      setErrorMessages({});

      return axiosInstance({
        method,
        url: resourceUrl,
        data,
      })
        .then((response) => {
          setData(response.data);
          return response;
        })
        .catch((error) => {
          setError(error);
          // 400 Bad Request 경우에만 에러 메세지를 저장합니다.
          if (error.response.status === 400) {
            setErrorMessages(error.response.data);
          }
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [resourceUrl],
  );

  useEffect(() => {
    if (!manual) request();
  }, [manual]);

  return { data, loading, error, errorMessages, request };
}

export { axiosInstance, useAuthenticatedApiAxios, useApiAxios, useRequest };
