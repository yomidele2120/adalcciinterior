import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import AboutPreview from "@/components/home/AboutPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <PortfolioPreview />
      <AboutPreview />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
