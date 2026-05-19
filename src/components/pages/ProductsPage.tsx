import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Products } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, [skip]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Products>('products', {}, { limit, skip });
      
      if (skip === 0) {
        setProducts(result.items);
        extractCategories(result.items);
      } else {
        setProducts(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractCategories = (items: Products[]) => {
    const cats = new Set<string>();
    items.forEach(item => {
      if (item.category) cats.add(item.category);
    });
    setCategories(Array.from(cats));
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.itemName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.itemDescription?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product: Products) => {
    await actions.addToCart({
      collectionId: 'products',
      itemId: product._id,
      quantity: 1
    });
  };

  const loadMore = () => {
    setSkip(prev => prev + limit);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
              Bộ sưu tập
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground max-w-2xl mx-auto">
              Khám phá những thiết kế độc đáo và chất lượng cao
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full border-b border-primary/10 bg-background sticky top-[73px] z-30">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category Filter */}
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
                Tất cả
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
          {isLoading && skip === 0 ? null : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-primary">
                    Không tìm thấy sản phẩm nào
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
                      <div className="relative h-[400px] mb-4 overflow-hidden bg-secondary">
                        {product.itemImage && (
                          <Image
                            src={product.itemImage}
                            alt={product.itemName || 'Product'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            width={400}
                          />
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-heading text-xl text-primary">
                          {product.itemName}
                        </h3>
                        
                        {product.category && (
                          <p className="font-paragraph text-sm text-primary/60">
                            {product.category}
                          </p>
                        )}
                        
                        <p className="font-paragraph text-base text-primary line-clamp-2">
                          {product.itemDescription}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-heading text-2xl text-linkcolor">
                            {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={addingItemId === product._id}
                          className="w-full py-3 border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-3"
                        >
                          {addingItemId === product._id ? 'Đang thêm...' : 'Thêm vào giỏ'}
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
                    {isLoading ? 'Đang tải...' : 'Xem thêm'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
