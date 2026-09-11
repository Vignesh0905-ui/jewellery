import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const ProductCard = ({ product, theme = 'dark' }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist, addToCart, setQuickViewProduct } = useShop();

  const isSaved = isInWishlist(product.id);
  const isDarkTheme = theme === 'dark';

  const cardBg = isDarkTheme ? '#0D2D25' : '#FFFFFF';
  const textColor = isDarkTheme ? '#FAF7F2' : '#1A1E1C';
  const mutedTextColor = isDarkTheme ? '#9EB3A9' : '#6B7570';
  const borderColor = isDarkTheme ? 'rgba(212, 175, 55, 0.2)' : '#EAE3D2';

  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.4s ease',
        cursor: 'pointer'
      }}
      className="product-card-hover"
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(6, 25, 20, 0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <Heart
          size={18}
          color={isSaved ? '#E2C475' : '#FAF7F2'}
          fill={isSaved ? '#E2C475' : 'transparent'}
        />
      </button>

      {/* New Badge */}
      {product.newArrival && (
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 10,
            background: 'var(--color-gold)',
            color: '#051410',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            padding: '3px 8px',
            textTransform: 'uppercase',
            borderRadius: '1px'
          }}
        >
          NEW
        </span>
      )}

      {/* Image Container with Zoom effect */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '110%',
          overflow: 'hidden',
          background: '#071915'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="product-card-img"
        />

        {/* Quick View overlay trigger button */}
        <div
          className="quick-view-bar"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px',
            background: 'rgba(7, 25, 20, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'var(--color-gold-light)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            transform: 'translateY(100%)',
            transition: 'transform 0.3s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
        >
          <Eye size={14} /> Quick View
        </div>
      </div>

      {/* Card Info */}
      <div
        style={{
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
          textAlign: 'center'
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div>
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}
          >
            {product.category}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              color: textColor,
              letterSpacing: '0.03em',
              lineHeight: 1.25,
              marginBottom: '8px'
            }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'none'}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.7rem', color: mutedTextColor }}>
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div style={{ marginTop: '0.5rem' }}>
          <p
            className="price-tag"
            style={{
              fontSize: '1.1rem',
              color: 'var(--color-gold-light)',
              fontWeight: 600,
              marginBottom: '12px'
            }}
          >
            {formatPrice(product.price)}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'transparent',
              border: `1px solid ${isDarkTheme ? 'rgba(212, 175, 55, 0.4)' : '#D4AF37'}`,
              color: isDarkTheme ? '#FAF7F2' : '#1A1E1C',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
            className="card-add-btn"
          >
            <ShoppingBag size={13} /> Add To Bag
          </button>
        </div>
      </div>

      <style>{`
        .product-card-hover:hover {
          border-color: var(--color-gold) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }
        .product-card-hover:hover .product-card-img {
          transform: scale(1.08);
        }
        .product-card-hover:hover .quick-view-bar {
          transform: translateY(0) !important;
        }
        .card-add-btn:hover {
          background: var(--color-gold) !important;
          color: #051410 !important;
          border-color: var(--color-gold) !important;
        }
      `}</style>
    </div>
  );
};
