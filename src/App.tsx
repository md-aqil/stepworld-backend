import { useEffect, useState } from 'react';
import { Theme } from './settings/types';
import { StepWorldHomepage } from './components/generated/StepWorldHomepage';
import { DetailPage } from './components/generated/DetailPage';
import CourseDetailPage from './components/generated/CourseDetailPage';
import AdminPage from './components/generated/AdminPage';
import BlogPostPage from './components/generated/BlogPostPage';
import WhatsAppChatBubble from './components/WhatsAppChatBubble';

const theme: Theme = 'light';

type Route =
  | { name: 'home' }
  | { name: 'detail'; slug: string }
  | { name: 'course'; collegeSlug: string; courseSlug: string }
  | { name: 'blog' }
  | { name: 'admin' };

import { navigate } from './lib/navigation';

const parsePath = (path: string): Route => {
  const p = path.replace(/^\/+/, '');
  if (p.startsWith('admin')) return { name: 'admin' };
  if (p.startsWith('blog') || p.startsWith('mba-pgdm-admission-2027')) return { name: 'blog' };
  const courseMatch = p.match(/^university\/([\w-]+)\/([\w-]+)/);
  if (courseMatch) return { name: 'course', collegeSlug: courseMatch[1]!, courseSlug: courseMatch[2]! };
  const detailMatch = p.match(/^university\/([\w-]+)/);
  if (detailMatch) return { name: 'detail', slug: detailMatch[1]! };
  return { name: 'home' };
};

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const [route, setRoute] = useState<Route>(() => parsePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
      if (href.startsWith('#')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      navigate(href);
    };
    window.addEventListener('popstate', onPop);
    window.document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.document.removeEventListener('click', onClick);
    };
  }, []);

  const renderPage = () => {
    if (route.name === 'admin') return <AdminPage />;
    if (route.name === 'detail') return <DetailPage slug={route.slug} />;
    if (route.name === 'course') return <CourseDetailPage collegeSlug={route.collegeSlug} courseSlug={route.courseSlug} />;
    if (route.name === 'blog') return <BlogPostPage />;
    return <StepWorldHomepage />;
  };

  return (
    <>
      {renderPage()}
      {route.name !== 'admin' && <WhatsAppChatBubble />}
    </>
  );
}

export default App;