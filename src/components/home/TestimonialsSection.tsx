import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

const testimonialImages = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="section-padding bg-charcoal text-primary-foreground overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
              Testimonials
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
              What Our Clients Say
            </h2>

            <div className="relative min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Quote className="text-bronze/50 mb-4" size={48} />
                  <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-8 text-primary-foreground/90">
                    "{TESTIMONIALS[currentIndex].content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonialImages[currentIndex]}
                      alt={TESTIMONIALS[currentIndex].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-bronze"
                    />
                    <div>
                      <p className="font-sans font-medium text-primary-foreground">
                        {TESTIMONIALS[currentIndex].name}
                      </p>
                      <p className="font-sans text-sm text-primary-foreground/60">
                        {TESTIMONIALS[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-bronze hover:border-bronze transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-bronze hover:border-bronze transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
              <span className="font-sans text-sm text-primary-foreground/60 ml-4">
                {currentIndex + 1} / {TESTIMONIALS.length}
              </span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
                alt="Luxury interior design project"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent rounded-lg" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-bronze/30 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 border border-bronze/20 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
