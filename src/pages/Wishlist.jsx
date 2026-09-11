import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div
        style={{
          minHeight: '75vh',
          background: '#051410',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}
      >
        <Heart size={56} color="var(--color-gold)" style={{ opacity: 0.8, marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FAF7F2', marginBottom: '0.5rem' }}>
          Your wishlist is currently empty.
        </h1>
        <p style={{ color: '#9EB3A9', fontSize: '1rem', maxWidth: '400px', marginBottom: '2rem' }}>
          Save your favorite fine jewellery pieces to revisit or add to your shopping bag anytime.
        </p>
        <Link to="/shop" className="btn-gold-solid">
          DISCOVER PIECES
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#051410', padding: '4rem 2rem 6rem 2rem', minHeight: '85vh' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#FAF7F2', textAlign: 'center', marginBottom: '0.5rem' }}>
          MY WISHLIST
        </h1>
        <p style={{ textAlign: 'center', color: '#9EB3A9', fontSize: '0.9rem' }}>
          {wishlist.length} saved luxury item{wishlist.length > 1 ? 's' : ''}
        </p>
        <div className="gold-divider" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '2rem',
            marginTop: '3.5rem'
          }}
        >
          {wishlist.map((product) => (
            <div
              key={product.id}
              style={{
                background: '#0D2D25',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Product Image */}
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ position: 'relative', paddingTop: '100%', cursor: 'pointer', background: '#051410' }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Product Info & Actions */}
              <div style={{ padding: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {product.category}
                </span>
                <h3
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    color: '#FAF7F2',
                    margin: '4px 0 8px 0',
                    cursor: 'pointer'
                  }}
                >
                  {product.name}
                </h3>
                <p style={{ color: 'var(--color-gold-light)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-sans)' }}>
                  {formatPrice(product.price)}
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="btn-gold-solid"
                    style={{ flex: 1, padding: '10px', fontSize: '0.68rem' }}
                  >
                    <ShoppingBag size={14} /> ADD TO CART
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#8E9993',
                      padding: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
