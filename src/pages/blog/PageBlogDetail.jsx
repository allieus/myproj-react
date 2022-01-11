import { useParams } from 'react-router-dom';
import PostDetail from 'components/blog/PostDetail';

function PageBlogDetail() {
  const { postId } = useParams();

  return (
    <div>
      <PostDetail id={postId} />
    </div>
  );
}

export default PageBlogDetail;
