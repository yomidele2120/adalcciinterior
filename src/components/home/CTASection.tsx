import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

const CTASection = () => {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full border border-charcoal" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full border border-charcoal" />
      </div>

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
            Let's Work Together
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            Ready to Transform Your Space?
          </h2>
          <p className="font-sans text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            We'd love to hear about your project. Reach out for a complimentary consultation and let's bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button variant="bronze" size="xl" asChild>
              <Link to="/contact">
                Book Consultation
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="luxury-outline" size="xl" asChild>
              <a href={`tel:${CONTACT_INFO.phone[0].replace(/\s/g, "")}`}>
                <Phone size={18} />
                Call Us Now
              </a>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-sans text-muted-foreground"
          >
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-bronze transition-colors"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Chat on WhatsApp
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-bronze transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
