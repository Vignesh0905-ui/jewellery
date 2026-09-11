import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Smartphone, Banknote, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, cartDeliveryFee, cartTotal, placeOrder } = useShop();

  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '9876543210',
    address: '102 Taj Residency, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid Email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid Phone Number is required';
    if (!formData.address.trim()) newErrors.address = 'Delivery Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const createdOrder = placeOrder(formData, paymentMethod);
      navigate('/order-success', { state: { order: createdOrder } });
    }
  };

  return (
    <div style={{ background: '#051410', padding: '4rem 2rem 6rem 2rem', minHeight: '90vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#FAF7F2', textAlign: 'center', marginBottom: '0.5rem' }}>
          CHECKOUT
        </h1>
        <p style={{ textAlign: 'center', color: '#9EB3A9', fontSize: '0.9rem' }}>
          Complete your luxury order purchase
        </p>
        <div className="gold-divider" />

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
          {/* Left Column: Contact & Shipping & Payment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* 1. CONTACT INFORMATION */}
            <div style={{ background: '#0D2D25', border: '1px solid rgba(212, 175, 55, 0.25)', padding: '2rem', borderRadius: '2px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-gold-light)', marginBottom: '1.25rem' }}>
                1. CONTACT INFORMATION
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ width: '100%', background: '#051410', border: `1px solid ${errors.fullName ? '#E57373' : 'rgba(212, 175, 55, 0.3)'}`, padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
                  />
                  {errors.fullName && <span style={{ fontSize: '0.75rem', color: '#E57373' }}>{errors.fullName}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', background: '#051410', border: `1px solid ${errors.email ? '#E57373' : 'rgba(212, 175, 55, 0.3)'}`, padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
                    />
                    {errors.email && <span style={{ fontSize: '0.75rem', color: '#E57373' }}>{errors.email}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', background: '#051410', border: `1px solid ${errors.phone ? '#E57373' : 'rgba(212, 175, 55, 0.3)'}`, padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
                    />
                    {errors.phone && <span style={{ fontSize: '0.75rem', color: '#E57373' }}>{errors.phone}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DELIVERY ADDRESS */}
            <div style={{ background: '#0D2D25', border: '1px solid rgba(212, 175, 55, 0.25)', padding: '2rem', borderRadius: '2px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-gold-light)', marginBottom: '1.25rem' }}>
                2. DELIVERY ADDRESS
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: '100%', background: '#051410', border: `1px solid ${errors.address ? '#E57373' : 'rgba(212, 175, 55, 0.3)'}`, padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
                  />
                  {errors.address && <span style={{ fontSize: '0.75rem', color: '#E57373' }}>{errors.address}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      style={{ width: '100%', background: '#051410', border: `1px solid ${errors.city ? '#E57373' : 'rgba(212, 175, 55, 0.3)'}`, padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      style={{ width: '100%', background: '#051410', border: `1px solid ${errors.state ? '#E57373' : 'rgba(212, 175, 55, 0.3)'}`, padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      style={{ width: '100%', background: '#051410', border: `1px solid ${errors.pincode ? '#E57373' : 'rgba(212, 175, 55, 0.3)'}`, padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. PAYMENT METHOD (UI Selection) */}
            <div style={{ background: '#0D2D25', border: '1px solid rgba(212, 175, 55, 0.25)', padding: '2rem', borderRadius: '2px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-gold-light)', marginBottom: '1.25rem' }}>
                3. PAYMENT METHOD (DEMO)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: paymentMethod === 'UPI' ? '#08211B' : '#051410',
                    border: `1px solid ${paymentMethod === 'UPI' ? 'var(--color-gold)' : 'rgba(212, 175, 55, 0.2)'}`,
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    style={{ accentColor: 'var(--color-gold)' }}
                  />
                  <Smartphone size={20} color="var(--color-gold)" />
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FAF7F2' }}>UPI / Google Pay / PhonePe / Paytm</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#9EB3A9' }}>Instant secure UPI payment simulation</span>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: paymentMethod === 'CARD' ? '#08211B' : '#051410',
                    border: `1px solid ${paymentMethod === 'CARD' ? 'var(--color-gold)' : 'rgba(212, 175, 55, 0.2)'}`,
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                    style={{ accentColor: 'var(--color-gold)' }}
                  />
                  <CreditCard size={20} color="var(--color-gold)" />
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FAF7F2' }}>Credit / Debit Card</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#9EB3A9' }}>Visa, Mastercard, RuPay, Amex</span>
                  </div>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: paymentMethod === 'COD' ? '#08211B' : '#051410',
                    border: `1px solid ${paymentMethod === 'COD' ? 'var(--color-gold)' : 'rgba(212, 175, 55, 0.2)'}`,
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    style={{ accentColor: 'var(--color-gold)' }}
                  />
                  <Banknote size={20} color="var(--color-gold)" />
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FAF7F2' }}>Cash on Delivery</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#9EB3A9' }}>Pay upon doorstep receipt</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
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
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FAF7F2', marginBottom: '1.25rem' }}>
                SUMMARY & ITEMS
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '6px' }}>
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', background: '#051410' }} />
                    <div style={{ flexGrow: 1 }}>
                      <span style={{ fontSize: '0.82rem', color: '#FAF7F2', display: 'block', lineHeight: 1.2 }}>{product.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#9EB3A9' }}>Qty: {quantity}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-gold-light)', fontWeight: 600 }}>
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#D1D8D5' }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#D1D8D5' }}>
                  <span>Express Delivery</span>
                  <span style={{ color: cartDeliveryFee === 0 ? 'var(--color-gold-light)' : '#FAF7F2' }}>
                    {cartDeliveryFee === 0 ? 'FREE' : formatPrice(cartDeliveryFee)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', color: '#FAF7F2', fontWeight: 600, borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1rem' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-sans)' }}>
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn-gold-solid" style={{ width: '100%', padding: '14px' }}>
                PLACE ORDER <ArrowRight size={16} />
              </button>

              <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.75rem', color: '#8E9993', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Lock size={14} color="var(--color-gold)" /> Demo Mode: No real charge will occur.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
