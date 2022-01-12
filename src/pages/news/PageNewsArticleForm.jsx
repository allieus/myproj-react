import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from 'components/news/ArticleForm';

function PageNewsArticleForm() {
  const navigate = useNavigate();

  const { articleId } = useParams();

  return (
    <ArticleForm
      articleId={articleId}
      handleDidSave={(savedPost) => navigate(`/news/${savedPost.id}/`)}
    />
  );
}

export default PageNewsArticleForm;
