import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Sparkles, ArrowRight, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { SERVICES, PORTFOLIO_ITEMS, COMPANY_INFO } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  canVisitorSearch, 
  incrementVisitorSearchCount, 
  getRemainingSearches,
  VISITOR_SEARCH_LIMIT_VALUE 
} from "@/lib/searchLimits";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [relatedServices, setRelatedServices] = useState<typeof SERVICES>([]);
  const [relatedProjects, setRelatedProjects] = useState<typeof PORTFOLIO_ITEMS>([]);
  const [remainingSearches, setRemainingSearches] = useState(getRemainingSearches());
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, user]);

  const performSearch = async (userQuery: string) => {
    setIsLoading(true);
    setError(null);

    // Check search limits for visitors
    if (!user && !canVisitorSearch()) {
      setError("limit_exceeded");
      setIsLoading(false);
      return;
    }

    try {
      // Call the AI search edge function
      const { data, error: fnError } = await supabase.functions.invoke("ai-search", {
        body: { 
          query: userQuery,
          userId: user?.id || null
        },
      });

      if (fnError) {
        console.error("Search function error:", fnError);
        setError("Failed to process your search. Please try again.");
        setIsLoading(false);
        return;
      }

      if (data?.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Increment search count for visitors
      if (!user) {
        incrementVisitorSearchCount();
        setRemainingSearches(getRemainingSearches());
      }

      // Save to search history for authenticated users
      if (user) {
        await supabase.from("search_history").insert({
          user_id: user.id,
          query: userQuery,
          response: data.response,
        });
      }

      setResponse(data.response);
      
      // Determine related content based on query
      const lowerQuery = userQuery.toLowerCase();
      let services: typeof SERVICES = [];
      let projects: typeof PORTFOLIO_ITEMS = [];

      if (lowerQuery.includes("living") || lowerQuery.includes("room")) {
        services = SERVICES.filter(s => s.id === "interior-design" || s.id === "space-planning");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Living Room");
      } else if (lowerQuery.includes("bedroom") || lowerQuery.includes("master")) {
        services = SERVICES.filter(s => s.id === "interior-design");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Bedroom");
      } else if (lowerQuery.includes("kitchen")) {
        services = SERVICES.filter(s => s.id === "interior-design" || s.id === "renovation");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Kitchen");
      } else if (lowerQuery.includes("office") || lowerQuery.includes("commercial")) {
        services = SERVICES.filter(s => s.id === "interior-design" || s.id === "space-planning");
        projects = PORTFOLIO_ITEMS.filter(p => p.category === "Office" || p.category === "Commercial");
      } else if (lowerQuery.includes("renovate") || lowerQuery.includes("renovation")) {
        services = SERVICES.filter(s => s.id === "renovation");
      } else if (lowerQuery.includes("3d") || lowerQuery.includes("visual")) {
        services = SERVICES.filter(s => s.id === "3d-visualization");
      } else {
        services = SERVICES.slice(0, 3);
      }

      setRelatedServices(services.length > 0 ? services : SERVICES.slice(0, 2));
      setRelatedProjects(projects.length > 0 ? projects : PORTFOLIO_ITEMS.slice(0, 3));
      setIsLoading(false);
    } catch (err) {
      console.error("Search error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleNewSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input") as HTMLInputElement;
    if (input.value.trim()) {
      navigate(`/search?query=${encodeURIComponent(input.value.trim())}`);
    }
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
            
            {/* Search limit indicator for visitors */}
            {!user && !error && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                <span className="text-sm font-sans text-muted-foreground">
                  {remainingSearches} of {VISITOR_SEARCH_LIMIT_VALUE} free searches remaining
                </span>
                <Link to="/auth" className="text-sm font-sans text-bronze hover:underline">
                  Sign up for unlimited
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          {/* Limit Exceeded Error */}
          {error === "limit_exceeded" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-cream rounded-lg p-8 md:p-12">
                <div className="w-16 h-16 bg-bronze/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="text-bronze" size={32} />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Free Search Limit Reached
                </h2>
                <p className="font-sans text-muted-foreground mb-6">
                  You've used all {VISITOR_SEARCH_LIMIT_VALUE} free searches. Sign up for a free account to get unlimited AI-powered searches!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="bronze" size="lg" asChild>
                    <Link to="/auth">
                      Create Free Account
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button variant="luxury-outline" size="lg" asChild>
                    <Link to="/contact">Contact Us Instead</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Errors */}
          {error && error !== "limit_exceeded" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-cream rounded-lg p-8">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="text-destructive" size={32} />
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  Something went wrong
                </h2>
                <p className="font-sans text-muted-foreground mb-6">{error}</p>
                <Button variant="bronze" onClick={() => performSearch(query)}>
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}

          {/* Normal Results */}
          {!error && (
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

                {/* Auth CTA for visitors */}
                {!user && (
                  <div className="bg-charcoal text-primary-foreground rounded-lg p-6">
                    <h3 className="font-serif text-lg mb-3">
                      Unlock Unlimited Searches
                    </h3>
                    <p className="font-sans text-sm text-primary-foreground/70 mb-4">
                      Create a free account to get unlimited AI-powered searches.
                    </p>
                    <Button variant="bronze" size="sm" className="w-full" asChild>
                      <Link to="/auth">Sign Up Free</Link>
                    </Button>
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
          )}
        </div>
      </section>

      {/* Search Again */}
      {!error && (
        <section className="py-12 bg-cream">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleNewSearch} className="relative">
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
      )}
    </Layout>
  );
};

export default SearchResults;
