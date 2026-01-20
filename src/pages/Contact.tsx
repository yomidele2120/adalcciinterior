import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { CONTACT_INFO, COMPANY_INFO } from "@/lib/constants";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setIsSubmitting(false);
  };

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
              Get In Touch
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Contact Us
            </h1>
            <p className="font-sans text-muted-foreground text-lg">
              Ready to transform your space? We'd love to hear about your project. Reach out for a complimentary consultation and let's bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                Let's Start a Conversation
              </h2>

              <div className="space-y-6 mb-10">
                <a
                  href={`tel:${CONTACT_INFO.phone[0].replace(/\s/g, "")}`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-cream hover:bg-secondary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center shrink-0 group-hover:bg-bronze/20 transition-colors">
                    <Phone className="text-bronze" size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">Phone</h3>
                    <p className="font-sans text-muted-foreground">
                      {CONTACT_INFO.phone[0]}
                    </p>
                    <p className="font-sans text-muted-foreground">
                      {CONTACT_INFO.phone[1]}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-cream hover:bg-secondary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center shrink-0 group-hover:bg-bronze/20 transition-colors">
                    <Mail className="text-bronze" size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">Email</h3>
                    <p className="font-sans text-muted-foreground">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg bg-cream hover:bg-secondary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center shrink-0 group-hover:bg-bronze/20 transition-colors">
                    <MapPin className="text-bronze" size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">Studio</h3>
                    <p className="font-sans text-muted-foreground">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-cream">
                  <div className="w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center shrink-0">
                    <Clock className="text-bronze" size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">Hours</h3>
                    <p className="font-sans text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="font-sans text-muted-foreground">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={20} />
                <span className="font-sans font-medium">Chat on WhatsApp</span>
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-cream rounded-lg p-8">
                <h2 className="font-serif text-2xl text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-sm text-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bronze/50 font-sans"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bronze/50 font-sans"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-sm text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bronze/50 font-sans"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-sm text-foreground mb-2">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bronze/50 font-sans"
                      >
                        <option value="">Select a service</option>
                        <option value="interior-design">Interior Design</option>
                        <option value="space-planning">Space Planning</option>
                        <option value="renovation">Renovation</option>
                        <option value="3d-visualization">3D Visualization</option>
                        <option value="consultation">Design Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bronze/50 font-sans resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="bronze"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-muted">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(CONTACT_INFO.address)}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Adalcci Interior Location"
        />
      </section>
    </Layout>
  );
};

export default Contact;
