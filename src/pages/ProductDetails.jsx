import { useState } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { Star, Minus, Plus, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { UseProducts } from "@/components/ProductList";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";

const tabs = [
  { to: "", label: "Overview", end: true },
  { to: "reviews", label: "Reviews" },
  { to: "specifications", label: "Specifications" },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading, error } = UseProducts(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((p) => p.id === Number(id));

  if (loading) return <Loader label="Loading product" />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
        <ChevronLeft size={15} /> Back to shop
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square rounded-sm border border-line bg-cream-card p-10">
          <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
        </div>

        <div>
          <Badge variant="outline" className="mb-3 capitalize">{product.category}</Badge>
          <h1 className="font-display text-2xl leading-tight text-ink sm:text-3xl">{product.title}</h1>

          <div className="mt-3 flex items-center gap-1.5 text-sm text-ink-soft">
            <Star size={14} className="fill-clay text-clay" />
            {product.rating?.rate ?? "—"}
            <span>({product.rating?.count ?? 0} reviews)</span>
          </div>

          <p className="mt-5 font-display text-3xl text-ink">{formatPrice(product.price)}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-sm border border-line">
              <button
                className="focus-ring p-2.5 text-ink-soft hover:text-ink"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                className="focus-ring p-2.5 text-ink-soft hover:text-ink"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <Button variant="default" size="lg" onClick={handleAdd} className="px-15 ml-15">
              {added ? "Added to cart ✓" : "Add to cart"}
            </Button>
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <nav className="mb-6 flex gap-6 border-b border-line">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.label}
                  to={tab.to}
                  end={tab.end}
                  className={({ isActive }) =>
                    cn(
                      "-mb-px border-b-2 pb-3 text-sm font-medium transition-colors",
                      isActive
                        ? "border-clay text-ink"
                        : "border-transparent text-ink-soft hover:text-ink"
                    )
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </nav>
            <Outlet context={{ product }} />
          </div>
        </div>
      </div>
    </div>
  );
}
