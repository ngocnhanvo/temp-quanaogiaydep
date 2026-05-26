// HPI 1.7-V
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MoveRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppRouterProps } from '@/entities';
import { getTranslation, getContent } from '@/lib/i18n';
import { useLanguage } from '@/lib/LanguageContext';
import { handlePageLink } from '../PageTransition';

export default function HomePage(props: AppRouterProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  // Canonical Data Sources preserved from original code
  const featuredProducts = [1, 2, 3];
  const latestArticles = [1, 2];

  // Refs for scroll animations (Crash Prevention: These elements are always rendered)
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  // Parallax setups
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutImageY = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);
  const link_products = getContent(props.pages, 'products', language);
  const link_about = getContent(props.pages, 'about', language);
  const link_blogs = getContent(props.pages, 'blogs', language);
  const link_contact = getContent(props.pages, 'contact', language);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground font-paragraph text-primary overflow-clip">
      <Header {...props} />

      {/* 
        HERO SECTION 
        Inspired by the provided image: Massive typography dominating the top, 
        followed by a full-bleed structural image anchoring the layout.
      */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col pt-24 lg:pt-32">
        {/* Top Typography Area */}
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10 pb-12 lg:pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            <h1 className="font-heading text-[12vw] leading-[0.85] tracking-tight text-primary uppercase">
              {getTranslation('hp.hero.title', language, props)}
            </h1>
            <div className="flex flex-col items-center gap-8 mt-8">
              <p className="font-paragraph text-lg md:text-2xl text-primary/80 max-w-2xl font-light tracking-wide">
                {getTranslation('hp.hero.subtitle', language, props)}
              </p>
              <Link onClick={(e) => handlePageLink(e, link_products, navigate)} to={link_products} className="group inline-flex items-center gap-3 border-b border-primary pb-1 hover:border-transparent transition-colors duration-300">
                <span className="text-sm uppercase tracking-[0.2em] font-semibold">{getTranslation('hp.hero.discover', language, props)}</span>
                <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Full-Bleed Image Area */}
        <div className="relative w-full h-[60vh] lg:h-[75vh] overflow-hidden">
          <motion.div 
            style={{ y: heroImageY }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <Image
              src="https://static.wixstatic.com/media/73be94_f41daa871a714cd6823a98f4d33ced49~mv2.png?originWidth=1152&originHeight=640"
              alt="Elegant fashion display"
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay to blend with background if needed, though image is full bleed */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent mix-blend-overlay" />
          </motion.div>
        </div>
      </section>

      {/* 
        ABOUT / PHILOSOPHY SECTION
        Using the secondary color for a soft, editorial break.
        Features a sticky text block and a parallax image.
      */}
      <section ref={aboutRef} className="relative w-full bg-secondary py-32 lg:py-48 px-6 lg:px-12">
        <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-48 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-5xl lg:text-7xl text-secondary-foreground leading-tight whitespace-pre-line">
                  {getTranslation('hp.about.title', language, props)}
                </h2>
                <div className="w-12 h-[1px] bg-secondary-foreground mt-8 mb-8" />
                <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/80 leading-relaxed mb-6">
                  {getTranslation('hp.about.desc1', language, props)}
                </p>
                <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/80 leading-relaxed">
                  {getTranslation('hp.about.desc2', language, props)}
                </p>
                
                <div className="mt-12">
                  <Link onClick={(e) => handlePageLink(e, link_about, navigate)} to={link_about}>
                    <button className="px-8 py-4 border border-secondary-foreground text-secondary-foreground font-paragraph text-sm uppercase tracking-widest hover:bg-secondary-foreground hover:text-secondary transition-colors duration-500">
                      {getTranslation('hp.about.btn', language, props)}
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Right Column with Parallax Image */}
          <div className="lg:col-span-7 relative h-[60vh] lg:h-[90vh] overflow-hidden">
            <motion.div 
              style={{ y: aboutImageY }}
              className="absolute inset-0 w-full h-[130%]"
            >
              <Image
                src="https://static.wixstatic.com/media/73be94_781551abdedc4672bfbe2410972a7dc8~mv2.png?originWidth=1152&originHeight=896"
                alt="Our craftsmanship"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        FEATURED PRODUCTS SECTION
        A staggered, architectural grid layout to showcase items dynamically.
      */}
      <section ref={productsRef} className="relative w-full py-32 lg:py-48 px-6 lg:px-12 bg-background">
        <div className="max-w-[100rem] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h2 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
                {getTranslation('hp.products.title', language, props)}
              </h2>
              <p className="font-paragraph text-lg text-primary/70">
                {getTranslation('hp.products.subtitle', language, props)}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link onClick={(e) => handlePageLink(e, link_products, navigate)} to={link_products} className="group inline-flex items-center gap-3 text-primary">
                <span className="text-sm uppercase tracking-[0.2em] font-semibold">{getTranslation('hp.products.viewAll', language, props)}</span>
                <div className="w-8 h-[1px] bg-primary group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredProducts.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`group flex flex-col ${index === 1 ? 'lg:mt-32' : index === 2 ? 'lg:mt-16' : ''}`}
              >
                <Link onClick={(e) => handlePageLink(e, link_products, navigate)} to={link_products} className="block relative overflow-hidden aspect-[3/4] mb-6 bg-secondary/20">
                  <Image
                    src="https://static.wixstatic.com/media/73be94_ff7f063e49904dab82bb04275c6c740e~mv2.png?originWidth=1152&originHeight=1600"
                    alt={`Featured product ${item}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-linkcolor transition-colors">
                      {getTranslation('hp.products.collection', language, props)} {item}
                    </h3>
                    <p className="font-paragraph text-sm text-primary/60">
                      {getTranslation('hp.products.itemDesc', language, props)}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        EDITORIAL / BLOG SECTION
        Magazine-style layout with a sticky header and scrolling articles.
      */}
      <section className="relative w-full border-t border-primary/10 bg-background">
        <div className="max-w-[100rem] mx-auto flex flex-col lg:flex-row">
          
          {/* Sticky Title Area */}
          <div className="lg:w-1/3 lg:border-r border-primary/10 p-6 lg:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary/50 mb-4 block">{getTranslation('hp.blog.label', language, props)}</span>
              <h2 className="font-heading text-5xl lg:text-6xl text-primary mb-6 leading-tight whitespace-pre-line">
                {getTranslation('hp.blog.title', language, props)}
              </h2>
              <p className="font-paragraph text-lg text-primary/70 mb-12 max-w-sm">
                {getTranslation('hp.blog.subtitle', language, props)}
              </p>
              <Link onClick={(e) => handlePageLink(e, link_blogs, navigate)} to={link_blogs}>
                <button className="px-8 py-4 border border-buttonborder text-primary font-paragraph text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors duration-500">
                  {getTranslation('hp.blog.btn', language, props)}
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Scrolling Articles Area */}
          <div className="lg:w-2/3 p-6 lg:p-12 flex flex-col gap-24 lg:py-32">
            {latestArticles.map((item, index) => (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group cursor-pointer"
              >
                <Link onClick={(e) => handlePageLink(e, link_blogs, navigate)} to={link_blogs} className="block">
                  <div className="relative overflow-hidden aspect-[16/9] lg:aspect-[21/9] mb-8">
                    <Image
                      src="https://static.wixstatic.com/media/73be94_cbbd7763fd6947789e61f62770ea0141~mv2.png?originWidth=1152&originHeight=512"
                      alt={`Article ${item}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4 mb-4 text-xs uppercase tracking-widest text-primary/50">
                      <span>{getTranslation('hp.blog.category', language, props)}</span>
                      <span className="w-1 h-1 rounded-full bg-primary/30" />
                      <span>{getTranslation('hp.blog.readTime', language, props)}</span>
                    </div>
                    <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-4 group-hover:text-linkcolor transition-colors">
                      {getTranslation('hp.blog.articleTitle', language, props)} {item}
                    </h3>
                    <p className="font-paragraph text-base text-primary/70 leading-relaxed mb-6">
                      {getTranslation('hp.blog.articleDesc', language, props)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary group-hover:gap-4 transition-all duration-300">
                      {getTranslation('hp.blog.readMore', language, props)} <MoveRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 
        CTA SECTION
        A bold, immersive block to end the journey.
      */}
      <section className="relative w-full bg-primary py-32 lg:py-48 px-6 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-foreground rounded-full" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-primary-foreground rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="font-heading text-5xl md:text-7xl text-primary-foreground leading-tight whitespace-pre-line">
              {getTranslation('hp.cta.title', language, props)}
            </h2>
            <p className="font-paragraph text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light">
              {getTranslation('hp.cta.subtitle', language, props)}
            </p>
            <div className="pt-8">
              <Link onClick={(e) => handlePageLink(e, link_contact, navigate)} to={link_contact}>
                <button className="px-12 py-5 bg-primary-foreground text-primary font-paragraph text-sm uppercase tracking-[0.2em] font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all duration-500">
                  {getTranslation('hp.cta.btn', language, props)}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer {...props} />
    </div>
  );
}