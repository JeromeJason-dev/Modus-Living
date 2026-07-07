import { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useFilters } from "@/context/FilterContext";
import { useEffect, useState } from "react";

export function ProductList({ products }) {
  const { searchTerm, category, sortBy } = useFilters();

  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, category, sortBy]);

  if (visibleProducts.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-lg text-ink">No products match your search</p>
        <p className="mt-1 text-sm text-ink-soft">Try a different keyword or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
const API_URL = "https://fakestoreapi.com/products";

export function UseProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        if (!ignore) setProducts(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load products.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      ignore = true;
    };
  }, []);

  return { products, loading, error };
}


