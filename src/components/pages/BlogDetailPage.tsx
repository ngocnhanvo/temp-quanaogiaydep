import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Bivit, AppRouterProps } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

export default function BlogDetailPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Bivit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Bivit>('articles', id);
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
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

  return (
    <div className="min-h-screen bg-background">
      <Header {...props} />

      <div className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !article ? (
            <div className="text-center py-20 space-y-6">
              <h2 className="font-heading text-3xl text-primary">
                {getTranslation('blog.detail.notFound', language, props)}
              </h2>
              <Link to="/blog">
                <button className="px-8 py-4 border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  {getTranslation('blog.detail.back', language, props)}
                </button>
              </Link>
            </div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-paragraph text-base text-linkcolor hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                {getTranslation('blog.detail.back', language, props)}
              </Link>

              {/* Article Header */}
              <header className="mb-8 space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-primary/60">
                  {article.publicationDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-paragraph text-base">
                        {formatDate(article.publicationDate)}
                      </span>
                    </div>
                  )}
                  {article.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span className="font-paragraph text-base">
                        {article.author}
                      </span>
                    </div>
                  )}
                </div>
              </header>

              {/* Cover Image */}
              {article.coverImage && (
                <div className="relative h-[500px] mb-12 overflow-hidden bg-secondary">
                  <Image
                    src={article.coverImage}
                    alt={article.title || 'Article cover'}
                    className="w-full h-full object-cover"
                    width={1200}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="font-paragraph text-lg text-primary leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-16 pt-8 border-t border-primary/10">
                <p className="font-paragraph text-base text-primary/60 text-center">
                  {getTranslation('blog.detail.share', language, props)}
                </p>
              </div>
            </motion.article>
          )}
        </div>
      </div>

      <Footer {...props} />
    </div>
  );
}
