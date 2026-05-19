import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    emailAddress: '',
    phoneNumber: '',
    messageContent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      await BaseCrudService.create<ContactSubmissions>('contactsubmissions', {
        _id: crypto.randomUUID(),
        customerName: formData.customerName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        messageContent: formData.messageContent,
        submissionDate: new Date().toISOString()
      });
      
      setSubmitSuccess(true);
      setFormData({
        customerName: '',
        emailAddress: '',
        phoneNumber: '',
        messageContent: ''
      });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              Liên hệ
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-6">
                Thông tin liên hệ
              </h2>
              <p className="font-paragraph text-lg text-primary leading-relaxed">
                Hãy để lại thông tin của bạn, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">
                    Địa chỉ
                  </h3>
                  <p className="font-paragraph text-base text-primary">
                    123 Đường Thời Trang, Quận 1<br />
                    Thành phố Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">
                    Điện thoại
                  </h3>
                  <a
                    href="tel:+84123456789"
                    className="font-paragraph text-base text-linkcolor hover:text-primary transition-colors"
                  >
                    +84 123 456 789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:info@thoitrang.com"
                    className="font-paragraph text-base text-linkcolor hover:text-primary transition-colors"
                  >
                    info@thoitrang.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-heading text-xl text-primary mb-4">
                Giờ làm việc
              </h3>
              <div className="space-y-2 font-paragraph text-base text-primary">
                <p>Thứ Hai - Thứ Sáu: 9:00 - 18:00</p>
                <p>Thứ Bảy: 9:00 - 17:00</p>
                <p>Chủ Nhật: Nghỉ</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="customerName" className="block font-paragraph text-base text-primary mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>

              <div>
                <label htmlFor="emailAddress" className="block font-paragraph text-base text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block font-paragraph text-base text-primary mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="+84 123 456 789"
                />
              </div>

              <div>
                <label htmlFor="messageContent" className="block font-paragraph text-base text-primary mb-2">
                  Nội dung *
                </label>
                <textarea
                  id="messageContent"
                  name="messageContent"
                  value={formData.messageContent}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                />
              </div>

              {submitSuccess && (
                <div className="p-4 bg-secondary text-secondary-foreground font-paragraph text-base">
                  Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-paragraph text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Đang gửi...'
                ) : (
                  <>
                    Gửi tin nhắn
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
