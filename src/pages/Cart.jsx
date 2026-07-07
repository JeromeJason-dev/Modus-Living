import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Add something you'll actually use.
        </p>
        <Link to={"/products"}>
          <Button variant="primary" className="mt-6">
            Browse products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">Your cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-ink-soft hover:text-clay-dark"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        <ul className="divide-y divide-line border border-line rounded-sm md:col-span-2">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 p-4">
              <Link
                to={`/products/${item.id}`}
                className="h-20 w-20 shrink-0 rounded-sm border border-line bg-cream-card p-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    to={`/products/${item.id}`}
                    className="line-clamp-2 text-sm font-medium text-ink hover:text-clay-dark"
                  >
                    {item.title}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="focus-ring text-ink-soft hover:text-clay-dark"
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-sm border border-line">
                    <button
                      className="focus-ring p-2 text-ink-soft hover:text-ink"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-7 text-center text-xs font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="focus-ring p-2 text-ink-soft hover:text-ink"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-display text-base text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-sm border border-line p-6">
          <h2 className="mb-4 font-display text-lg text-ink">Order summary</h2>
          <div className="flex justify-between text-sm text-ink-soft">
            <span>Subtotal</span>
            <span className="text-ink">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink-soft">
            <span>Shipping</span>
            <span className="text-ink">
              {subtotal >= 50 ? "Free" : formatPrice(5)}
            </span>
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-lg text-ink">
            <span>Total</span>
            <span>{formatPrice(subtotal >= 50 ? subtotal : subtotal + 5)}</span>
          </div>
          <Link to={"/checkout"}>
            <Button variant="default" size="lg" className="mt-6 w-full">
              Checkout <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
