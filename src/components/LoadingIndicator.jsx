import Loading from './icons/Loading';

function LoadingIndicator({ children }) {
  return (
    <span>
      <Loading className="w-10 h-10" />
      <span className="text-xs">
        {!children && 'Loading ...'}
        {children}
      </span>
    </span>
  );
}

export default LoadingIndicator;
