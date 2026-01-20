import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT_INFO, COMPANY_INFO, NAV_LINKS, SERVICES } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-bronze rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold">A</span>
              </div>
              <span className="font-serif text-2xl font-medium">
                {COMPANY_INFO.name}
              </span>
            </Link>
            <p className="text-primary-foreground/70 font-sans text-sm leading-relaxed mb-6">
              {COMPANY_INFO.tagline}. Creating exceptional interior spaces that inspire and transform the way you live since {COMPANY_INFO.established}.
            </p>
            <div className="flex gap-4">
              {Object.entries(CONTACT_INFO.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-bronze hover:border-bronze transition-all duration-300"
                >
                  <span className="text-xs uppercase font-sans">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm text-primary-foreground/70 hover:text-bronze transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="font-sans text-sm text-primary-foreground/70 hover:text-bronze transition-colors duration-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone[0].replace(/\s/g, "")}`}
                  className="flex items-start gap-3 font-sans text-sm text-primary-foreground/70 hover:text-bronze transition-colors duration-300"
                >
                  <Phone size={18} className="mt-0.5 shrink-0" />
                  <span>
                    {CONTACT_INFO.phone[0]}<br />
                    {CONTACT_INFO.phone[1]}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 font-sans text-sm text-primary-foreground/70 hover:text-bronze transition-colors duration-300"
                >
                  <Mail size={18} className="shrink-0" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-sans text-sm text-primary-foreground/70 hover:text-bronze transition-colors duration-300"
                >
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  {CONTACT_INFO.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-primary-foreground/50">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="font-sans text-xs text-primary-foreground/50 hover:text-bronze transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-sans text-xs text-primary-foreground/50 hover:text-bronze transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
