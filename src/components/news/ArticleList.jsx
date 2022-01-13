import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import { useEffect } from 'react/cjs/react.development';
import ArticleSummary from './ArticleSummary';

function ArticleList() {
  const [{ data: articleList, loading, error }, refetch] = useApiAxios(
    '/news/api/articles/',
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="my-5">
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {articleList && (
        <div className="flex flex-wrap">
          {articleList.map((article) => (
            <div key={article.id} className="w-full md:w-1/2 xl:w-1/3 px-4">
              <ArticleSummary article={article} />
            </div>
          ))}
        </div>
      )}
      <DebugStates articleList={articleList} loading={loading} error={error} />
    </div>
  );
}

export default ArticleList;
