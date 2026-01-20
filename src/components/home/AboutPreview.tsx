import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";

const AboutPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt={`${COMPANY_INFO.founder}, Lead Designer at ${COMPANY_INFO.name}`}
                className="w-full aspect-[3/4] object-cover rounded-lg"
              />
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-bronze/30 rounded-lg -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-bronze/10 rounded-lg -z-10" />
            </div>
            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 right-0 left-8 md:left-16 bg-charcoal text-primary-foreground p-6 rounded-lg shadow-xl"
            >
              <Quote className="text-bronze mb-3" size={24} />
              <p className="font-serif text-lg italic leading-relaxed mb-3">
                "Design with purpose. Every space has a soul waiting to be discovered."
              </p>
              <p className="font-sans text-sm text-bronze">
                — {COMPANY_INFO.founder}, {COMPANY_INFO.founderTitle}
              </p>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8 pt-16 lg:pt-0"
          >
            <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
              About Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Creating Spaces That Inspire
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed mb-6">
              Since {COMPANY_INFO.established}, {COMPANY_INFO.name} has been at the forefront of interior design excellence in Lagos. Our studio brings together a passionate team of designers, architects, and craftspeople dedicated to transforming ordinary spaces into extraordinary environments.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed mb-8">
              We believe that great design goes beyond aesthetics – it enhances the way you live, work, and connect with your surroundings. Every project we undertake is a unique journey, guided by your vision and brought to life through our expertise.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { value: "9+", label: "Years Experience" },
                { value: "200+", label: "Projects Completed" },
                { value: "50+", label: "Happy Clients" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="font-serif text-3xl md:text-4xl text-bronze mb-1">
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <Button variant="luxury-outline" size="lg" asChild>
              <Link to="/about">
                Learn Our Story
                <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
