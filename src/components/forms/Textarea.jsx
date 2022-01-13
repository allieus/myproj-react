import FieldErrorMessages from './FieldErrorMessages';

function Textarea({ name, value, placeholder, onChange, errorMessages }) {
  return (
    <div>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="h-80 p-2 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
      />
      <FieldErrorMessages errorMessages={errorMessages} />
    </div>
  );
}

Textarea.defaultProps = {
  value: '',
};

export default Textarea;
