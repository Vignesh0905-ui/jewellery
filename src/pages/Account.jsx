import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Package, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Account = () => {
  const { user, loginDemo, logoutDemo, orders } = useShop();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginDemo(email || 'client@lumora.com', name || 'Valued Client');
  };

  if (user) {
    return (
      <div style={{ background: '#051410', padding: '5rem 2rem 7rem 2rem', minHeight: '85vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              background: '#0D2D25',
              border: '1px solid var(--color-gold)',
              padding: '3rem 2.5rem',
              borderRadius: '2px',
              textAlign: 'center'
            }}
          >
            <div style={{ width: '64px', height: '64px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--color-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <User size={32} color="var(--color-gold)" />
            </div>

            <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              WELCOME BACK
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FAF7F2', margin: '0.5rem 0 0.5rem 0' }}>
              {user.name}
            </h1>
            <p style={{ color: '#9EB3A9', fontSize: '0.95rem', marginBottom: '2rem' }}>
              {user.email}
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link to="/orders" className="btn-gold-solid">
                <Package size={16} /> VIEW MY ORDERS ({orders.length})
              </Link>
              <button onClick={logoutDemo} className="btn-gold-outline">
                <LogOut size={16} /> LOGOUT
              </button>
            </div>

            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1.5rem', fontSize: '0.8rem', color: '#8E9993', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="var(--color-gold)" /> Demo Client Account Session
            </div>
          </div>
        </div>
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
          maxWidth: '480px',
          width: '100%',
          padding: '3rem 2rem',
          borderRadius: '2px'
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', textAlign: 'center' }}>
          LUMORA CLIENT PORTAL
        </span>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF7F2', textAlign: 'center', margin: '0.5rem 0 1.5rem 0' }}>
          {isRegister ? 'CREATE AN ACCOUNT' : 'CLIENT LOGIN'}
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', background: '#051410', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', background: '#051410', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9EB3A9', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', background: '#051410', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '10px 14px', color: '#FAF7F2', outline: 'none' }}
            />
          </div>

          <button type="submit" className="btn-gold-solid" style={{ marginTop: '1rem', padding: '12px' }}>
            {isRegister ? 'CREATE ACCOUNT' : 'LOGIN'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={{ background: 'none', border: 'none', color: 'var(--color-gold)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
};
