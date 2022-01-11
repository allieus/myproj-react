import { Link } from 'react-router-dom';

function PostSummary({ post }) {
  return (
    <div>
      <Link to={`/blog/${post.id}/`}>{post.title}</Link>
    </div>
  );
}

export default PostSummary;
