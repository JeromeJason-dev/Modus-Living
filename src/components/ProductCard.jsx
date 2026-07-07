import { Link } from "react-router-dom";
import { Star, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-paper-dim">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant="outline" className="absolute left-3 top-3 bg-paper capitalize">
          {product.category}
        </Badge>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-ink hover:text-clay-dark">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-xs text-ink-soft">
          <Star size={13} className="fill-clay text-clay" />
          {product.rating?.rate ?? "—"}
          <span className="text-ink-soft/70">({product.rating?.count ?? 0})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg text-ink">{formatPrice(product.price)}</span>
          <Button
            size="lg"
            variant="default"
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.title} to cart`}
          >
            <Plus size={14} /> Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
