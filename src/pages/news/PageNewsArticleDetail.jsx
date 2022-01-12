import { useParams } from 'react-router-dom';
import ArticleDetail from 'components/news/ArticleDetail';

function PageNewsArticleDetail() {
  const { articleId } = useParams();

  return (
    <div>
      <h2>뉴스기사#{articleId} 보여주기</h2>
      <ArticleDetail articleId={articleId} />

      <h3>비슷한 기사 목록</h3>

      <h3>당신이 관심있을만한 기사</h3>

      <h3>광고</h3>
    </div>
  );
}

export default PageNewsArticleDetail;
