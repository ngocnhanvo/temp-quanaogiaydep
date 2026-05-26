import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppRouterProps } from '@/entities';
import { formatCurrency, removeUnicode } from '@/lib/stringUtils';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Products } from '@/entities';
import { useCart } from '@/integrations';
import { getTranslation, getContent } from '@/lib/i18n';
import { Image } from '@/components/ui/image';

export default function ProductDetailPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { addingItemId, actions } = useCart(language);
  
  let path = window.location.pathname.startsWith("/") ? window.location.pathname.substring(1) : window.location.pathname;
  path = path.endsWith("/") ? path.slice(0, -1) : path;
  const dt_products = props.data_products;
  const product = dt_products.find(p => p.slug?.[language] === path);
  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground font-paragraph">
        <Header {...props} />
        <main className="pt-40 pb-20 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-heading mb-4">{getTranslation('blog.detail.notFound', language, props)}</h1>
            <button onClick={() => navigate(-1)} className="text-linkcolor hover:underline underline-offset-4 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> {getTranslation('blog.detail.back', language, props)}
            </button>
        </main>
        <Footer {...props} />
      </div>
    );
  }

  const link_products = getContent(props.pages, 'products', language);
  const link_home = getContent(props.pages, 'home', language);
  
  const currentIndex = dt_products.findIndex(p => p._id === product._id);
  const prevProduct = dt_products[currentIndex - 1];
  const nextProduct = dt_products[currentIndex + 1];

  const handleAddToCart = async (product: Products) => {
    product.collectionId = 'products';
    product.quantity = 1;

    await actions.addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header {...props} />
      
      <main className="pt-20 pb-20">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          {/* Product Header Navigation Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-primary/10 pb-8"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 font-paragraph text-[10px] uppercase tracking-[0.2em] text-primary/50">
              <button onClick={() => navigate(link_home)} className="hover:text-linkcolor transition-colors">
                {getTranslation('footer.home', language, props)}
              </button>
              <span className="w-1 h-1 rounded-full bg-primary/20" />
              <button onClick={() => navigate(link_products)} className="hover:text-linkcolor transition-colors">
                {getTranslation('footer.products', language, props)}
              </button>
              <span className="w-1 h-1 rounded-full bg-primary/20" />
              <span className="text-primary truncate max-w-[150px] md:max-w-none">
                {product.itemName[language]}
              </span>
            </nav>

            {/* Prev/Next Actions */}
            <div className="flex items-center gap-8 font-paragraph text-[10px] uppercase tracking-[0.2em]">
              <button 
                onClick={() => navigate(link_products)}
                className="text-primary hover:text-linkcolor transition-colors font-bold"
              >
                {getTranslation('blog.detail.back', language, props)}
              </button>

              <button 
                onClick={() => prevProduct && navigate(`/${prevProduct.slug?.[language] || prevProduct._id}`)}
                disabled={!prevProduct}
                className={`group flex items-center gap-2 transition-colors ${!prevProduct ? 'opacity-20 cursor-not-allowed' : 'text-primary/60 hover:text-primary'}`}
              >
                <ArrowLeft className={`w-3 h-3 ${prevProduct ? 'group-hover:-translate-x-1' : ''} transition-transform`} />
                <span>{language === 'vi' ? 'Trước' : 'Prev'}</span>
              </button>
              
              <button 
                onClick={() => nextProduct && navigate(`/${nextProduct.slug?.[language] || nextProduct._id}`)}
                disabled={!nextProduct}
                className={`group flex items-center gap-2 transition-colors ${!nextProduct ? 'opacity-20 cursor-not-allowed' : 'text-primary/60 hover:text-primary'}`}
              >
                <span>{language === 'vi' ? 'Tiếp' : 'Next'}</span>
                <motion.div
                  animate={nextProduct ? { x: [0, 4, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </motion.div>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Product Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] bg-secondary overflow-hidden group"
            >
              {product.itemImage && (
                <Image
                  src={product.itemImage[language]}
                  alt={product.itemName[language]}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              )}
            </motion.div>

            {/* Product Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col space-y-8"
            >
              <div className="space-y-4">
                {product.category && (
                  <span className="text-xs uppercase tracking-[0.3em] text-primary/50 block">
                    {product.category[language]}
                  </span>
                )}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
                  {product.itemName[language]}
                </h1>
                <p className="font-heading text-3xl text-linkcolor">
                  {formatCurrency(product.itemPrice[language] || 0, product.itemCurrency[language])}
                </p>
              </div>

              <div className="w-12 h-[1px] bg-primary/20" />

              <div className="prose prose-lg">
                <p className="font-paragraph text-lg text-primary/70 leading-relaxed">
                  {product.itemDescription[language]}
                </p>
              </div>

              <div className="pt-8 space-y-12">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addingItemId === product._id}
                  className="w-full py-5 bg-primary text-primary-foreground font-paragraph text-sm uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group"
                >
                  {addingItemId === product._id ? (
                    getTranslation('prods.adding', language, props)
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                      {getTranslation('prods.addToCart', language, props)}
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-primary/10">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Truck className="w-6 h-6 text-primary/40" />
                    <span className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold">Giao hàng toàn quốc</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-primary/40" />
                    <span className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold">Thanh toán bảo mật</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-3">
                    <RotateCcw className="w-6 h-6 text-primary/40" />
                    <span className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold">Đổi trả trong 7 ngày</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer {...props} />
    </div>
  );
}
