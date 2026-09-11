import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const QuickViewModal = () => {
  const navigate = useNavigate();
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    handleClose();
  };

  const handleViewFullDetails = () => {
    handleClose();
    navigate(`/product/${quickViewProduct.id}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(5, 15, 12, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={handleClose}
    >
      <div
        className="animate-fade-in"
        style={{
          background: '#0D2D25',
          border: '1px solid var(--color-gold)',
          maxWidth: '850px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(6, 25, 20, 0.8)',
            border: '1px solid var(--color-gold-muted)',
            color: '#FAF7F2',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Product Image */}
        <div style={{ background: '#071915', height: '100%', minHeight: '350px' }}>
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Details Column */}
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {quickViewProduct.category}
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '6px 0 12px 0', color: '#FAF7F2', lineHeight: 1.2 }}>
            {quickViewProduct.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(quickViewProduct.rating) ? 'var(--color-gold)' : 'none'} />
              ))}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {quickViewProduct.rating} ({quickViewProduct.reviews} client reviews)
            </span>
          </div>

          <p style={{ fontSize: '1.6rem', color: 'var(--color-gold-light)', fontWeight: 600, marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
            {formatPrice(quickViewProduct.price)}
          </p>

          <p style={{ fontSize: '0.9rem', color: '#D1D8D5', lineHeight: 1.6, marginBottom: '24px' }}>
            {quickViewProduct.description}
          </p>

          {/* Quantity selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              QUANTITY
            </span>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-gold-muted)', background: '#071915' }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ background: 'none', border: 'none', color: '#FAF7F2', padding: '8px 12px', cursor: 'pointer' }}
              >
                <Minus size={14} />
              </button>
              <span style={{ padding: '0 12px', fontSize: '0.9rem', fontWeight: 600 }}>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{ background: 'none', border: 'none', color: '#FAF7F2', padding: '8px 12px', cursor: 'pointer' }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={handleAddToCart}
              className="btn-gold-solid"
              style={{ flex: 1, padding: '12px' }}
            >
              <ShoppingBag size={16} /> ADD TO BAG
            </button>
            <button
              onClick={() => toggleWishlist(quickViewProduct)}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold-light)',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Save to Wishlist"
            >
              <Heart size={18} fill={isSaved ? 'var(--color-gold)' : 'none'} color="var(--color-gold)" />
            </button>
          </div>

          <button
            onClick={handleViewFullDetails}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-gold)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textDecoration: 'underline'
            }}
          >
            VIEW FULL PRODUCT DETAILS <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
