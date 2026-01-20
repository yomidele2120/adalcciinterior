import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { SERVICES } from "@/lib/constants";

const serviceImages = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
              What We Offer
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Our Services
            </h1>
            <p className="font-sans text-muted-foreground text-lg">
              From initial concept to final installation, we provide comprehensive interior design solutions that transform your vision into reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="space-y-24">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={serviceImages[index]}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Decorative Element */}
                    <div className={`absolute -bottom-4 ${index % 2 === 1 ? "-left-4" : "-right-4"} w-32 h-32 bg-bronze/10 rounded-lg -z-10`} />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="inline-block font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
                    0{index + 1}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                    {service.title}
                  </h2>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 font-sans text-foreground"
                      >
                        <span className="w-5 h-5 rounded-full bg-bronze/10 flex items-center justify-center">
                          <Check size={12} className="text-bronze" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="luxury-outline" asChild>
                    <Link to="/contact">
                      Get Started
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
              How We Work
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              Our Design Process
            </h2>
            <p className="font-sans text-primary-foreground/70">
              A structured approach ensures every project delivers exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "We begin by understanding your vision, needs, and lifestyle" },
              { step: "02", title: "Concept Design", desc: "Our team develops creative concepts and mood boards" },
              { step: "03", title: "Development", desc: "Detailed plans, 3D renderings, and material selections" },
              { step: "04", title: "Implementation", desc: "Expert project management through to final installation" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="inline-block font-serif text-5xl text-bronze mb-4">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-primary-foreground/70">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="font-sans text-muted-foreground mb-8">
              Schedule a complimentary consultation and let's discuss how we can transform your space.
            </p>
            <Button variant="bronze" size="xl" asChild>
              <Link to="/contact">
                Book Consultation
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
