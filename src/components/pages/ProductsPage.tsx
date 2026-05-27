import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Products, AppRouterProps } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import { formatCurrency } from '@/lib/stringUtils';
import { handlePageLink } from '@/components/PageTransition';

export default function ProductsPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const dt_products = props.data_products;
  // Dữ liệu mẫu cho sản phẩm, re-evaluate khi ngôn ngữ thay đổi
  const sampleProducts: Products[] = useMemo(() => dt_products, [language, props]); // Dependencies for useMemo

  // Khởi tạo state bằng dữ liệu mẫu thay vì mảng rỗng
  const [products, setProducts] = useState<Products[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>(sampleProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 12; // Giảm xuống 2 để test phân trang với 4 sản phẩm mẫu

  const { addingItemId, actions } = useCart(language);

  // Tự động dịch lại sản phẩm mẫu khi đổi ngôn ngữ (nếu đang dùng mẫu)
  useEffect(() => {
    if (products.length === 0 || products.some(p => p._id.startsWith('sample-'))) {
      setProducts(sampleProducts);
      extractCategories(sampleProducts);
    }
  }, [language, sampleProducts]);

  useEffect(() => {
    loadProducts();
  }, [skip, language]);

  // Reset bộ lọc khi đổi ngôn ngữ
  useEffect(() => {
    setSelectedCategory('all');
    setSearchQuery('');
    if (skip !== 0) {
      setSkip(0);
    }
  }, [language]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      // Mô phỏng độ trễ của network
      await new Promise(resolve => setTimeout(resolve, 500));

      const totalItems = sampleProducts.length;
      // Cắt mảng dữ liệu mẫu dựa trên phân trang
      const currentSlice = sampleProducts.slice(skip, skip + limit);

      if (skip === 0) {
        setProducts(currentSlice);
        extractCategories(sampleProducts); // Lấy category từ toàn bộ list để filter đầy đủ
      } else {
        setProducts(prev => [...prev, ...currentSlice]);
      }
      
      // Nếu tổng số item lớn hơn vị trí hiện tại thì vẫn còn trang kế tiếp
      setHasNext(skip + limit < totalItems);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractCategories = (items: Products[]) => {
    const cats = new Set<string>();
    items.forEach(item => {
      if (item.category) cats.add(item.category[language]);
    });
    setCategories(Array.from(cats));
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.itemName[language]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.itemDescription[language]?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category[language] === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product: Products) => {
    product.collectionId = 'products';
    product.quantity = 1;

    await actions.addToCart(product);
  };

  const loadMore = () => {
    setSkip(prev => prev + limit);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header {...props}/>

      {/* Hero Section */}
      <section className="w-full bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="font-heading text-5xl md:text-6xl text-secondary-foreground">
              {getTranslation('prods.hero.title', language, props)}
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground max-w-2xl mx-auto">
              {getTranslation('prods.hero.subtitle', language, props)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full border-b border-primary/10 bg-background sticky top-[89px] z-30">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-3 lg:py-6">
          {/* Mobile Layout (up to lg breakpoint) - Combined Search and Filter in one row */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <input
                type="text"
                placeholder={getTranslation('prods.search.placeholder', language, props)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-buttonborder bg-background text-primary font-paragraph text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="relative shrink-0">
              <div className={`flex items-center justify-center w-[42px] h-[42px] border transition-all ${
                selectedCategory !== 'all' 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-background border-buttonborder text-primary'
              }`}>
                <Filter className="w-5 h-5" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
              >
                <option value="all">{getTranslation('prods.filter.all', language, props)}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Layout (lg breakpoint and up) */}
          <div className="hidden lg:flex flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Input for Desktop */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <input
                type="text"
                placeholder={getTranslation('prods.search.placeholder', language, props)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category Filter Buttons for Desktop */}
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-5 h-5 text-primary" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 font-paragraph text-base transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-buttonborder text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {getTranslation('prods.filter.all', language, props)}
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 font-paragraph text-base transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-buttonborder text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="min-h-[600px]">
          {/* Không ẩn nội dung nếu đã có sản phẩm mẫu để hiển thị */}
          {isLoading && products.length === 0 ? null : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-primary">
                    {getTranslation('prods.noProducts', language, props)}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group"
                    >
                      <Link 
                        to={`${product.slug?.[language] || product._id  }`}
                        onClick={(e) => handlePageLink(e, `/${product.slug?.[language] || product._id  }`, navigate)}
                        className="block cursor-pointer"
                      >
                        <div className="relative h-[400px] mb-4 overflow-hidden bg-secondary">
                          {product.itemImage && (
                            <picture>
                            <source 
                              srcSet={product.itemImage[language].srcSet} type="image/webp" 
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                            <img 
                              src={product.itemImage[language].src}
                              alt={product.itemName[language]} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            </picture>
                          )}
                        </div>
                      </Link>
                      
                      <div className="space-y-2">
                        <Link 
                          to={`${product.slug?.[language] || product._id  }`}
                          onClick={(e) => handlePageLink(e, `/${product.slug?.[language] || product._id  }`, navigate)}
                        >
                          <h3 className="font-heading text-xl text-primary hover:text-linkcolor transition-colors">
                            {product.itemName[language]}
                          </h3>
                        </Link>
                        
                        {product.category && (
                          <p className="font-paragraph text-sm text-primary/60">
                            {product.category[language]}
                          </p>
                        )}
                        
                        <p className="font-paragraph text-base text-primary line-clamp-2">
                          {product.itemDescription[language]}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-heading text-2xl text-linkcolor">
                            {formatCurrency(product.itemPrice[language] || 0, product.itemCurrency[language])}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={addingItemId === product._id}
                          className="w-full py-3 border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-3"
                        >
                          {addingItemId === product._id 
                            ? getTranslation('prods.adding', language, props) 
                            : getTranslation('prods.addToCart', language, props)}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Load More */}
              {hasNext && selectedCategory === 'all' && !searchQuery && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="px-10 py-4 border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
                  >
                    {isLoading 
                      ? getTranslation('prods.loading', language, props) 
                      : getTranslation('prods.loadMore', language, props)}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer {...props}/>
    </div>
  );
}
