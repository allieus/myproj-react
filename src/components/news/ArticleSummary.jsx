import DjangoLogo from 'components/icons/DjangoLogo';
import { Link } from 'react-router-dom';

function ArticleSummary({ article }) {
  return (
    <Link
      to={`/news/${article.id}/`}
      className="block bg-gray-100 border-gray-100 border-2 rounded-lg overflow-hidden mb-10"
    >
      {article.photo && (
        <img
          src={article.photo}
          alt={article.title}
          className="w-full aspect-video object-cover"
        />
      )}
      {!article.photo && <DjangoLogo className="w-full aspect-video" />}
      <div className="p-8 sm:p-9 md:p-7 xl:p-9">
        <h3>{article.title}</h3>
      </div>
    </Link>
  );
}

export default ArticleSummary;
