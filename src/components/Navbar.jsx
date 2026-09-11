import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlist, searchQuery, setSearchQuery } = useShop();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #051410 0%, #0D2D25 50%, #051410 100%)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          color: 'var(--color-gold-light)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          padding: '8px 16px',
          textAlign: 'center',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1001
        }}
      >
        ✦ COMPLIMENTARY EXPRESS SHIPPING & EASY RETURNS ON ALL ORDERS ✦
      </div>

      {/* 2. Main Sticky Navbar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled || !isHomePage ? '#061914' : 'transparent',
          borderBottom: isScrolled || !isHomePage ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <div
          style={{
            maxWidth: '1350px',
            margin: '0 auto',
            padding: '1.1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#FAF7F2',
              cursor: 'pointer',
              display: 'none',
              padding: 0
            }}
          >
            {mobileMenuOpen ? <X size={24} color="var(--color-gold)" /> : <Menu size={24} color="#FAF7F2" />}
          </button>

          {/* Left Navigation Links (Desktop) */}
          <nav className="desktop-only-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/shop?category=New" className="nav-link">
              NEW ARRIVALS
            </Link>
            <Link to="/shop" className="nav-link">
              JEWELLERY
            </Link>
            <Link to="/shop?category=Watches" className="nav-link">
              WATCHES
            </Link>
            <Link to="/shop?category=Bangles" className="nav-link">
              ACCESSORIES
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 500,
                letterSpacing: '0.28em',
                color: '#FAF7F2',
                lineHeight: 1
              }}
            >
              LUMORA
            </span>
            <span
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.35em',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                marginTop: '4px'
              }}
            >
              JEWELLERY
            </span>
          </Link>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{ background: 'none', border: 'none', color: '#FAF7F2', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Search"
            >
              <Search size={20} className="icon-hover" />
            </button>

            {/* Account Icon */}
            <Link to="/account" style={{ color: '#FAF7F2', textDecoration: 'none', display: 'flex', alignItems: 'center' }} title="Account">
              <User size={20} className="icon-hover" />
            </Link>

            {/* Wishlist Icon */}
            <Link to="/wishlist" style={{ color: '#FAF7F2', textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }} title="Wishlist">
              <Heart size={20} className="icon-hover" />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    background: 'var(--color-gold)',
                    color: '#051410',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" style={{ color: '#FAF7F2', textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }} title="Shopping Bag">
              <ShoppingBag size={20} className="icon-hover" />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    background: 'var(--color-gold)',
                    color: '#051410',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Live Search Bar Overlay */}
        {searchOpen && (
          <div
            className="animate-fade-in"
            style={{
              background: '#08211B',
              borderTop: '1px solid var(--color-gold-muted)',
              borderBottom: '1px solid var(--color-gold)',
              padding: '1rem 2rem'
            }}
          >
            <form
              onSubmit={handleSearchSubmit}
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Search size={18} color="var(--color-gold)" />
              <input
                type="text"
                placeholder="Search jewellery, diamonds, rings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--color-gold-muted)',
                  color: '#FAF7F2',
                  fontSize: '0.95rem',
                  padding: '8px 4px',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)'
                }}
              />
              <button
                type="submit"
                className="btn-gold-solid"
                style={{ padding: '6px 16px', fontSize: '0.65rem' }}
              >
                SEARCH
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(5, 20, 16, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-gold-muted)' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', letterSpacing: '0.2em', color: '#FAF7F2' }}>
              LUMORA
            </span>
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#FAF7F2' }}>
              <X size={24} color="var(--color-gold)" />
            </button>
          </div>

          <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              HOME <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              ALL JEWELLERY <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
            <Link
              to="/shop?category=Earrings"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              EARRINGS <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
            <Link
              to="/shop?category=Necklaces"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              NECKLACES <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
            <Link
              to="/shop?category=Rings"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              RINGS <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
            <Link
              to="/shop?category=Bangles"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              BANGLES <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              MY WISHLIST ({wishlist.length}) <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FAF7F2', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '0.15em', display: 'flex', justifyContent: 'space-between' }}
            >
              SHOPPING BAG ({cartCount}) <ChevronRight size={18} color="var(--color-gold)" />
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          color: #FAF7F2;
          text-decoration: none;
          font-size: 0.72rem;
          font-weight: 600;
          letterSpacing: 0.22em;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: var(--color-gold-light);
        }
        .icon-hover {
          transition: all 0.3s ease;
        }
        .icon-hover:hover {
          color: var(--color-gold);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .desktop-only-nav {
            display: none !important;
          }
          .mobile-only-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
