import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lumora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lumora_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Orders history state persisted in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('lumora_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User state (demo)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lumora_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('lumora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lumora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lumora_user');
    }
  }, [user]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });
    addToast(`Added "${product.name}" to your shopping bag.`);
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      addToast(`Removed "${item.product.name}" from shopping bag.`);
    }
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const isSaved = wishlist.some((item) => item.id === product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Added "${product.name}" to wishlist.`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Checkout order submission
  const placeOrder = (customerDetails, paymentMethod) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const delivery = subtotal > 5000 ? 0 : 99;
    const total = subtotal + delivery;

    const newOrder = {
      orderId: `#LUMORA${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      customer: customerDetails,
      paymentMethod,
      items: [...cart],
      subtotal,
      delivery,
      total,
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const loginDemo = (email, name) => {
    const newUser = { email, name: name || 'Valued Client' };
    setUser(newUser);
    addToast('Demo login successful.');
  };

  const logoutDemo = () => {
    setUser(null);
    addToast('Logged out successfully.');
  };

  // Calculated properties
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDeliveryFee = cartSubtotal > 5000 || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = cartSubtotal + cartDeliveryFee;

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        wishlist,
        orders,
        user,
        toasts,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        loginDemo,
        logoutDemo,
        addToast,
        removeToast,
        cartCount,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
