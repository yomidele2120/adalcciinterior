import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { COMPANY_INFO, TESTIMONIALS } from "@/lib/constants";

const teamMembers = [
  {
    name: "Adaeze Okonkwo",
    role: "Lead Designer & Founder",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
    bio: "With over 15 years of experience, Adaeze leads our design vision with passion and precision, blending Nigerian heritage with modern aesthetics.",
  },
  {
    name: "Chukwuemeka Eze",
    role: "Senior Architect",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400&auto=format&fit=crop",
    bio: "Chukwuemeka brings architectural excellence and innovative spatial solutions inspired by Lagos's vibrant urban landscape.",
  },
  {
    name: "Sarah Mitchell",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    bio: "Sarah ensures every project runs smoothly from concept to completion with international best practices.",
  },
  {
    name: "Oluwaseun Adeyemi",
    role: "Interior Stylist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "Oluwaseun's eye for detail transforms spaces into curated masterpieces featuring Nigerian artistry.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
                About Us
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Creating Spaces That Inspire
              </h1>
              <p className="font-sans text-muted-foreground text-lg leading-relaxed">
                Since {COMPANY_INFO.established}, {COMPANY_INFO.name} has been transforming spaces across Lagos and beyond. We believe that exceptional design has the power to enhance lives, inspire creativity, and create lasting memories.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
                alt="Adalcci Interior studio"
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-bronze/10 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
                alt="Our story"
                className="w-full aspect-square object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                A Passion for Design Excellence
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                Founded by {COMPANY_INFO.founder} in {COMPANY_INFO.established}, {COMPANY_INFO.name} began with a simple vision: to create interior spaces that truly reflect the personalities and aspirations of our clients.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                What started as a small studio has grown into one of Lagos's most sought-after interior design firms, known for our distinctive approach that blends contemporary aesthetics with timeless elegance.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Today, our team of talented designers, architects, and project managers work together to deliver exceptional results on every project, from intimate residential spaces to grand commercial establishments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
              Our Values
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Excellence", desc: "Uncompromising quality in every detail we craft" },
              { icon: Users, title: "Collaboration", desc: "Working closely with clients to realize their vision" },
              { icon: Target, title: "Innovation", desc: "Pushing boundaries with creative design solutions" },
              { icon: Heart, title: "Passion", desc: "Genuine love for transforming spaces and lives" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-primary-foreground/5"
              >
                <item.icon className="w-12 h-12 text-bronze mx-auto mb-4" />
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-primary-foreground/70">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="font-sans text-bronze tracking-[0.2em] uppercase text-sm mb-4">
              Our Team
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Meet the Creatives
            </h2>
            <p className="font-sans text-muted-foreground">
              A talented team of designers and professionals dedicated to bringing your vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-bronze mb-2">{member.role}</p>
                <p className="font-sans text-sm text-muted-foreground">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Let's Create Something Beautiful Together
            </h2>
            <p className="font-sans text-muted-foreground mb-8">
              Whether you have a clear vision or need guidance to find your style, we're here to help bring your dream space to life.
            </p>
            <Button variant="bronze" size="xl" asChild>
              <Link to="/contact">
                Start a Conversation
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
