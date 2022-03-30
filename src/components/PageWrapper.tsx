import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function PageWrapper() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
