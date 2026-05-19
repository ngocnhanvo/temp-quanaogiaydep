import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount, actions } = useCart();

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/products', label: 'Sản phẩm' },
    { path: '/blog', label: 'Blog' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'Giới thiệu' },
    { path: '/contact', label: 'Liên hệ' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="w-full bg-background border-b border-primary/10 sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="font-heading text-2xl md:text-3xl text-primary">
              THỜI TRANG
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-paragraph text-base transition-colors ${
                    isActive(link.path)
                      ? 'text-linkcolor'
                      : 'text-primary hover:text-linkcolor'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={actions.toggleCart}
                className="relative p-2 text-primary hover:text-linkcolor transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-paragraph w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-primary hover:text-linkcolor transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-6 pt-6 border-t border-primary/10 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-paragraph text-base py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-linkcolor'
                      : 'text-primary hover:text-linkcolor'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <Cart />
    </>
  );
}
