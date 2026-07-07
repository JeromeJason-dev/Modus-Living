import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, LogOut, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to={"/"} className="font-display text-xl tracking-tight text-ink">
          Modus Living
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm tracking-wide transition-colors",
                  isActive
                    ? "text-ink font-semibold"
                    : "text-ink-soft hover:text-ink",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="flex items-center gap-1.5 text-sm text-ink-soft">
                <User size={15} /> {user.name}
              </span>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut size={15} /> Log out
              </Button>
            </div>
          ) : (
            <Link to={"/login"}>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex"
              >
                Log in
              </Button>
            </Link>
          )}
          <Link to={"/cart"}>
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[11px] font-semibold text-paper">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          <button
            className="focus-ring inline-flex items-center justify-center rounded-sm p-2 text-ink md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-paper px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-sm",
                    isActive ? "text-ink font-semibold" : "text-ink-soft",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-sm text-ink-soft"
              >
                Log out ({user.name})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-ink-soft"
              >
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
