import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Calendar, CreditCard, ArrowRight } from 'lucide-react';
import { formatPrice } from '../data/products';

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '70vh', background: '#051410' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FAF7F2' }}>
          No Order Information Found
        </h1>
        <p style={{ color: '#9EB3A9', marginTop: '1rem' }}>Return to shop to place a demo order.</p>
        <Link to="/shop" className="btn-gold-solid" style={{ marginTop: '2rem' }}>
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#051410', padding: '5rem 2rem 7rem 2rem', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        className="animate-fade-in"
        style={{
          background: '#0D2D25',
          border: '1px solid var(--color-gold)',
          maxWidth: '680px',
          width: '100%',
          padding: '3.5rem 2.5rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          borderRadius: '2px'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--color-gold)', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={40} color="var(--color-gold)" />
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block' }}>
          TRANSACTION COMPLETE
        </span>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#FAF7F2', margin: '0.5rem 0 1rem 0' }}>
          ORDER CONFIRMED
        </h1>

        <p style={{ color: '#D1D8D5', fontSize: '1.05rem', marginBottom: '2rem', fontWeight: 300 }}>
          Thank you for choosing LUMORA. Your order details have been saved to your account.
        </p>

        {/* Order Details Summary Box */}
        <div
          style={{
            background: '#051410',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            padding: '1.5rem',
            marginBottom: '2.5rem',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', color: '#8E9993', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
              ORDER ID
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-gold-light)' }}>
              {order.orderId}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.7rem', color: '#8E9993', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
              ORDER TOTAL
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FAF7F2' }}>
              {formatPrice(order.total)}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.7rem', color: '#8E9993', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
              PAYMENT METHOD
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#FAF7F2' }}>
              {order.paymentMethod}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.7rem', color: '#8E9993', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
              ESTIMATED DELIVERY
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#FAF7F2' }}>
              3–5 Business Days
            </span>
          </div>
        </div>

        {/* Purchased Items List */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'left', borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '1.5rem' }}>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ITEMS ORDERED ({order.items.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', color: '#D1D8D5' }}>
                <span>• {product.name} (x{quantity})</span>
                <span style={{ fontWeight: 600, color: '#FAF7F2' }}>{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/shop')} className="btn-gold-solid">
            CONTINUE SHOPPING <ArrowRight size={16} />
          </button>

          <button onClick={() => navigate('/orders')} className="btn-gold-outline">
            VIEW MY ORDERS
          </button>
        </div>
      </div>
    </div>
  );
};
