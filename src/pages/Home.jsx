import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FEATURED_COLLECTIONS, CLIENT_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const navigate = useNavigate();
  const { products } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filter 5 signature best-seller products specifically mentioned
  const signatureProductIds = ['lumora-101', 'lumora-102', 'lumora-103', 'lumora-104', 'lumora-105'];
  const signatureProducts = signatureProductIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  // New arrivals (4 products)
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="home-page">
      {/* ==================================================
          3. HERO SECTION
         ================================================== */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          background: '#051410',
          overflow: 'hidden',
          padding: '4rem 2rem'
        }}
      >
        {/* Background Hero Image with dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: 0.35
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(5, 20, 16, 0.4) 0%, rgba(5, 20, 16, 0.95) 100%)'
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1250px',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <div style={{ maxWidth: '640px' }} className="animate-fade-in">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-gold)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              <Sparkles size={14} /> TIMELESS ELEGANCE. MODERN LEGACY.
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 6vw, 5.2rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#FAF7F2',
                marginBottom: '1.5rem',
                letterSpacing: '0.01em'
              }}
            >
              Made to Be <br />
              <i style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: 'var(--color-gold-light)' }}>
                Legendary.
              </i>
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                color: '#D1D8D5',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                fontWeight: 300
              }}
            >
              Discover exquisite jewellery crafted to celebrate the moments that become memories.
            </p>

            <Link to="/shop" className="btn-gold-outline">
              EXPLORE THE COLLECTION <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. FEATURED COLLECTIONS
         ================================================== */}
      <section style={{ padding: '6rem 2rem', background: '#071915' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#FAF7F2', letterSpacing: '0.08em' }}>
            EXPLORE OUR COLLECTIONS
          </h2>
          <div className="gold-divider" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem',
              marginTop: '3rem'
            }}
          >
            {FEATURED_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                onClick={() => navigate(col.link)}
                className="collection-card"
                style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className="col-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(5, 20, 16, 0.95) 0%, rgba(5, 20, 16, 0.2) 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                    textAlign: 'left',
                    transition: 'background 0.4s ease'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      color: '#FAF7F2',
                      letterSpacing: '0.1em',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {col.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-gold)',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    SHOP NOW <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. SIGNATURE PIECES / BEST SELLERS (Warm Ivory Background)
         ================================================== */}
      <section className="section-ivory" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#B89343', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            CURATED SELECTION
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#1A1E1C', marginTop: '6px', letterSpacing: '0.04em' }}>
            SIGNATURE PIECES
          </h2>
          <div style={{ width: '50px', height: '1px', background: '#D4AF37', margin: '1.25rem auto' }} />

          {/* 5 Products Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '3.5rem',
              textAlign: 'left'
            }}
          >
            {signatureProducts.map((product) => (
              <ProductCard key={product.id} product={product} theme="light" />
            ))}
          </div>

          <div style={{ marginTop: '3.5rem' }}>
            <Link to="/shop" className="btn-dark">
              VIEW ALL PIECES
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. NEW ARRIVALS (Dark Emerald Section)
         ================================================== */}
      <section className="section-emerald" style={{ padding: '6rem 2rem', background: '#08211B' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            JUST UNVEILED
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#FAF7F2', marginTop: '6px', letterSpacing: '0.06em' }}>
            NEW ARRIVALS
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#9EB3A9', marginTop: '8px', fontWeight: 300 }}>
            Discover the latest pieces from the LUMORA collection.
          </p>
          <div className="gold-divider" />

          {/* 4 Column Product Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.75rem',
              marginTop: '3.5rem',
              textAlign: 'left'
            }}
          >
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} theme="dark" />
            ))}
          </div>

          <div style={{ marginTop: '3.5rem' }}>
            <Link to="/shop?category=New" className="btn-gold-outline">
              SHOP NEW ARRIVALS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. PROMOTIONAL / OFFER BANNER
         ================================================== */}
      <section
        style={{
          position: 'relative',
          padding: '7rem 2rem',
          background: '#051410',
          backgroundImage: `url('https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5, 20, 16, 0.82)', backdropFilter: 'blur(3px)' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
            LIMITED EDIT
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: '#FAF7F2', margin: '1rem 0 1.25rem 0' }}>
            THE LUMORA EDIT
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#D1D8D5', marginBottom: '2.5rem', fontWeight: 300, lineHeight: 1.6 }}>
            “Elegance, curated for every unforgettable occasion.”
          </p>
          <Link to="/shop" className="btn-gold-solid">
            DISCOVER THE EDIT
          </Link>
        </div>
      </section>

      {/* ==================================================
          8. HERITAGE & CRAFTSMANSHIP (Editorial Split Section)
         ================================================== */}
      <section id="heritage" style={{ background: '#051410', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left: Dark Jewellery Craftsmanship Image */}
          <div style={{ position: 'relative', minHeight: '450px', background: '#000' }}>
            <img
              src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80"
              alt="LUMORA Craftsmanship"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(110%) brightness(85%)' }}
            />
          </div>

          {/* Right: Dark Emerald Background Copy */}
          <div
            style={{
              background: '#071915',
              padding: '5rem 3.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              HERITAGE & CRAFTSMANSHIP
            </span>

            <h2 style={{ fontSize: '2.5rem', color: '#FAF7F2', margin: '1rem 0 1.5rem 0', lineHeight: 1.2 }}>
              Rooted in Heritage. <br />
              <i style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold-light)' }}>
                Crafted for Generations.
              </i>
            </h2>

            <p style={{ fontSize: '1rem', color: '#9EB3A9', lineHeight: 1.8, marginBottom: '2.5rem', fontWeight: 300 }}>
              Every LUMORA piece is created with meticulous attention to detail, combining timeless Indian heritage craftsmanship with a contemporary luxury vision. Each diamond is ethically hand-selected and handset by master artisans.
            </p>

            <div>
              <Link to="/shop" className="btn-gold-outline">
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. CUSTOMER REVIEWS (Warm Ivory Section)
         ================================================== */}
      <section className="section-ivory" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#B89343', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            CLIENT TESTIMONIALS
          </span>
          <h2 style={{ fontSize: '2.4rem', color: '#1A1E1C', marginTop: '6px', letterSpacing: '0.04em' }}>
            WHAT OUR CLIENTS SAY
          </h2>
          <div style={{ width: '50px', height: '1px', background: '#D4AF37', margin: '1.25rem auto' }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '3.5rem'
            }}
          >
            {CLIENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                style={{
                  background: '#FFFFFF',
                  padding: '2.5rem 2rem',
                  border: '1px solid #EAE3D2',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div style={{ display: 'flex', color: '#D4AF37', marginBottom: '1.25rem' }}>
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} size={16} fill="#D4AF37" />
                    ))}
                  </div>
                  <p style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#2D3330', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    “{review.review}”
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F0EADB', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1E1C', letterSpacing: '0.05em' }}>
                    — {review.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#8E9993' }}>
                    {review.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          10. NEWSLETTER SIGNUP
         ================================================== */}
      <section
        style={{
          background: 'linear-gradient(135deg, #051410 0%, #0D2D25 100%)',
          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
          padding: '6rem 2rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            STAY CONNECTED
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#FAF7F2', margin: '0.75rem 0 1rem 0' }}>
            JOIN THE LUMORA EDIT
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#9EB3A9', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 300 }}>
            Be the first to discover new arrivals, exclusive collections and special offers.
          </p>

          {subscribed ? (
            <div
              className="animate-fade-in"
              style={{
                background: 'rgba(13, 45, 37, 0.8)',
                border: '1px solid var(--color-gold)',
                padding: '1.25rem 2rem',
                color: 'var(--color-gold-light)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <CheckCircle size={20} color="var(--color-gold)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                Thank you for joining the LUMORA family.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center'
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: '1 1 280px',
                  maxWidth: '380px',
                  background: 'rgba(5, 20, 16, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '12px 18px',
                  color: '#FAF7F2',
                  fontSize: '0.85rem',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
              <button type="submit" className="btn-gold-solid" style={{ padding: '12px 28px' }}>
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .collection-card:hover .col-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};
