import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Portfolios } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolios[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [seasons, setSeasons] = useState<string[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 9;

  useEffect(() => {
    loadPortfolios();
  }, [skip]);

  const loadPortfolios = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Portfolios>('portfolios', {}, { limit, skip });
      
      if (skip === 0) {
        setPortfolios(result.items);
        extractSeasons(result.items);
      } else {
        setPortfolios(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading portfolios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractSeasons = (items: Portfolios[]) => {
    const seasonsSet = new Set<string>();
    items.forEach(item => {
      if (item.season) seasonsSet.add(item.season);
    });
    setSeasons(Array.from(seasonsSet));
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMMM yyyy', { locale: vi });
    } catch {
      return '';
    }
  };

  const filteredPortfolios = selectedSeason === 'all'
    ? portfolios
    : portfolios.filter(p => p.season === selectedSeason);

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
              Portfolio
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground max-w-2xl mx-auto">
              Khám phá các dự án và bộ sưu tập thời trang của chúng tôi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Season Filter */}
      {seasons.length > 0 && (
        <section className="w-full border-b border-primary/10 bg-background">
          <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <button
                onClick={() => setSelectedSeason('all')}
                className={`px-6 py-2 font-paragraph text-base transition-colors ${
                  selectedSeason === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-buttonborder text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                Tất cả
              </button>
              {seasons.map(season => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-6 py-2 font-paragraph text-base transition-colors ${
                    selectedSeason === season
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-buttonborder text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : (
            <>
              {filteredPortfolios.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-primary">
                    Chưa có dự án nào
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                >
                  {filteredPortfolios.map((portfolio, index) => (
                    <motion.div
                      key={portfolio._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="relative h-[450px] mb-6 overflow-hidden bg-secondary">
                        {portfolio.galleryImages && (
                          <Image
                            src={portfolio.galleryImages}
                            alt={portfolio.projectTitle || 'Portfolio project'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            width={600}
                          />
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-heading text-2xl text-primary">
                            {portfolio.projectTitle}
                          </h2>
                          {portfolio.season && (
                            <span className="font-paragraph text-sm text-primary/60 px-3 py-1 border border-buttonborder">
                              {portfolio.season}
                            </span>
                          )}
                        </div>

                        {portfolio.completionDate && (
                          <div className="flex items-center gap-2 text-primary/60">
                            <Calendar className="w-4 h-4" />
                            <span className="font-paragraph text-sm">
                              {formatDate(portfolio.completionDate)}
                            </span>
                          </div>
                        )}

                        <p className="font-paragraph text-base text-primary leading-relaxed">
                          {portfolio.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Load More */}
              {hasNext && selectedSeason === 'all' && (
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
