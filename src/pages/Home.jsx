import { Link } from "react-router-dom";
import { ArrowRight, Truck, Undo2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { UseProducts } from "@/components/ProductList";
import Footer from "@/components/Footer";

const perks = [
  { icon: Truck, label: "Free shipping over $50" },
  { icon: Undo2, label: "30-day easy returns" },
  { icon: ShieldCheck, label: "Secure checkout" },
];

export default function Home() {
  const { products, loading, error } = UseProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="border-b border-line bg-paper-dim">
        <div className=" ml-20 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-clay">
              New arrivals weekly
            </p>
            <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              Well-made goods for everyday life.
            </h1>
            <p className="mt-4 max-w-md text-ink-soft">
              FieldStock is a small catalog of clothing, jewelry, and
              electronics chosen for how they hold up, not just how they look on
              day one.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to={"/products"}>
                <Button variant="outline" size="lg">
                  Shop Now
                  <ArrowRight size={25} />
                </Button>
              </Link>
            </div>
          </div>
         
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {perks.map((perk) => (
            <div
              key={perk.label}
              className="flex items-center gap-3 text-sm text-ink-soft"
            >
              <perk.icon size={18} className="text-clay" />
              {perk.label}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink">Featured products</h2>
          <Link to="/products" className="text-sm text-clay hover:underline">
            View all →
          </Link>
        </div>

        {loading && <Loader label="Loading featured products" />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
    
  );
}
