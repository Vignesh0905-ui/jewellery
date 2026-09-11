import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, cartSubtotal, cartDeliveryFee, cartTotal } = useShop();

  if (cart.length === 0) {
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
        <ShoppingBag size={56} color="var(--color-gold)" style={{ opacity: 0.8, marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FAF7F2', marginBottom: '0.5rem' }}>
          Your shopping bag is waiting.
        </h1>
        <p style={{ color: '#9EB3A9', fontSize: '1rem', maxWidth: '400px', marginBottom: '2rem' }}>
          Explore our collection of handcrafted fine jewellery and select your timeless piece.
        </p>
        <Link to="/shop" className="btn-gold-solid">
          EXPLORE JEWELLERY
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#051410', padding: '4rem 2rem 6rem 2rem', minHeight: '85vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#FAF7F2', textAlign: 'center', marginBottom: '0.5rem' }}>
          YOUR SHOPPING BAG
        </h1>
        <div className="gold-divider" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                style={{
                  background: '#0D2D25',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  borderRadius: '2px'
                }}
              >
                {/* Product Thumbnail */}
                <div style={{ width: '90px', height: '90px', flexShrink: 0, background: '#051410', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Info & Quantity */}
                <div style={{ flexGrow: 1 }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {product.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      color: '#FAF7F2',
                      margin: '2px 0 6px 0',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  <p style={{ color: 'var(--color-gold-light)', fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>
                    {formatPrice(product.price)}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                    {/* Quantity controls */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(212, 175, 55, 0.3)', background: '#051410' }}>
                      <button
                        onClick={() => updateCartQuantity(product.id, -1)}
                        style={{ background: 'none', border: 'none', color: '#FAF7F2', padding: '4px 10px', cursor: 'pointer' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 600 }}>{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, 1)}
                        style={{ background: 'none', border: 'none', color: '#FAF7F2', padding: '4px 10px', cursor: 'pointer' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      style={{ background: 'none', border: 'none', color: '#8E9993', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                      title="Remove item"
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div
              style={{
                background: '#0D2D25',
                border: '1px solid var(--color-gold)',
                padding: '2rem',
                borderRadius: '2px',
                position: 'sticky',
                top: '100px'
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FAF7F2', marginBottom: '1.5rem' }}>
                ORDER SUMMARY
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#D1D8D5' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: '#FAF7F2' }}>{formatPrice(cartSubtotal)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#D1D8D5' }}>
                  <span>Express Delivery</span>
                  <span style={{ fontWeight: 600, color: cartDeliveryFee === 0 ? 'var(--color-gold-light)' : '#FAF7F2' }}>
                    {cartDeliveryFee === 0 ? 'FREE' : formatPrice(cartDeliveryFee)}
                  </span>
                </div>

                {cartSubtotal <= 5000 && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontStyle: 'italic' }}>
                    Add {formatPrice(5001 - cartSubtotal)} more for complimentary shipping.
                  </p>
                )}
              </div>

              {/* Total Calculation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', color: '#FAF7F2', fontWeight: 600, marginBottom: '2rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-sans)' }}>
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-gold-solid"
                style={{ width: '100%', padding: '14px', fontSize: '0.8rem' }}
              >
                PROCEED TO CHECKOUT <ArrowRight size={16} />
              </button>

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: '#9EB3A9', fontSize: '0.75rem' }}>
                <ShieldCheck size={16} color="var(--color-gold)" /> Guaranteed Safe & Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
