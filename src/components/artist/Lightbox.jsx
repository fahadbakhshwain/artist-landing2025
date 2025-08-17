import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({ isOpen, onClose, images=[], currentIndex=0, onIndexChange }) {
  if (!isOpen) return null;
  const prev = () => onIndexChange((currentIndex-1+images.length)%images.length);
  const next = () => onIndexChange((currentIndex+1)%images.length);
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button className="absolute top-6 right-6 text-white" onClick={onClose}><X/></button>
      <button className="absolute left-6 text-white" onClick={prev}><ChevronLeft/></button>
      <img src={images[currentIndex]} alt="" className="max-h-[90vh] max-w-[90vw] object-contain"/>
      <button className="absolute right-6 text-white" onClick={next}><ChevronRight/></button>
    </div>
  );
}
