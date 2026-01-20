// Adalcci Interior Design - Contact Information
export const CONTACT_INFO = {
  phone: ["+234 816 899 8902", "+234 706 193 8080"],
  email: "adalcciglobal@gmail.com",
  address: "25th, Paul Street, Abule-Egba, Lagos State",
  whatsapp: "+2348168998902",
  social: {
    instagram: "https://instagram.com/adalcciinterior",
    facebook: "https://facebook.com/adalcciinterior",
    pinterest: "https://pinterest.com/adalcciinterior",
  },
};

export const COMPANY_INFO = {
  name: "Adalcci Interior",
  tagline: "Transforming Spaces Into Inspired Living",
  founder: "Sarah Mitchell",
  founderTitle: "Lead Designer",
  established: "2015",
};

export const SERVICES = [
  {
    id: "interior-design",
    title: "Interior Design",
    description: "Complete interior design solutions that transform your space into a harmonious blend of aesthetics and functionality. From concept to completion, we craft environments that reflect your unique style.",
    image: "/services/interior-design.jpg",
    features: ["Space Planning", "Color Consultation", "Material Selection", "Furniture Layout"],
  },
  {
    id: "space-planning",
    title: "Space Planning",
    description: "Strategic space optimization that maximizes functionality while maintaining visual appeal. We analyze your space and create layouts that enhance flow and livability.",
    image: "/services/space-planning.jpg",
    features: ["Traffic Flow Analysis", "Zoning Solutions", "Furniture Placement", "Multi-functional Spaces"],
  },
  {
    id: "renovation",
    title: "Renovation",
    description: "Comprehensive renovation services that breathe new life into existing spaces. From structural changes to finishing touches, we manage every aspect of your transformation.",
    image: "/services/renovation.jpg",
    features: ["Project Management", "Contractor Coordination", "Timeline Planning", "Budget Optimization"],
  },
  {
    id: "3d-visualization",
    title: "3D Visualization",
    description: "Photorealistic 3D renderings that bring your design concepts to life before construction begins. See your future space with stunning clarity and detail.",
    image: "/services/3d-visualization.jpg",
    features: ["Photorealistic Renders", "Virtual Walkthroughs", "Material Previews", "Lighting Simulation"],
  },
  {
    id: "consultation",
    title: "Design Consultation",
    description: "Expert guidance for your interior design journey. Whether you need a complete makeover or fresh ideas, our consultations provide actionable insights tailored to your needs.",
    image: "/services/consultation.jpg",
    features: ["Style Assessment", "Budget Planning", "Vendor Recommendations", "Design Direction"],
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: "modern-minimalist-living",
    title: "Modern Minimalist Living",
    category: "Living Room",
    location: "Victoria Island, Lagos",
    year: "2024",
    description: "A serene living space that embraces the beauty of simplicity. Clean lines, neutral tones, and carefully curated pieces create an atmosphere of calm sophistication.",
    images: ["/portfolio/living-1.jpg", "/portfolio/living-2.jpg", "/portfolio/living-3.jpg"],
  },
  {
    id: "luxury-master-suite",
    title: "Luxury Master Suite",
    category: "Bedroom",
    location: "Ikoyi, Lagos",
    year: "2024",
    description: "An opulent master bedroom that serves as a private sanctuary. Rich textures, warm lighting, and bespoke furnishings create an atmosphere of refined luxury.",
    images: ["/portfolio/bedroom-1.jpg", "/portfolio/bedroom-2.jpg", "/portfolio/bedroom-3.jpg"],
  },
  {
    id: "contemporary-kitchen",
    title: "Contemporary Kitchen",
    category: "Kitchen",
    location: "Lekki, Lagos",
    year: "2023",
    description: "A state-of-the-art kitchen that seamlessly blends functionality with modern aesthetics. Premium finishes and smart storage solutions make this space a culinary haven.",
    images: ["/portfolio/kitchen-1.jpg", "/portfolio/kitchen-2.jpg", "/portfolio/kitchen-3.jpg"],
  },
  {
    id: "executive-office",
    title: "Executive Office",
    category: "Office",
    location: "Marina, Lagos",
    year: "2023",
    description: "A commanding executive office that exudes professionalism and style. Thoughtful design elements create an environment conducive to productivity and success.",
    images: ["/portfolio/office-1.jpg", "/portfolio/office-2.jpg", "/portfolio/office-3.jpg"],
  },
  {
    id: "boutique-hotel-lobby",
    title: "Boutique Hotel Lobby",
    category: "Commercial",
    location: "Ikeja, Lagos",
    year: "2023",
    description: "A welcoming hotel lobby that makes a memorable first impression. Luxurious materials and artistic touches create an atmosphere of refined hospitality.",
    images: ["/portfolio/hotel-1.jpg", "/portfolio/hotel-2.jpg", "/portfolio/hotel-3.jpg"],
  },
  {
    id: "spa-retreat",
    title: "Spa Retreat",
    category: "Commercial",
    location: "Banana Island, Lagos",
    year: "2024",
    description: "A tranquil spa environment designed to promote relaxation and wellness. Natural materials and soothing colors create a haven of peace and rejuvenation.",
    images: ["/portfolio/spa-1.jpg", "/portfolio/spa-2.jpg", "/portfolio/spa-3.jpg"],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Chioma Okonkwo",
    role: "Homeowner",
    content: "Adalcci Interior transformed our house into a home beyond our imagination. Their attention to detail and understanding of our lifestyle was exceptional. Every room tells a story.",
    image: "/testimonials/client-1.jpg",
  },
  {
    id: 2,
    name: "Emmanuel Adeyemi",
    role: "Business Executive",
    content: "The office redesign has significantly impacted our company culture. The space now reflects our brand values and has improved employee satisfaction tremendously.",
    image: "/testimonials/client-2.jpg",
  },
  {
    id: 3,
    name: "Aisha Mohammed",
    role: "Hotel Owner",
    content: "Working with Adalcci was a seamless experience. They delivered our hotel renovation on time and within budget, exceeding our expectations at every turn.",
    image: "/testimonials/client-3.jpg",
  },
];

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const CATEGORIES = ["All", "Living Room", "Bedroom", "Kitchen", "Office", "Commercial"];
