// https://v1.tailwindcss.com/components/buttons

// simple, fill, outline, bordered, disabled, 3d, elevated, icons

const COLORS = {
  primary:
    'bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-100 disabled:text-gray-700',
  success:
    'bg-green-500 hover:bg-green-700 text-white disabled:bg-gray-100 disabled:text-gray-700',
  // TODO: 다양한 스타일 추가
};

function Button({ type, children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`${COLORS[type]} font-bold py-2 px-4 rounded`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'primary',
};

export default Button;
