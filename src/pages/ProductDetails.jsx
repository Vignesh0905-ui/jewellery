import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh', background: '#051410' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF7F2' }}>
          Product Not Found
        </h2>
        <p style={{ color: '#9EB3A9', marginTop: '1rem' }}>The requested piece could not be located.</p>
        <Link to="/shop" className="btn-gold-outline" style={{ marginTop: '2rem' }}>
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  const images = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.image];
  const isSaved = isInWishlist(product.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div style={{ background: '#051410', paddingBottom: '6rem', minHeight: '90vh' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '1.5rem 2rem 0 2rem' }}>
        <button
          onClick={() => navigate(-1)}
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
            gap: '6px'
          }}
        >
          <ArrowLeft size={14} /> Back to Jewellery
        </button>
      </div>

      {/* Main Product Layout */}
      <div style={{ maxWidth: '1300px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
          {/* Product Gallery */}
          <div>
            <div
              style={{
                width: '100%',
                paddingTop: '100%',
                position: 'relative',
                background: '#0D2D25',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: '70px',
                      height: '70px',
                      padding: 0,
                      border: `1px solid ${selectedImage === idx ? 'var(--color-gold)' : 'rgba(212, 175, 55, 0.2)'}`,
                      background: '#0D2D25',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: '2px'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              LUMORA FINE {product.category}
            </span>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FAF7F2', margin: '0.5rem 0 1rem 0', lineHeight: 1.15 }}>
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'none'} />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#9EB3A9' }}>
                {product.rating} ({product.reviews} Client Reviews)
              </span>
            </div>

            {/* Price tag in ₹ */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem', color: 'var(--color-gold-light)', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                {formatPrice(product.price)}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#68B39B', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(104, 179, 155, 0.1)', padding: '3px 8px' }}>
                In Stock & Ready to Ship
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#D1D8D5', lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9EB3A9' }}>
                QUANTITY
              </span>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(212, 175, 55, 0.3)', background: '#0D2D25' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ background: 'none', border: 'none', color: '#FAF7F2', padding: '10px 16px', cursor: 'pointer' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0 16px', fontSize: '0.95rem', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ background: 'none', border: 'none', color: '#FAF7F2', padding: '10px 16px', cursor: 'pointer' }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Buttons Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button
                onClick={handleAddToCart}
                className="btn-gold-solid"
                style={{ flex: '1 1 200px', padding: '14px 24px' }}
              >
                <ShoppingBag size={18} /> ADD TO CART
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-gold-outline"
                style={{ flex: '1 1 180px', padding: '14px 24px' }}
              >
                BUY NOW
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid var(--color-gold)',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)'
                }}
                title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={20} fill={isSaved ? 'var(--color-gold)' : 'none'} />
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
              <div>
                <Truck size={20} color="var(--color-gold)" style={{ margin: '0 auto 4px auto' }} />
                <span style={{ fontSize: '0.7rem', display: 'block', color: '#9EB3A9' }}>Express Shipping</span>
              </div>
              <div>
                <ShieldCheck size={20} color="var(--color-gold)" style={{ margin: '0 auto 4px auto' }} />
                <span style={{ fontSize: '0.7rem', display: 'block', color: '#9EB3A9' }}>Certified Hallmark</span>
              </div>
              <div>
                <RefreshCw size={20} color="var(--color-gold)" style={{ margin: '0 auto 4px auto' }} />
                <span style={{ fontSize: '0.7rem', display: 'block', color: '#9EB3A9' }}>Easy 15-Day Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Accordion: Description, Delivery Information, Care Guide */}
        <div style={{ marginTop: '5rem', background: '#0D2D25', border: '1px solid rgba(212, 175, 55, 0.25)', padding: '2.5rem' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', marginBottom: '2rem', gap: '2rem' }}>
            <button
              onClick={() => setActiveTab('description')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === 'description' ? 'var(--color-gold)' : 'transparent'}`,
                paddingBottom: '12px',
                color: activeTab === 'description' ? 'var(--color-gold)' : '#9EB3A9',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === 'delivery' ? 'var(--color-gold)' : 'transparent'}`,
                paddingBottom: '12px',
                color: activeTab === 'delivery' ? 'var(--color-gold)' : '#9EB3A9',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              DELIVERY INFORMATION
            </button>
            <button
              onClick={() => setActiveTab('care')}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === 'care' ? 'var(--color-gold)' : 'transparent'}`,
                paddingBottom: '12px',
                color: activeTab === 'care' ? 'var(--color-gold)' : '#9EB3A9',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              CARE GUIDE
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="animate-fade-in" style={{ color: '#D1D8D5', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.25rem' }}>{product.description}</p>
              {product.details && (
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="animate-fade-in" style={{ color: '#D1D8D5', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--color-gold-light)' }}>
                ✦ Complimentary delivery on orders above ₹5,000.
              </p>
              <p style={{ marginBottom: '0.75rem' }}>• Estimated delivery: 3–5 business days across pan-India postal locations.</p>
              <p style={{ marginBottom: '0.75rem' }}>• All shipments are fully insured and packed in tamper-evident signature velvet gift boxes.</p>
              <p>• Signature required upon recipient delivery confirmation.</p>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="animate-fade-in" style={{ color: '#D1D8D5', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--color-gold-light)' }}>
                ✦ Preserving the splendor of your LUMORA creation:
              </p>
              <p style={{ marginBottom: '0.75rem' }}>• Store jewellery separately in the original velvet pouch or soft-lined case to prevent abrasion.</p>
              <p style={{ marginBottom: '0.75rem' }}>• Avoid direct contact with perfumes, lotions, hairsprays, household chemicals, or salt water.</p>
              <p style={{ marginBottom: '0.75rem' }}>• Gently polish gold and gemstone surfaces using a lint-free micro-fiber cleaning cloth after each wear.</p>
              <p>• Complimentary annual inspection and cleaning service available at all LUMORA boutiques.</p>
            </div>
          )}
        </div>

        {/* Related Products: YOU MAY ALSO LIKE */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', textAlign: 'center', color: '#FAF7F2', marginBottom: '0.5rem' }}>
              YOU MAY ALSO LIKE
            </h2>
            <div className="gold-divider" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem', marginTop: '3rem' }}>
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} theme="dark" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
