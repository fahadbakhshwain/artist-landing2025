export function Checkbox({ className="", ...props }) {
  return <input type="checkbox" className={`w-4 h-4 border ${className}`} {...props} />;
}
