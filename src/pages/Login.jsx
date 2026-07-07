import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/checkout";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.password.trim()) next.password = "Password is required.";
    else if (form.password.length < 4) next.password = "Password must be at least 4 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message || "Unable to log in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Log in</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Log in to reach checkout. Any email and password (4+ characters) works in this demo.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={Boolean(errors.email)}
            autoComplete="email"
          />
          
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={Boolean(errors.password)}
            autoComplete="current-password"
          />
          
        </div>

        {formError && <p className="text-sm text-clay-dark">{formError}</p>}

        <Button type="submit" variant="default" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Don't have an account <Link to="/register" className="text-clay hover:underline">Register</Link>
      </p>
      <p className="mt-4 text-center text-sm text-ink-soft">
        Just here to browse? <Link to="/products" className="text-clay hover:underline">Continue shopping</Link>
      </p>
    </div>
  );
}
