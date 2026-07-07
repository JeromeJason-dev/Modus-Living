import { SearchFilter } from "@/components/SearchFilter";
import { ProductList } from "@/components/ProductList";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import { UseProducts } from "@/components/ProductList";

export default function Products() {
  const { products, loading, error } = UseProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-ink">Shop the catalog</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {loading ? "Loading products…" : `${products.length} products available`}
        </p>
      </div>

      <div className="mb-8">
        <SearchFilter />
      </div>

      {loading && <Loader label="Loading products" />}
      {error && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}
      {!loading && !error && <ProductList products={products} />}
    </div>
    
  );
}
