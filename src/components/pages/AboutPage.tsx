import { motion } from 'framer-motion';
import { Award, Users, Heart, Target } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppRouterProps } from '@/entities';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

export default function AboutPage(props: AppRouterProps) {
  const { language } = useLanguage();
  const values = [
    {
      icon: Award,
      title: getTranslation('abt.values.q.title', language, props),
      description: getTranslation('abt.values.q.desc', language, props)
    },
    {
      icon: Users,
      title: getTranslation('abt.values.c.title', language, props),
      description: getTranslation('abt.values.c.desc', language, props)
    },
    {
      icon: Heart,
      title: getTranslation('abt.values.p.title', language, props),
      description: getTranslation('abt.values.p.desc', language, props)
    },
    {
      icon: Target,
      title: getTranslation('abt.values.v.title', language, props),
      description: getTranslation('abt.values.v.desc', language, props)
    }
  ];

  const team = [
    {
      name: getTranslation('abt.team.m1.name', language, props),
      role: getTranslation('abt.team.m1.role', language, props),
      description: getTranslation('abt.team.m1.desc', language, props)
    },
    {
      name: getTranslation('abt.team.m2.name', language, props),
      role: getTranslation('abt.team.m2.role', language, props),
      description: getTranslation('abt.team.m2.desc', language, props)
    },
    {
      name: getTranslation('abt.team.m3.name', language, props),
      role: getTranslation('abt.team.m3.role', language, props),
      description: getTranslation('abt.team.m3.desc', language, props)
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header {...props} />

      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto min-h-[80vh] flex items-center px-8 md:px-16 lg:px-24 py-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary">
              {getTranslation('abt.title', language, props)}
            </h1>
            <p className="font-paragraph text-xl text-primary leading-relaxed">
              {getTranslation('abt.hero.desc1', language, props)}
            </p>
            <p className="font-paragraph text-lg text-primary leading-relaxed">
              {getTranslation('abt.hero.desc2', language, props)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px]"
          >
            <Image
              src="https://static.wixstatic.com/media/73be94_798d6bb149f6400c8a94998845f67cc4~mv2.png?originWidth=768&originHeight=448"
              alt="Our brand story"
              className="w-full h-full object-cover"
              width={800}
            />
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-secondary-foreground">
              {getTranslation('abt.mission.title', language, props)}
            </h2>
            <p className="font-paragraph text-xl text-secondary-foreground leading-relaxed">
              {getTranslation('abt.mission.desc', language, props)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            {getTranslation('abt.values.title', language, props)}
          </h2>
          <p className="font-paragraph text-lg text-primary max-w-2xl mx-auto">
            {getTranslation('abt.values.subtitle', language, props)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center space-y-4 p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 border border-buttonborder text-primary">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl text-primary">
                {value.title}
              </h3>
              <p className="font-paragraph text-base text-primary leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-secondary py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-secondary-foreground mb-4">
            {getTranslation('abt.team.title', language, props)}
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl mx-auto">
            {getTranslation('abt.team.subtitle', language, props)}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="relative h-[400px] mb-6 overflow-hidden bg-background">
                  <Image
                    src="https://static.wixstatic.com/media/73be94_85ce9eb978094034ac51e9afdfac9111~mv2.png?originWidth=384&originHeight=384"
                    alt={member.name}
                    className="w-full h-full object-cover"
                    width={400}
                  />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground">
                  {member.name}
                </h3>
                <p className="font-paragraph text-base text-secondary-foreground/80">
                  {member.role}
                </p>
                <p className="font-paragraph text-base text-secondary-foreground leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { number: '10+', label: getTranslation('abt.stats.exp.label', language, props) },
            { number: '5000+', label: getTranslation('abt.stats.cust.label', language, props) },
            { number: '50+', label: getTranslation('abt.stats.coll.label', language, props) }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="font-heading text-5xl md:text-6xl text-primary">
                {stat.number}
              </div>
              <p className="font-paragraph text-xl text-primary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer {...props} />
    </div>
  );
}
