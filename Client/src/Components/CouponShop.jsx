import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"

const CouponShop = () => {
   const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedCoupons, setPurchasedCoupons] = useState([]);
  const [copiedCouponId, setCopiedCouponId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:3000/coupons");
        if (!response.ok) throw new Error("Failed to fetch coupons");
        const data = await response.json();
        setCoupons(data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((coupon) => coupon.Category)),
        ];
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handlePurchase = (couponId) => {
    setPurchasedCoupons([...purchasedCoupons, couponId]);
    alert("Purchase successful! Code revealed.");
  };

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCouponId(id);
    setTimeout(() => setCopiedCouponId(null), 2000);
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.Brand_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.Description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || coupon.Category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div style={styles.loading}>Loading coupons...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Exclusive Coupons</h1>

      <div style={styles.filtersContainer}>
        <input
          type="text"
          placeholder="Search coupons..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          style={styles.categoryFilter}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food & Beverage</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health & Beauty</option>
          <option value="Other">Other</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredCoupons.length === 0 ? (
        <div style={styles.noResults}>
          No coupons found matching your criteria
        </div>
      ) : (
        <div style={styles.couponGrid}>
          {filteredCoupons.map((coupon) => (
            <div key={coupon._id} style={styles.couponCard}>
              <div style={styles.imageContainer}>
                <img
                  src={coupon.image}
                  alt={coupon.Brand_Name}
                  style={styles.couponImage}
                />
              </div>
              <div style={styles.brand}>{coupon.Brand_Name}</div>
              <div style={styles.category}>{coupon.Category}</div>
              <div style={styles.details}>
                <div style={styles.price}>₹{coupon.Price}</div>
                <div style={styles.expiry}>Valid until: {coupon.Date}</div>
              </div>
              <p style={styles.description}>{coupon.Description}</p>

              {purchasedCoupons.includes(coupon._id) ? (
                <div style={styles.codeSection}>
                  <div style={styles.codeContainer}>
                    <span style={styles.code}>{coupon.Code}</span>
                    <button
                      style={styles.copyButton}
                      onClick={() => handleCopy(coupon.Code, coupon._id)}
                    >
                      {copiedCouponId === coupon._id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <a
                    href={coupon.Link}
                    style={styles.redeemLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Redeem Now
                  </a>
                </div>
              ) : (
                <button
                  style={styles.purchaseButton}
                  onClick={() => handlePurchase(coupon._id)}
                >
                  Purchase for ₹{coupon.Price}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    color: "#1a1a1a",
    marginBottom: "2rem",
    fontWeight: "600",
  },
  couponGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  couponCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    overflow: "hidden",
  },
  couponImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2d3436",
  },
  category: {
    backgroundColor: "#e55039",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    width: "fit-content",
  },
  price: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#00b894",
  },
  expiry: {
    color: "#636e72",
    fontSize: "0.9rem",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    color: "#2d3436",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },
  purchaseButton: {
    backgroundColor: "#00b894",
    color: "white",
    border: "none",
    padding: "1rem",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "auto",
    ":hover": {
      backgroundColor: "#009d7a",
    },
  },
  codeSection: {
    marginTop: "auto",
  },
  codeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "1rem 0",
  },
  codeLabel: {
    color: "#636e72",
    fontSize: "0.9rem",
  },
  code: {
    fontSize: "1.2rem",
    fontWeight: "600",
    letterSpacing: "1px",
    backgroundColor: "#f8f9fa",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    flexGrow: 1,
  },
  copyButton: {
    backgroundColor: "#0984e3",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#0873c4",
    },
  },
  redeemLink: {
    display: "block",
    textAlign: "center",
    color: "#0984e3",
    textDecoration: "none",
    fontWeight: "600",
    ":hover": {
      textDecoration: "underline",
    },
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#2d3436",
    marginTop: "3rem",
  },
  error: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#e55039",
    marginTop: "3rem",
  },
  filtersContainer: {
    maxWidth: "1200px",
    margin: "0 auto 2rem",
    display: "flex",
    gap: "1rem",
    padding: "0 1rem",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 1,
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    minWidth: "250px",
  },
  categoryFilter: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "white",
    cursor: "pointer",
  },
  noResults: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#666",
    marginTop: "2rem",
  },
};

export default CouponShop;
