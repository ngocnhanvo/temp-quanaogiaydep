import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Portfolios, AppRouterProps } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

export default function PortfolioPage(props: AppRouterProps) {
  const { language } = useLanguage();

  // Dữ liệu mẫu làm ví dụ, re-evaluate khi ngôn ngữ thay đổi
  const samplePortfolios: Portfolios[] = useMemo(() => [
    {
      _id: 'sample-1',
      projectTitle: getTranslation('port.sample.1.title', language, props),
      season: getTranslation('port.sample.season', language, props),
      completionDate: '2024-03-15T00:00:00Z',
      description: getTranslation('port.sample.1.desc', language, props),
      galleryImages: 'https://static.wixstatic.com/media/73be94_ff7f063e49904dab82bb04275c6c740e~mv2.png'
    },
    {
      _id: 'sample-2',
      projectTitle: getTranslation('port.sample.2.title', language, props),
      season: getTranslation('port.sample.season', language, props),
      completionDate: '2024-04-20T00:00:00Z',
      description: getTranslation('port.sample.2.desc', language, props),
      galleryImages: 'https://static.wixstatic.com/media/73be94_cbbd7763fd6947789e61f62770ea0141~mv2.png'
    },
    {
      _id: 'sample-3',
      projectTitle: getTranslation('port.sample.3.title', language, props),
      season: getTranslation('port.sample.season', language, props),
      completionDate: '2024-05-10T00:00:00Z',
      description: getTranslation('port.sample.3.desc', language, props),
      galleryImages: 'https://static.wixstatic.com/media/73be94_781551abdedc4672bfbe2410972a7dc8~mv2.png'
    }
  ], [language, props]); // Dependencies for useMemo

  // Khởi tạo bằng dữ liệu mẫu
  const [portfolios, setPortfolios] = useState<Portfolios[]>(samplePortfolios);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [seasons, setSeasons] = useState<string[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 9;

  // Đồng bộ bản dịch mới cho dữ liệu mẫu khi đổi ngôn ngữ
  useEffect(() => {
    if (portfolios.length === 0 || portfolios.some(p => p._id.startsWith('sample-'))) {
      setPortfolios(samplePortfolios);
      extractSeasons(samplePortfolios);
    }
  }, [language, samplePortfolios]);

  useEffect(() => {
    loadPortfolios();
  }, [skip, language]);

  // Reset bộ lọc khi đổi ngôn ngữ
  useEffect(() => {
    setSelectedSeason('all');
    if (skip !== 0) {
      setSkip(0);
    }
  }, [language]);

  const loadPortfolios = async () => {
    try {
      const result = await BaseCrudService.getAll<Portfolios>('portfolios', {}, { limit, skip });
      
      if (skip === 0) {
        if (result.items && result.items.length > 0) { // Nếu có dữ liệu từ DB
          setPortfolios(result.items);
          extractSeasons(result.items);
        } else {
          // Nếu không có dữ liệu DB, sử dụng dữ liệu mẫu đã được dịch
          setPortfolios(samplePortfolios);
          extractSeasons(samplePortfolios);
        }
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
      const locale = language === 'vi' ? vi : enUS;
      return format(new Date(date), 'MMMM yyyy', { locale });
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
              {getTranslation('port.hero.title', language, props)}
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground max-w-2xl mx-auto">
              {getTranslation('port.hero.subtitle', language, props)}
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
                {getTranslation('port.filter.all', language, props)}
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
          {isLoading && portfolios.length === 0 ? null : (
            <>
              {filteredPortfolios.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-primary">
                    {getTranslation('port.noPortfolios', language, props)}
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
                    {isLoading 
                      ? getTranslation('port.loading', language, props) 
                      : getTranslation('port.loadMore', language, props)}
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
