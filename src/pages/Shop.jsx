import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const Shop = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryParam = searchParams.get('category') || 'ALL';
  const searchQueryParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(activeCategoryParam);
  const [searchTerm, setSearchTerm] = useState(searchQueryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(35000);

  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
    if (searchParams.get('search') !== null) {
      setSearchTerm(searchParams.get('search'));
    }
  }, [searchParams]);

  const categories = ['ALL', 'EARRINGS', 'NECKLACES', 'RINGS', 'BANGLES', 'BRACELETS', 'PENDANTS', 'WATCHES'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory === 'New') return p.newArrival;
        if (selectedCategory !== 'ALL' && p.category.toUpperCase() !== selectedCategory.toUpperCase()) {
          return false;
        }

        // Search term filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesCategory = p.category.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          if (!matchesName && !matchesCategory && !matchesDesc) return false;
        }

        // Price range filter
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchTerm, sortBy, maxPrice]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'ALL') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val) {
      newParams.delete('search');
    } else {
      newParams.set('search', val);
    }
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSearchTerm('');
    setSortBy('featured');
    setMaxPrice(35000);
    setSearchParams({});
  };

  return (
    <div className="shop-page" style={{ paddingBottom: '6rem', minHeight: '85vh', background: '#051410' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, #08211B 0%, #051410 100%)',
          padding: '4rem 2rem 3rem 2rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            THE LUMORA COLLECTION
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: '#FAF7F2', margin: '0.5rem 0 1rem 0' }}>
            SHOP LUMORA
          </h1>
          <p style={{ fontSize: '1rem', color: '#9EB3A9', fontWeight: 300 }}>
            Discover pieces designed to become part of your story.
          </p>
          <div className="gold-divider" />
        </div>
      </div>

      <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '2rem' }}>
        {/* Category Navigation Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory.toUpperCase() === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  background: isActive ? 'var(--color-gold)' : 'rgba(13, 45, 37, 0.6)',
                  color: isActive ? '#051410' : '#FAF7F2',
                  border: `1px solid ${isActive ? 'var(--color-gold)' : 'rgba(212, 175, 55, 0.25)'}`,
                  padding: '8px 18px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '1px'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter and Controls Toolbar */}
        <div
          style={{
            background: '#0D2D25',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 240px', maxWidth: '360px', background: '#051410', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '6px 12px' }}>
            <Search size={16} color="var(--color-gold)" />
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FAF7F2',
                fontSize: '0.85rem',
                outline: 'none',
                width: '100%',
                fontFamily: 'var(--font-sans)'
              }}
            />
          </div>

          {/* Price Range Slider Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 240px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              MAX PRICE: ₹{maxPrice.toLocaleString('en-IN')}
            </span>
            <input
              type="range"
              min={3000}
              max={35000}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--color-gold)', cursor: 'pointer' }}
            />
          </div>

          {/* Sorting dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={15} color="var(--color-gold)" />
            <span style={{ fontSize: '0.72rem', color: '#9EB3A9', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#051410',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#FAF7F2',
                padding: '6px 12px',
                fontSize: '0.78rem',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)'
              }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Reset Filters button if applied */}
          {(selectedCategory !== 'ALL' || searchTerm || maxPrice < 35000 || sortBy !== 'featured') && (
            <button
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-gold)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={13} /> Reset Filters
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#9EB3A9' }}>
          Showing <strong style={{ color: 'var(--color-gold-light)' }}>{filteredProducts.length}</strong> luxury pieces
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} theme="dark" />
            ))}
          </div>
        ) : (
          /* Empty Search No Result State */
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              background: '#0D2D25',
              border: '1px dashed rgba(212, 175, 55, 0.3)',
              borderRadius: '2px',
              marginTop: '2rem'
            }}
          >
            <Filter size={48} color="var(--color-gold)" style={{ margin: '0 auto 1rem auto', opacity: 0.7 }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FAF7F2' }}>
              No pieces found.
            </h3>
            <p style={{ color: '#9EB3A9', marginTop: '8px', fontSize: '0.9rem' }}>
              Try adjusting your category selection, search terms, or price limits.
            </p>
            <button
              onClick={resetFilters}
              className="btn-gold-outline"
              style={{ marginTop: '1.75rem' }}
            >
              VIEW ALL JEWELLERY
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
