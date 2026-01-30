import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import nigerianLivingRoom from "@/assets/portfolio/nigerian-living-room.jpg";
import nigerianBedroom from "@/assets/portfolio/nigerian-bedroom.jpg";
import nigerianKitchen from "@/assets/portfolio/nigerian-kitchen.jpg";
import nigerianKitchen2 from "@/assets/portfolio/nigerian-kitchen-2.jpg";
import nigerianConferenceOffice from "@/assets/portfolio/nigerian-conference-office.jpg";

const projectImages: Record<string, string[]> = {
  "modern-minimalist-living": [
    nigerianLivingRoom,
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
  ],
  "luxury-master-suite": [
    nigerianBedroom,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
  ],
  "contemporary-kitchen": [
    nigerianKitchen,
    nigerianKitchen2,
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
  ],
  "conference-office": [
    nigerianConferenceOffice,
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
  ],
  "boutique-hotel-lobby": [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
  ],
  "spa-retreat": [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop",
  ],
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = PORTFOLIO_ITEMS.find((item) => item.id === id);

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl mb-4">Project Not Found</h1>
            <Button variant="luxury" asChild>
              <Link to="/gallery">Back to Gallery</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const images = projectImages[project.id] || projectImages["modern-minimalist-living"];
  const currentIndex = PORTFOLIO_ITEMS.findIndex((p) => p.id === id);
  const nextProject = PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length];

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <img
          src={images[0]}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-bronze transition-colors mb-4 font-sans text-sm"
              >
                <ArrowLeft size={16} />
                Back to Gallery
              </Link>
              <span className="block font-sans text-bronze tracking-wider uppercase text-sm mb-2">
                {project.category}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                About This Project
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed text-lg mb-8">
                {project.description}
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed mb-8">
                This project showcases our commitment to creating spaces that blend functionality with aesthetic excellence. Working closely with our clients, we developed a design that not only meets their practical needs but also reflects their personal style and enhances their daily living experience.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Every element was carefully considered, from the material selections to the lighting design, ensuring a cohesive and harmonious environment that stands the test of time.
              </p>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-cream rounded-lg p-6 space-y-6">
                <div>
                  <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                    Location
                  </span>
                  <p className="font-serif text-lg text-foreground flex items-center gap-2 mt-1">
                    <MapPin size={18} className="text-bronze" />
                    {project.location}
                  </p>
                </div>
                <div>
                  <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                    Year Completed
                  </span>
                  <p className="font-serif text-lg text-foreground flex items-center gap-2 mt-1">
                    <Calendar size={18} className="text-bronze" />
                    {project.year}
                  </p>
                </div>
                <div>
                  <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                    Category
                  </span>
                  <p className="font-serif text-lg text-foreground mt-1">
                    {project.category}
                  </p>
                </div>
                <Button variant="bronze" className="w-full" asChild>
                  <Link to="/contact">Start Your Project</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-16 bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.slice(1).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="aspect-[4/3] rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${project.title} - Image ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-16 bg-cream">
        <div className="container-luxury">
          <Link to={`/gallery/${nextProject.id}`} className="group block">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-sans text-sm text-muted-foreground uppercase tracking-wider">
                  Next Project
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-bronze transition-colors">
                  {nextProject.title}
                </h3>
              </div>
              <ArrowRight size={32} className="text-bronze group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
