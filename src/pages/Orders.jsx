import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const Orders = () => {
  const { orders } = useShop();

  if (orders.length === 0) {
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
        <Package size={56} color="var(--color-gold)" style={{ opacity: 0.8, marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FAF7F2', marginBottom: '0.5rem' }}>
          No orders yet.
        </h1>
        <p style={{ color: '#9EB3A9', fontSize: '1rem', maxWidth: '400px', marginBottom: '2rem' }}>
          You have not placed any orders yet. Discover our latest collections.
        </p>
        <Link to="/shop" className="btn-gold-solid">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#051410', padding: '4rem 2rem 6rem 2rem', minHeight: '85vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#FAF7F2', textAlign: 'center', marginBottom: '0.5rem' }}>
          MY ORDERS
        </h1>
        <p style={{ textAlign: 'center', color: '#9EB3A9', fontSize: '0.9rem' }}>
          {orders.length} order history record{orders.length > 1 ? 's' : ''}
        </p>
        <div className="gold-divider" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3.5rem' }}>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                background: '#0D2D25',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '2px',
                padding: '2rem'
              }}
            >
              {/* Order Header info */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(212, 175, 55, 0.15)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    ORDER NUMBER
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF7F2' }}>
                    {order.orderId}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#D1D8D5' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8E9993', display: 'block' }}>DATE</span>
                    <span>{order.date}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8E9993', display: 'block' }}>STATUS</span>
                    <span style={{ color: 'var(--color-gold-light)', fontWeight: 600 }}>{order.status}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8E9993', display: 'block' }}>TOTAL</span>
                    <span style={{ fontWeight: 600, color: '#FAF7F2' }}>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {order.items.map(({ product, quantity }) => (
                  <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', background: '#051410' }} />
                    <div style={{ flexGrow: 1 }}>
                      <span style={{ fontSize: '0.95rem', color: '#FAF7F2', fontWeight: 500, display: 'block' }}>{product.name}</span>
                      <span style={{ fontSize: '0.78rem', color: '#9EB3A9' }}>Category: {product.category} | Qty: {quantity}</span>
                    </div>
                    <span style={{ fontSize: '0.95rem', color: 'var(--color-gold-light)', fontWeight: 600 }}>
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
