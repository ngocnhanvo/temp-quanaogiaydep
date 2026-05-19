import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-footerbackground">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl text-primary-foreground">
              THỜI TRANG
            </h3>
            <p className="font-paragraph text-base text-primary-foreground/80 leading-relaxed">
              Tinh tế trong từng đường nét, sang trọng trong từng chi tiết
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
              Liên kết nhanh
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/products"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Sản phẩm
              </Link>
              <Link
                to="/blog"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Giới thiệu
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl text-primary-foreground">
              Dịch vụ
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/portfolio"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Portfolio
              </Link>
              <Link
                to="/contact"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Liên hệ
              </Link>
              <a
                href="#shipping"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Chính sách vận chuyển
              </a>
              <a
                href="#returns"
                className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Chính sách đổi trả
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
                  123 Đường Thời Trang, Quận 1, TP.HCM
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <a
                  href="tel:+84123456789"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +84 123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <a
                  href="mailto:info@thoitrang.com"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  info@thoitrang.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/60">
              © 2026 Thời Trang. Bản quyền thuộc về chúng tôi.
            </p>
            <div className="flex gap-6">
              <a
                href="#privacy"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#terms"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
