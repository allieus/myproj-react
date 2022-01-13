import Button from 'components/Button';
import Loading from 'components/icons/Loading';

function SubmitButton({ saveLoading, children }) {
  return (
    <Button disabled={saveLoading}>
      {saveLoading && <Loading className="w-10 h-10" />}
      {!children && '저장하기'}
      {children}
    </Button>
  );
}

export default SubmitButton;
