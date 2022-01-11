import PostList from 'components/blog/PostList';
import { Link } from 'react-router-dom';

function PageBlogIndex() {
  return (
    <div>
      <h2 className="text-red-400 border-b-2 border-red-300">Blog</h2>
      <div>
        <PostList />
      </div>
      <hr className="my-5" />
      <div className="flex gap-4">
        <Link to="/blog/new/">새 포스팅 쓰기</Link>
      </div>
    </div>
  );
}

export default PageBlogIndex;
