import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { MotionProvider } from './lib/motion.jsx';
import Home from './pages/Home.jsx';
import Workspaces from './pages/Workspaces.jsx';
import WorkspaceDetail from './pages/WorkspaceDetail.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

// Scroll to top on route change; scroll to the target for hash links.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/workspaces/:slug" element={<WorkspaceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </MotionProvider>
  );
}
