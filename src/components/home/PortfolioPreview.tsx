import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import nigerianBedroom from "@/assets/portfolio/nigerian-bedroom.jpg";
import nigerianKitchen from "@/assets/portfolio/nigerian-kitchen.jpg";
import nigerianConferenceOffice from "@/assets/portfolio/nigerian-conference-office.jpg";

const portfolioImages: Record<string, string> = {
  "conference-office": nigerianConferenceOffice,
  "luxury-master-suite": nigerianBedroom,
  "contemporary-kitchen": nigerianKitchen,
};

const PortfolioPreview = () => {
  // Show conference office, bedroom, and kitchen on home page (exclude living room)
  const homePageItems = PORTFOLIO_ITEMS.filter(item => 
    ["conference-office", "luxury-master-suite", "contemporary-kitchen"].includes(item.id)
  );

  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
              Our Work
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-wide uppercase text-foreground hover:text-bronze transition-colors group self-start md:self-auto"
          >
            View Gallery
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Portfolio Grid - 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homePageItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/gallery/${item.id}`}
                className="group block relative h-[350px] rounded-lg overflow-hidden"
              >
                <img
                  src={portfolioImages[item.id]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block font-sans text-xs tracking-wider uppercase text-bronze mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl text-primary-foreground mb-2 group-hover:text-bronze transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-primary-foreground/70 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-sm text-bronze group-hover:gap-3 transition-all">
                    View Project
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
