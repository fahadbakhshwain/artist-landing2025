export default function ProjectDrawer({ isOpen, onClose, project }) {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen?'':'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition ${isOpen?'opacity-100':'opacity-0'}`} onClick={onClose}/>
      <aside className={`absolute right-0 top-0 h-full w-full md:w-[520px] bg-white overflow-y-auto transition-transform ${isOpen?'translate-x-0':'translate-x-full'}`}>
        <div className="p-6">
          <button className="float-right text-2xl" onClick={onClose}>×</button>
          {project ? (
            <>
              <h3 className="text-2xl font-light mb-2">{project.title}</h3>
              <p className="text-sm text-neutral-500 mb-4">{project.place} • {project.year}</p>
              <p className="text-neutral-700 mb-6">{project.description}</p>
              <div className="space-y-4">
                {project.images.map((src,i)=>(
                  <img key={i} src={src} alt="" className="w-full object-cover"/>
                ))}
              </div>
            </>
          ): <p>No project</p>}
        </div>
      </aside>
    </div>
  );
}
