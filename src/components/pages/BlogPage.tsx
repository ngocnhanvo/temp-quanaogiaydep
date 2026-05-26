import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Bivit, AppRouterProps } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

export default function BlogPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Bivit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 9;

  useEffect(() => {
    loadArticles();
  }, [skip]);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Bivit>('articles', {}, { limit, skip });
      
      if (skip === 0) {
        setArticles(result.items);
      } else {
        setArticles(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      const locale = language === 'vi' ? vi : enUS;
      return format(new Date(date), 'dd MMMM yyyy', { locale });
    } catch {
      return '';
    }
  };

  const loadMore = () => {
    setSkip(prev => prev + limit);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header {...props} />

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
              {getTranslation('blog.hero.title', language, props)}
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground max-w-2xl mx-auto">
              {getTranslation('blog.hero.subtitle', language, props)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : (
            <>
              {articles.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-primary">
                    {getTranslation('blog.noArticles', language, props)}
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                >
                  {articles.map((article, index) => (
                    <motion.article
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group"
                    >
                      <Link to={`/blog/${article._id}`}>
                        <div className="relative h-[350px] mb-6 overflow-hidden bg-secondary">
                          {article.coverImage && (
                            <Image
                              src={article.coverImage}
                              alt={article.title || 'Article'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              width={600}
                            />
                          )}
                        </div>
                      </Link>

                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-primary/60">
                          {article.publicationDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-paragraph text-sm">
                                {formatDate(article.publicationDate)}
                              </span>
                            </div>
                          )}
                          {article.author && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span className="font-paragraph text-sm">
                                {article.author}
                              </span>
                            </div>
                          )}
                        </div>

                        <Link to={`/blog/${article._id}`}>
                          <h2 className="font-heading text-2xl text-primary group-hover:text-linkcolor transition-colors">
                            {article.title}
                          </h2>
                        </Link>

                        <p className="font-paragraph text-base text-primary line-clamp-3">
                          {article.content}
                        </p>

                        <Link
                          to={`/blog/${article._id}`}
                          className="font-paragraph text-base text-linkcolor hover:text-primary transition-colors inline-flex items-center gap-2 pt-2"
                        >
                          {getTranslation('blog.readMore', language, props)}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {/* Load More */}
              {hasNext && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="px-10 py-4 border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
                  >
                    {isLoading ? getTranslation('blog.loading', language, props) : getTranslation('blog.loadMore', language, props)}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer {...props} />
    </div>
  );
}
