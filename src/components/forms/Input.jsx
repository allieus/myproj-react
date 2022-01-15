import { useEffect, useRef, useState } from 'react';

import FieldErrorMessages from './FieldErrorMessages';

function Input({ type, name, value, placeholder, onChange, errorMessages }) {
  const [imageUrl, setImageUrl] = useState(value);
  const inputRef = useRef();

  useEffect(() => {
    if (type === 'file') {
      setImageUrl((prevImageUrl) => {
        return value || prevImageUrl;
      });

      // "파일 선택"을 통해서 선택된 이미지를 보여줍니다.
      const file = inputRef.current.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          setImageUrl(this.result); // base64 image
        };
        reader.readAsDataURL(file);
      }
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
          ref={inputRef}
          type={type}
          name={name}
          // type=file 에서는 value 지정을 하지 않고, type=file 자체가 가지고 있는 값을 그대로 보여주도록 합니다.
          value={type !== 'file' ? value : undefined}
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
