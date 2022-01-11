import { usePostList } from 'api/blog';
import PostSummary from './PostSummary';

function PostList() {
  const { postList } = usePostList();

  return (
    <div>
      {postList.map((post) => (
        <PostSummary post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
