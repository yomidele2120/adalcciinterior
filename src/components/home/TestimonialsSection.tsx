import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TESTIMONIALS } from "@/lib/constants";

interface UserReview {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  image_url: string | null;
  is_approved: boolean;
  created_at: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });

  // Fetch approved user reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("user_reviews")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setUserReviews(data);
      }
    };

    fetchReviews();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("user_reviews")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_reviews",
        },
        (payload) => {
          // Only add if approved (admin would need to approve)
          const newReview = payload.new as UserReview;
          if (newReview.is_approved !== false) {
            setUserReviews((prev) => [newReview, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.content.trim()) {
      toast.error("Please fill in your name and review");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("user_reviews").insert({
        name: formData.name.trim(),
        role: formData.role.trim() || null,
        content: formData.content.trim(),
        rating: formData.rating,
        is_approved: true, // Auto-approve for now
      });

      if (error) throw error;

      toast.success("Thank you for your review!");
      setFormData({ name: "", role: "", content: "", rating: 5 });
      setShowForm(false);

      // Refresh reviews
      const { data } = await supabase
        .from("user_reviews")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) {
        setUserReviews(data);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                      src={TESTIMONIALS[currentIndex].image}
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

        {/* User Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 pt-8 border-t border-primary-foreground/10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="font-serif text-xl md:text-2xl mb-2">
                Share Your Experience
              </h3>
              <p className="font-sans text-sm text-primary-foreground/60">
                We'd love to hear about your journey with Adalcci Interior
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              variant="bronze"
              size="lg"
              className="self-start shadow-lg"
            >
              {showForm ? "Cancel" : "Write a Review"}
            </Button>
          </div>

          {/* Review Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmitReview}
                className="bg-primary-foreground/5 rounded-lg p-6 mb-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-sans text-sm text-primary-foreground/70 mb-2 block">
                      Your Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-sans text-sm text-primary-foreground/70 mb-2 block">
                      Your Role / Location
                    </label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Homeowner, Lekki"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="font-sans text-sm text-primary-foreground/70 mb-2 block">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`transition-colors ${
                            star <= formData.rating
                              ? "text-bronze fill-bronze"
                              : "text-primary-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="font-sans text-sm text-primary-foreground/70 mb-2 block">
                    Your Review *
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Share your experience with us..."
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" variant="luxury" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                  <Send size={16} />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* User Reviews List */}
          {userReviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-primary-foreground/5 rounded-lg p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= (review.rating || 5)
                            ? "text-bronze fill-bronze"
                            : "text-primary-foreground/30"
                        }
                      />
                    ))}
                  </div>
                  <p className="font-sans text-primary-foreground/80 leading-relaxed mb-4 line-clamp-4">
                    "{review.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bronze/20 flex items-center justify-center">
                      <span className="font-serif text-bronze font-bold">
                        {review.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-medium text-primary-foreground text-sm">
                        {review.name}
                      </p>
                      {review.role && (
                        <p className="font-sans text-xs text-primary-foreground/50">
                          {review.role}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
