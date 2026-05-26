import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions, AppRouterProps } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

export default function ContactPage(props: AppRouterProps) {
  const { language } = useLanguage();
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
              {getTranslation('contact.hero.title', language, props)}
            </h1>
            <p className="font-paragraph text-xl text-secondary-foreground max-w-2xl mx-auto">
              {getTranslation('contact.hero.subtitle', language, props)}
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
                {getTranslation('contact.infoTitle', language, props)}
              </h2>
              <p className="font-paragraph text-lg text-primary leading-relaxed">
                {getTranslation('contact.subtitle', language, props)}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">
                    {getTranslation('contact.addressLabel', language, props)}
                  </h3>
                  <p className="font-paragraph text-base text-primary">
                    {getTranslation('footer.address', language, props)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">
                    {getTranslation('contact.phoneLabel', language, props)}
                  </h3>
                  <a
                    href={`tel:${getTranslation('footer.phone', language, props)}`}
                    className="font-paragraph text-base text-linkcolor hover:text-primary transition-colors"
                  >
                  </a>
                    {getTranslation('footer.phoneTxt', language, props)}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">
                    {getTranslation('contact.emailLabel', language, props)}
                  </h3>
                  <a
                    href={`mailto:${getTranslation('footer.email', language, props)}`}
                    className="font-paragraph text-base text-linkcolor hover:text-primary transition-colors"
                  >
                  </a>
                    {getTranslation('footer.emailTxt', language, props)}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-heading text-xl text-primary mb-4">
                {getTranslation('contact.workingHours', language, props)}
              </h3>
              <div className="space-y-2 font-paragraph text-base text-primary">
                <p>{getTranslation('contact.weekdays', language, props)}</p>
                <p>{getTranslation('contact.saturday', language, props)}</p>
                <p>{getTranslation('contact.sunday', language, props)}</p>
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
                  {getTranslation('contact.formName', language, props)}
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder={getTranslation('contact.placeholderName', language, props)}
                />
              </div>

              <div>
                <label htmlFor="emailAddress" className="block font-paragraph text-base text-primary mb-2">
                  {getTranslation('contact.formEmail', language, props)}
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder={getTranslation('contact.placeholderEmail', language, props)}
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block font-paragraph text-base text-primary mb-2">
                  {getTranslation('contact.formPhone', language, props)}
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder={getTranslation('contact.placeholderPhone', language, props)}
                />
              </div>

              <div>
                <label htmlFor="messageContent" className="block font-paragraph text-base text-primary mb-2">
                  {getTranslation('contact.formMessage', language, props)}
                </label>
                <textarea
                  id="messageContent"
                  name="messageContent"
                  value={formData.messageContent}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder={getTranslation('contact.placeholderMessage', language, props)}
                />
              </div>

              {submitSuccess && (
                <div className="p-4 bg-secondary text-secondary-foreground font-paragraph text-base">
                  {getTranslation('contact.success', language, props)}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-paragraph text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  getTranslation('contact.sending', language, props)
                ) : (
                  <>
                    {getTranslation('contact.sendButton', language, props)}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer {...props}/>
    </div>
  );
}
