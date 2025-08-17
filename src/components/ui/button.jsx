export function Button({ variant="default", className="", ...props }) {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm border transition";
  const variants = {
    default: "bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900",
    outline: "bg-transparent text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:text-white",
    ghost: "bg-transparent text-white border border-white/60 hover:text-blue-500 hover:border-blue-500",
    link: "bg-transparent border-0 text-blue-600 hover:text-blue-700 p-0 h-auto"
  };
  return <button className={`${base} ${variants[variant]||variants.default} ${className}`} {...props} />;
}
