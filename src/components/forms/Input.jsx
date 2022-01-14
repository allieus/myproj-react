import { useEffect, useState } from 'react';

import FieldErrorMessages from './FieldErrorMessages';

function Input({ type, name, value, placeholder, onChange, errorMessages }) {
  const [imageUrl, setImageUrl] = useState(value);

  useEffect(() => {
    if (type === 'file') {
      setImageUrl((prevImageUrl) => {
        return !value ? prevImageUrl : value;
      });
    }
  }, [type, value]);

  // type[file] 필드에 한해
  // value가 null이거나 URL 포맷이라면 fieldValues에 빈 문자열을 할당합니다.
  useEffect(() => {
    if (type === 'file') {
      if (
        value === null ||
        (typeof value === 'string' && /^https?:\/\//.test(value))
      ) {
        // FIXME: WHY??? - 그냥 onChange를 호출하여 상탯값을 변경 요청하면 상탯값이 변경되지 않습니다. :-(
        setTimeout(() => onChange({ target: { name, value: '' } }), 0);
      }
    }
  }, [value]); // eslint-disable-line

  return (
    <div>
      <div className="flex items-center">
        {imageUrl && (
          <a href={imageUrl} target="_blank" rel="noreferrer">
            <img src={imageUrl} alt="" className="rounded h-8 float-left" />
          </a>
        )}
        <input
          type={type}
          name={name}
          value={type !== 'file' ? value : ''}
          placeholder={placeholder}
          onChange={onChange}
          className={`p-2 outline-none focus:border ${
            type !== 'file' ? 'bg-gray-100 w-full' : ''
          }`}
        />
      </div>
      <FieldErrorMessages errorMessages={errorMessages} />
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  value: '',
};

export default Input;
