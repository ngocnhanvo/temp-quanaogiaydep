import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation, getContent } from '@/lib/i18n';
import { AppRouterProps } from '@/entities';
import {handlePageLink}  from '@/components/PageTransition';

export default function Footer(props: AppRouterProps) {
  const { language } = useLanguage();
  let link_home = getContent(props.pages, 'home', language);
  let link_about = getContent(props.pages, 'about', language);
  let link_contact = getContent(props.pages, 'contact', language);
  let link_blogs = getContent(props.pages, 'blogs', language);
  let link_products = getContent(props.pages, 'products', language);
  let link_privacy = getContent(props.pages, 'privacy', language);
  let link_terms = getContent(props.pages, 'terms', language);
  let link_portfolio = getContent(props.pages, 'portfolio', language);
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-footerbackground">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-primary-foreground">
              {getTranslation('footer.company', language, props)}
            </h3>
            <p className="font-paragraph text-base text-primary-foreground/80 leading-relaxed">
              {getTranslation('footer.description', language, props)}
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-primary-foreground">
              {getTranslation('footer.quickLinks', language, props)}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to={link_home}
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.home', language, props)}
              </Link>
              <Link
                to={link_products}
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.products', language, props)}
              </Link>
              <Link
                to={link_blogs}
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.blogs', language, props)}
              </Link>
              <Link
                to={link_about}
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.about', language, props)}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-primary-foreground">
              {getTranslation('footer.services', language, props)}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to={link_portfolio}
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.portfolio', language, props)}
              </Link>
              <Link
                to={link_contact}
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.contact', language, props)}
              </Link>
              <a
                href="#shipping"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.shipping', language, props)}
              </a>
              <a
                href="#returns"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.returns', language, props)}
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-primary-foreground">
              Liên hệ
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-foreground/80 flex-shrink-0 mt-1" />
                <p className="font-paragraph text-base text-primary-foreground/80">
                  {getTranslation('footer.location', language, props)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <a
                  href={`tel:${getTranslation('footer.phone', language, props)}`}
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {getTranslation('footer.phone', language, props)}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <a
                  href={`mailto:${getTranslation('footer.email', language, props)}`}
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {getTranslation('footer.email', language, props)}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/60">
              {getTranslation('footer.copyright', language, props)}
            </p>
            <div className="flex gap-6">
              <a
                href={link_privacy}
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.privacy', language, props)}
              </a>
              <a
                href={link_terms}
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {getTranslation('footer.terms', language, props)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
