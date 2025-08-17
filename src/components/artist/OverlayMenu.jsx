export default function OverlayMenu({ isOpen, onClose, onNavigate }) {
  return (
    <div className={`fixed inset-0 bg-black/85 z-50 transition ${isOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none'}`}>
      <button className="absolute top-6 right-6 text-white text-3xl" onClick={onClose}>×</button>
      <nav className="h-full grid place-items-center">
        <ul className="text-center space-y-4">
          {[
            ["home","home"],
            ["about","about / bio"],
            ["work","work portfolio"],
            ["projects","projects / exhibitions"],
            ["press","press / media"],
            ["contact","contact"]
          ].map(([id,label])=>(
            <li key={id}>
              <a href={`#${id}`} onClick={(e)=>{e.preventDefault(); onNavigate(id);}} className="text-white text-xl hover:text-blue-500">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
