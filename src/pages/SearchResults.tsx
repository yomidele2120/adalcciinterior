import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { SERVICES, PORTFOLIO_ITEMS, COMPANY_INFO } from "@/lib/constants";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [relatedServices, setRelatedServices] = useState<typeof SERVICES>([]);
  const [relatedProjects, setRelatedProjects] = useState<typeof PORTFOLIO_ITEMS>([]);

  useEffect(() => {
    if (query) {
      generateResponse(query);
    }
  }, [query]);

  const generateResponse = (userQuery: string) => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const lowerQuery = userQuery.toLowerCase();
      let aiResponse = "";
      let services: typeof SERVICES = [];
      let projects: typeof PORTFOLIO_ITEMS = [];

      // Match query to relevant content
      if (lowerQuery.includes("living room") || lowerQuery.includes("living")) {
        aiResponse = `For living room design, ${COMPANY_INFO.name} specializes in creating harmonious spaces that balance comfort with sophisticated aesthetics. We focus on optimal furniture placement, lighting design, and creating focal points that make your living space truly inviting.\n\nOur approach includes careful consideration of your lifestyle, family needs, and personal style preferences. We work with premium fabrics, custom furniture, and curated accessories to create a living room that reflects your personality.`;
        services = SERVICES.filter(s => s.id === "interior-design" || s.id === "space-planning");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Living Room");
      } else if (lowerQuery.includes("bedroom") || lowerQuery.includes("master")) {
        aiResponse = `Creating the perfect bedroom sanctuary is one of our specialties at ${COMPANY_INFO.name}. We design restful spaces that promote relaxation and quality sleep while maintaining elegance and style.\n\nOur bedroom designs incorporate thoughtful lighting solutions, luxurious textiles, and smart storage solutions. We pay special attention to color psychology and natural elements to create a calming atmosphere.`;
        services = SERVICES.filter(s => s.id === "interior-design");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Bedroom");
      } else if (lowerQuery.includes("kitchen")) {
        aiResponse = `The kitchen is the heart of every home, and at ${COMPANY_INFO.name}, we design kitchens that are both beautiful and highly functional. Our approach combines ergonomic design principles with stunning aesthetics.\n\nWe specialize in modern kitchen layouts, custom cabinetry, premium countertops, and state-of-the-art appliance integration. Whether you prefer contemporary minimalism or warm traditional style, we create kitchens that inspire culinary creativity.`;
        services = SERVICES.filter(s => s.id === "interior-design" || s.id === "renovation");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Kitchen");
      } else if (lowerQuery.includes("office") || lowerQuery.includes("commercial") || lowerQuery.includes("business")) {
        aiResponse = `${COMPANY_INFO.name} creates professional workspaces that enhance productivity, reflect brand identity, and inspire your team. Our commercial design services cover everything from executive offices to collaborative workspaces.\n\nWe understand that great office design impacts employee satisfaction and business success. Our solutions include ergonomic furniture, acoustic planning, biophilic elements, and technology integration.`;
        services = SERVICES.filter(s => s.id === "interior-design" || s.id === "space-planning");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Office" || p.category === "Commercial");
      } else if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("budget") || lowerQuery.includes("quote")) {
        aiResponse = `At ${COMPANY_INFO.name}, our pricing is tailored to each project's unique requirements. Factors that influence cost include project size, scope of work, material selections, and timeline.\n\n**Our typical services range:**\n• Design Consultation: Starting from ₦150,000\n• Full Room Design: Starting from ₦500,000\n• Complete Home Renovation: Custom pricing based on scope\n\nWe offer complimentary initial consultations to understand your vision and provide detailed proposals. Contact us to discuss your specific needs and budget.`;
        services = SERVICES.filter(s => s.id === "consultation");
      } else if (lowerQuery.includes("renovation") || lowerQuery.includes("remodel")) {
        aiResponse = `Our renovation services at ${COMPANY_INFO.name} transform existing spaces into modern, functional environments. We handle everything from minor updates to complete overhauls, ensuring quality craftsmanship at every stage.\n\nOur renovation process includes detailed planning, contractor coordination, timeline management, and quality control. We minimize disruption while maximizing results, delivering spaces that exceed expectations.`;
        services = SERVICES.filter(s => s.id === "renovation");
      } else if (lowerQuery.includes("3d") || lowerQuery.includes("visualization") || lowerQuery.includes("render")) {
        aiResponse = `Our 3D visualization services bring your design concepts to life before construction begins. Using advanced rendering technology, we create photorealistic images and virtual walkthroughs of your future space.\n\nThis powerful tool allows you to visualize materials, lighting, and furniture arrangements, making informed decisions and avoiding costly changes during construction. See your dream space in stunning detail before committing to the design.`;
        services = SERVICES.filter(s => s.id === "3d-visualization");
      } else {
        aiResponse = `Thank you for your interest in ${COMPANY_INFO.name}! We're a premier interior design studio based in Lagos, specializing in creating exceptional spaces that inspire and transform the way you live.\n\n**Our Services Include:**\n• Complete Interior Design\n• Space Planning & Optimization\n• Renovation Management\n• 3D Visualization & Rendering\n• Design Consultation\n\nWhether you're looking to redesign a single room or transform your entire property, our experienced team is here to bring your vision to life. Contact us for a complimentary consultation!`;
        services = SERVICES.slice(0, 3);
        projects = PORTFOLIO_ITEMS.slice(0, 3);
      }

      setResponse(aiResponse);
      setRelatedServices(services);
      setRelatedProjects(projects.length > 0 ? projects : PORTFOLIO_ITEMS.slice(0, 3));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-bronze transition-colors mb-6 font-sans text-sm"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-bronze/10 flex items-center justify-center">
                <Sparkles className="text-bronze" size={20} />
              </div>
              <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm">
                AI Search Results
              </p>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              "{query}"
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Response */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-cream rounded-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-bronze flex items-center justify-center">
                    <Sparkles className="text-white" size={16} />
                  </div>
                  <span className="font-sans font-medium text-foreground">
                    AI Response
                  </span>
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded animate-pulse w-full" />
                    <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
                    <div className="h-4 bg-muted rounded animate-pulse w-full" />
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    <p className="font-sans text-foreground leading-relaxed whitespace-pre-line">
                      {response}
                    </p>
                  </div>
                )}

                {!isLoading && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <Button variant="bronze" asChild>
                      <Link to="/contact">
                        Get Started
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-cream rounded-lg p-6">
                  <h3 className="font-serif text-lg text-foreground mb-4">
                    Related Services
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((service) => (
                      <li key={service.id}>
                        <Link
                          to={`/services#${service.id}`}
                          className="flex items-center gap-2 font-sans text-muted-foreground hover:text-bronze transition-colors"
                        >
                          <ArrowRight size={14} />
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="bg-cream rounded-lg p-6">
                  <h3 className="font-serif text-lg text-foreground mb-4">
                    Featured Projects
                  </h3>
                  <ul className="space-y-3">
                    {relatedProjects.map((project) => (
                      <li key={project.id}>
                        <Link
                          to={`/gallery/${project.id}`}
                          className="flex items-center gap-2 font-sans text-muted-foreground hover:text-bronze transition-colors"
                        >
                          <ArrowRight size={14} />
                          {project.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-charcoal text-primary-foreground rounded-lg p-6">
                <h3 className="font-serif text-lg mb-3">
                  Have More Questions?
                </h3>
                <p className="font-sans text-sm text-primary-foreground/70 mb-4">
                  Our team is ready to help you with your project.
                </p>
                <Button variant="bronze" size="sm" className="w-full" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Again */}
      <section className="py-12 bg-cream">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                if (input.value.trim()) {
                  window.location.href = `/search?query=${encodeURIComponent(input.value.trim())}`;
                }
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Ask another question..."
                className="w-full px-6 py-4 pr-14 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-bronze/50 font-sans"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-bronze hover:bg-bronze-light rounded-full transition-colors"
              >
                <Search size={20} className="text-white" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchResults;
