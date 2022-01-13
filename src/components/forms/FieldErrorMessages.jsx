function FieldErrorMessages({ errorMessages }) {
  return (
    <div className="p-1">
      {errorMessages?.map((message, index) => (
        <p key={index} className="text-base text-red-400">
          {message}
        </p>
      ))}
    </div>
  );
}

export default FieldErrorMessages;
