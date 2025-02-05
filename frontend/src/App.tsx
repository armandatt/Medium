import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  SignupPage  from './pages/Signup';
import { Blog } from './pages/Blog';
import SignInPage from './pages/SignIn';
import LandingPage from './pages/LandingPage';
import WritePage from './pages/WitePage';
import { BlogFull } from './pages/BlogFull';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/blog/:domainId" element={<Blog />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/blog/fullBlog/:id" element={<BlogFull />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
