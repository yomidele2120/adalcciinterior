import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

const portfolioImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
];

const PortfolioPreview = () => {
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

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Large Item */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:row-span-2"
          >
            <Link
              to={`/gallery/${PORTFOLIO_ITEMS[0].id}`}
              className="group block relative h-full min-h-[400px] md:min-h-full rounded-lg overflow-hidden"
            >
              <img
                src={portfolioImages[0]}
                alt={PORTFOLIO_ITEMS[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block font-sans text-xs tracking-wider uppercase text-bronze mb-2">
                  {PORTFOLIO_ITEMS[0].category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mb-2">
                  {PORTFOLIO_ITEMS[0].title}
                </h3>
                <p className="font-sans text-sm text-primary-foreground/70 mb-4 line-clamp-2">
                  {PORTFOLIO_ITEMS[0].description}
                </p>
                <span className="inline-flex items-center gap-2 font-sans text-sm text-bronze group-hover:gap-3 transition-all">
                  View Project
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Items */}
          {PORTFOLIO_ITEMS.slice(1, 4).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Link
                to={`/gallery/${item.id}`}
                className="group block relative h-[250px] rounded-lg overflow-hidden"
              >
                <img
                  src={portfolioImages[index + 1]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block font-sans text-xs tracking-wider uppercase text-bronze mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-primary-foreground group-hover:text-bronze transition-colors">
                    {item.title}
                  </h3>
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
