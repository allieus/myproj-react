import { useNavigate, useParams } from 'react-router-dom';
import PostForm from 'components/blog/PostForm';

function PageBlogForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-3xl mt-10 mb-5">
        포스팅 {!postId ? '쓰기' : '수정'}
      </h2>
      <PostForm
        postId={postId}
        handleSuccess={(post) => navigate(`/blog/${post.id}/`)}
      />
    </div>
  );
}

export default PageBlogForm;
