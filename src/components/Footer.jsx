import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Share2, Globe, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        background: '#051410',
        color: '#FAF7F2',
        borderTop: '1px solid rgba(212, 175, 55, 0.25)',
        paddingTop: '4rem',
        paddingBottom: '2rem'
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#FAF7F2' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', letterSpacing: '0.25em', fontWeight: 400 }}>
                LUMORA
              </span>
              <span style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.35em', color: 'var(--color-gold)', textTransform: 'uppercase', marginTop: '2px' }}>
                JEWELLERY
              </span>
            </Link>
            <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#9EB3A9', lineHeight: 1.7, maxWidth: '320px' }}>
              Jewellery That Becomes Your Story. Handcrafted with timeless craftsmanship and modern elegance.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', color: 'var(--color-gold-light)' }}>
              {/* Instagram SVG */}
              <a href="#" style={{ color: 'inherit' }} title="Instagram" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook SVG */}
              <a href="#" style={{ color: 'inherit' }} title="Facebook" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* Pinterest / Compass */}
              <a href="#" style={{ color: 'inherit' }} title="Pinterest" aria-label="Pinterest">
                <Compass size={18} />
              </a>
              {/* YouTube SVG */}
              <a href="#" style={{ color: 'inherit' }} title="YouTube" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              SHOP
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/shop?category=New" className="footer-link">New Arrivals</Link></li>
              <li><Link to="/shop" className="footer-link">Jewellery</Link></li>
              <li><Link to="/shop?category=Earrings" className="footer-link">Earrings</Link></li>
              <li><Link to="/shop?category=Necklaces" className="footer-link">Necklaces</Link></li>
              <li><Link to="/shop?category=Rings" className="footer-link">Rings</Link></li>
              <li><Link to="/shop?category=Bangles" className="footer-link">Bangles</Link></li>
            </ul>
          </div>

          {/* Column 2: LUMORA */}
          <div>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              LUMORA
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#heritage" className="footer-link">Our Story</a></li>
              <li><a href="#heritage" className="footer-link">Craftsmanship</a></li>
              <li><Link to="/shop" className="footer-link">Collections</Link></li>
              <li><a href="#" className="footer-link">Careers</a></li>
            </ul>
          </div>

          {/* Column 3: CLIENT SERVICES */}
          <div>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              CLIENT SERVICES
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Shipping & Returns</a></li>
              <li><Link to="/orders" className="footer-link">My Orders</Link></li>
              <li><a href="#" className="footer-link">Care Guide</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(212, 175, 55, 0.15)', marginBottom: '2rem' }} />

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem', color: '#7E9188' }}>
          <p>© 2026 LUMORA. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Accessibility</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #9EB3A9;
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: var(--color-gold-light);
        }
      `}</style>
    </footer>
  );
};
