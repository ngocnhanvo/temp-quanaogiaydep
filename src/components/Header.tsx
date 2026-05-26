import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';
import { useLanguage, getNameLang } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import { AppRouterProps, Pages } from '@/entities';
import {handlePageLink}  from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from 'react-hook-form';


export default function Header(props: AppRouterProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { itemCount, actions } = useCart(language);
  let navItems = props.pages.filter((a: Pages) => { 
    if (!a.slug) return false;
    return a.lang === language && a.header == true;
  });
  const langs = [...new Set(props.pages.map((a: Pages) => a.lang))];
  const link_home = navItems.find((a:Pages)=> a.key === 'home' && a.lang === language && a.slug != undefined).slug;

  const isActive = (slug: string) => {
    const str:string = "/" + slug;
    //console.log(`location.pathname`, location.pathname, `slug`, slug, location.pathname === str || location.pathname === str + "/");
    return location.pathname === str || location.pathname === str + "/";
  };

  return (
    <>
      <header className="w-full bg-background border-b border-primary/10 sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link onClick={(e) => handlePageLink(e, `/`, navigate)} to={link_home} className="font-heading text-2xl md:text-3xl text-primary">
              {getTranslation('footer.company', language, props)}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.slug}
                  onClick={(e) => handlePageLink(e, `/${item.slug}`, navigate)}
                  to={item.slug}
                  className={`font-paragraph text-base transition-colors ${
                    isActive(item.slug)
                      ? 'text-linkcolor'
                      : 'text-primary hover:text-linkcolor'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Cart & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Change language"
              >
                <Globe className="h-5 w-5" />
                <span className="font-paragraph text-sm font-semibold uppercase">{language}</span>
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-background border border-grey300 rounded-lg shadow-lg overflow-hidden"
                  >
                    {langs.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang as 'vi' | 'en');
                          setIsLangOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 font-paragraph text-sm transition-colors ${
                          language === lang
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'text-foreground hover:bg-grey100'
                        }`}
                      >
                        {getNameLang(lang)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              {navItems.map((item) => (
                <Link
                  key={item.slug}
                  to={item.slug}
                  onClick={(e) => {
                    setIsMenuOpen(false)
                    handlePageLink(e, `/${item.slug}`, navigate)
                  }}
                  className={`block font-paragraph text-base py-2 transition-colors ${
                    isActive(item.slug)
                      ? 'text-linkcolor'
                      : 'text-primary hover:text-linkcolor'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      <Cart {...props} />
    </>
  );
}
