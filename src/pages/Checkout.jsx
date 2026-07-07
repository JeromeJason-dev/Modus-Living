import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

const initialForm = {
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  cardNumber: "",
};

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const total = subtotal >= 50 ? subtotal : subtotal + 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.address.trim()) next.address = "Address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.postalCode.trim()) next.postalCode = "Postal code is required.";
    if (!form.cardNumber.trim()) next.cardNumber = "Card number is required.";
    else if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, "")))
      next.cardNumber = "Enter a valid card number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 900);
  };

  if (placed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <CheckCircle2 size={40} className="text-olive" />
        <h1 className="mt-4 font-display text-2xl text-ink">Order placed</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Thanks{user?.name ? `, ${user.name}` : ""} — a confirmation has been sent to {user?.email}.
        </p>
        <Button variant="primary" size="lg" className="mt-6" onClick={() => navigate("/products")}>
          Continue shopping
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-ink">Nothing to check out</h1>
        <p className="mt-2 text-sm text-ink-soft">Your cart is empty.</p>
        <Button variant="primary" className="mt-6" onClick={() => navigate("/products")}>
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>
      <p className="mt-1 text-sm text-ink-soft">Logged in as {user?.email}</p>

      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <form onSubmit={handleSubmit} noValidate className="space-y-5 md:col-span-2">
          <div>
            <label htmlFor="fullName">Full name</label>
            <Input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} error={Boolean(errors.fullName)} />
            
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <Input id="address" name="address" value={form.address} onChange={handleChange} error={Boolean(errors.address)} />
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city">City</label>
              <Input id="city" name="city" value={form.city} onChange={handleChange} error={Boolean(errors.city)} />
              
            </div>
            <div>
              <label htmlFor="postalCode">Postal code</label>
              <Input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} error={Boolean(errors.postalCode)} />
             
            </div>
          </div>

          <div>
            <label htmlFor="cardNumber">Card number</label>
            <Input
              id="cardNumber"
              name="cardNumber"
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              value={form.cardNumber}
              onChange={handleChange}
              error={Boolean(errors.cardNumber)}
            />
            
          </div>

          <Button type="submit" variant="default" size="lg" className="w-full" disabled={placing}>
            {placing ? "Placing order…" : `Place order — ${formatPrice(total)}`}
          </Button>
        </form>

        <div className="h-fit rounded-sm border border-line p-6">
          <h2 className="mb-4 font-display text-lg text-ink">Order summary</h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-ink-soft">
                  {item.title.slice(0, 24)}{item.title.length > 24 ? "…" : ""} × {item.quantity}
                </span>
                <span className="text-ink">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-lg text-ink">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
