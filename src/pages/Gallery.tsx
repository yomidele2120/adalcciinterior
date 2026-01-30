import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { PORTFOLIO_ITEMS, CATEGORIES } from "@/lib/constants";
import nigerianLivingRoom from "@/assets/portfolio/nigerian-living-room.jpg";
import nigerianBedroom from "@/assets/portfolio/nigerian-bedroom.jpg";
import nigerianKitchen from "@/assets/portfolio/nigerian-kitchen.jpg";
import nigerianConferenceOffice from "@/assets/portfolio/nigerian-conference-office.jpg";

const portfolioImages: Record<string, string> = {
  "modern-minimalist-living": nigerianLivingRoom,
  "luxury-master-suite": nigerianBedroom,
  "contemporary-kitchen": nigerianKitchen,
  "conference-office": nigerianConferenceOffice,
  "boutique-hotel-lobby": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
  "spa-retreat": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

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
              Our Portfolio
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Gallery
            </h1>
            <p className="font-sans text-muted-foreground text-lg">
              Explore our collection of thoughtfully designed spaces. Each project tells a unique story of transformation and refined living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border sticky top-[72px] z-30">
        <div className="container-luxury">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-sans text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-charcoal text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-charcoal/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <div
                    className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => setLightboxImage(portfolioImages[item.id] || "")}
                  >
                    <img
                      src={portfolioImages[item.id] || ""}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-block font-sans text-xs tracking-wider uppercase text-bronze mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl text-primary-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <Link
                    to={`/gallery/${item.id}`}
                    className="block mt-4"
                  >
                    <h3 className="font-serif text-lg text-foreground hover:text-bronze transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mt-1">
                      {item.location} • {item.year}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Gallery image"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
