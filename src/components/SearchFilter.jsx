import { Search } from "lucide-react";
import { useFilters } from "@/context/FilterContext";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
  { value: "jewelery", label: "Jewelry" },
  { value: "electronics", label: "Electronics" },
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
];

export function SearchFilter() {
  const { searchTerm, setSearchTerm, category, setCategory, sortBy, setSortBy } = useFilters();

  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6">
      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products…"
          className="pl-9"
          aria-label="Search products"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "focus-ring rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors",
                category === c.value
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-ink-soft">
          Sort by
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="focus-ring rounded-sm border border-line bg-cream-card px-2.5 py-1.5 text-xs text-ink"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
