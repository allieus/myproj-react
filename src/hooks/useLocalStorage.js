import { useCallback, useEffect, useState } from 'react';

function readFromLocalStorage(key) {
  return window.localStorage.getItem(key);
}

function writeToLocalStorage(key, data) {
  if (typeof data === 'function') {
    console.warn('[writeToLocalStorage] data는 함수를 지원하지 않습니다.');
  } else {
    const json_string = JSON.stringify(data);
    window.localStorage.setItem(key, json_string);
  }
}

function useLocalStorage(key, defaultValue) {
  const [data, setData] = useState(defaultValue);

  // 직접적으로 setData를 호출하지 않고, 로컬스토리지에 저장하면
  // 로컬 스토리지 이벤트를 받아서 상탯값에 반영합니다.
  const set = useCallback(
    (data) => {
      writeToLocalStorage(key, data);
      // useState의 setter는 Promise가 아니기에 Promise.then 객체를 반환토록 합니다.
      // Promise를 통해 then 체이닝을 할 수 있습니다.
      return Promise.resolve(setData(data));
    },
    [key],
  );

  const init = useCallback(() => {
    return set(defaultValue);
  }, [key]);

  useEffect(() => {
    let current_data = readFromLocalStorage(key);
    if (current_data === 'undefined') current_data = undefined;

    if (!current_data && defaultValue) {
      console.log('saving defaultValue :', typeof defaultValue, defaultValue);
      set(defaultValue);
    }

    if (current_data && current_data !== 'undefined') {
      try {
        const parsed_data = JSON.parse(current_data);
        if (parsed_data) {
          setData(parsed_data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [key]);

  return { data, set, init };
}

export default useLocalStorage;
