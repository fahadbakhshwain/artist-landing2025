export function Textarea({ className="", ...props }) {
  return <textarea className={`w-full px-3 py-2 border outline-none ${className}`} {...props} />;
}
