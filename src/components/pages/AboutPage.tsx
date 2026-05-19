import { motion } from 'framer-motion';
import { Award, Users, Heart, Target } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Chất lượng',
      description: 'Cam kết mang đến những sản phẩm chất lượng cao nhất với thiết kế tinh tế và chất liệu tốt nhất.'
    },
    {
      icon: Users,
      title: 'Khách hàng',
      description: 'Đặt khách hàng làm trung tâm, luôn lắng nghe và đáp ứng nhu cầu của từng cá nhân.'
    },
    {
      icon: Heart,
      title: 'Đam mê',
      description: 'Tình yêu với thời trang và nghệ thuật thúc đẩy chúng tôi không ngừng sáng tạo và đổi mới.'
    },
    {
      icon: Target,
      title: 'Tầm nhìn',
      description: 'Trở thành thương hiệu thời trang hàng đầu, mang phong cách hiện đại đến với mọi người.'
    }
  ];

  const team = [
    {
      name: 'Nguyễn Văn A',
      role: 'Giám đốc sáng tạo',
      description: 'Với hơn 15 năm kinh nghiệm trong ngành thời trang'
    },
    {
      name: 'Trần Thị B',
      role: 'Giám đốc thiết kế',
      description: 'Chuyên gia thiết kế với tầm nhìn quốc tế'
    },
    {
      name: 'Lê Văn C',
      role: 'Giám đốc vận hành',
      description: 'Đảm bảo chất lượng và quy trình sản xuất hoàn hảo'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
              Về chúng tôi
            </h1>
            <p className="font-paragraph text-xl text-primary leading-relaxed">
              Chúng tôi là một thương hiệu thời trang cao cấp, chuyên cung cấp những sản phẩm quần áo và giày dép chất lượng với thiết kế tinh tế, hiện đại.
            </p>
            <p className="font-paragraph text-lg text-primary leading-relaxed">
              Được thành lập với niềm đam mê và tâm huyết, chúng tôi tin rằng thời trang không chỉ là trang phục mà còn là cách thể hiện cá tính và phong cách sống của mỗi người.
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
              Sứ mệnh của chúng tôi
            </h2>
            <p className="font-paragraph text-xl text-secondary-foreground leading-relaxed">
              Mang đến cho khách hàng những trải nghiệm mua sắm đẳng cấp với sản phẩm chất lượng cao, thiết kế độc đáo và dịch vụ tận tâm. Chúng tôi không ngừng sáng tạo để đáp ứng nhu cầu và phong cách của từng cá nhân.
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
            Giá trị cốt lõi
          </h2>
          <p className="font-paragraph text-lg text-primary max-w-2xl mx-auto">
            Những giá trị định hướng mọi hoạt động của chúng tôi
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
              Đội ngũ của chúng tôi
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground max-w-2xl mx-auto">
              Những con người tài năng và tâm huyết đằng sau thương hiệu
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
            { number: '10+', label: 'Năm kinh nghiệm' },
            { number: '5000+', label: 'Khách hàng hài lòng' },
            { number: '50+', label: 'Bộ sưu tập' }
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

      <Footer />
    </div>
  );
}
