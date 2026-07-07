export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
