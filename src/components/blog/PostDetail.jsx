import { usePost } from 'api/blog';
import { Link, useNavigate } from 'react-router-dom';

function PostDetail({ id }) {
  const navigate = useNavigate();
  const { post, loading, error, request } = usePost(id);

  const handlePostDelete = () => {
    if (window.confirm('Are you sure?')) {
      request('DELETE').then(() => {
        navigate('/blog/');
      });
    }
  };

  if (loading) return <p>Loading ...</p>;

  return (
    <div>
      {error && (
        <p>
          {error.response.status} {error.response.statusText}
        </p>
      )}
      {post && (
        <>
          <h2 className="text-3xl mt-10 mb-5">{post.title}</h2>

          <img
            src="https://placeimg.com/640/480/tech"
            alt=""
            className="rounded w-64 float-left mr-5 mb-2"
          />

          {post.content.split(/[\r\n]+/).map((line, index) => {
            return (
              <p className="my-3" key={index}>
                {line}
              </p>
            );
          })}

          <div className="clear-both" />
        </>
      )}

      <hr className="my-5" />

      <div className="flex gap-4">
        <Link to="/blog/" className="hover:text-red-600">
          목록으로
        </Link>
        {post && (
          <Link to={`/blog/${id}/edit/`} className="hover:text-red-600">
            수정하기
          </Link>
        )}
        {post && (
          <button
            className="hover:text-red-600 cursor-pointer"
            onClick={handlePostDelete}
          >
            삭제하기
          </button>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
