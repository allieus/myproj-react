import Footer from 'components/Footer';
import TopNav from 'components/TopNav';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import PageBlogIndex from 'pages/blog/PageBlogIndex';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageBlogDetail from './pages/blog/PageBlogDetail';
import PageBlogForm from './pages/blog/PageBlogForm';

function App() {
  return (
    <div className="container mx-auto px-2">
      <TopNav />

      <Routes>
        <Route path="/" element={<Navigate to="/blog/" />} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/accounts/profile/" element={<Profile />} />
        <Route path="/blog/" element={<PageBlogIndex />} />
        <Route path="/blog/new/" element={<PageBlogForm />} />
        <Route path="/blog/:postId/" element={<PageBlogDetail />} />
        <Route path="/blog/:postId/edit/" element={<PageBlogForm />} />
        {/* <Route path="/reviews/" element={<ReviewList />} />
        <Route path="/reviews/new/" element={<ReviewForm />} />
        <Route path="/reviews/:reviewId/edit/" element={<ReviewForm />} />
        <Route path="/examples/components/" element={<Components />} />
        <Route path="/examples/css-module/" element={<CssModule />} />
        <Route path="/examples/css-in-js/" element={<CssInJs />} />
        <Route path="/examples/context-api/" element={<ContextApiSample />} />
        <Route
          path="/examples/context-api-2/"
          element={<ContextApiSample2 />}
        />
        <Route path="/examples/clock/" element={<Clock />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
