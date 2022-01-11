import Footer from 'components/Footer';
import TopNav from 'components/TopNav';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import PageBlog from 'pages/blog/PageBlog';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="container mx-auto">
      <TopNav />

      <Routes>
        <Route path="/" element={<Navigate to="/blog/" />} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/accounts/profile/" element={<Profile />} />
        <Route path="/blog/" element={<PageBlog />} />
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
