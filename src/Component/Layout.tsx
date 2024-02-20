import Navbar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
}
