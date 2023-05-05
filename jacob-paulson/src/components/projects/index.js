import { useState } from "react";

export default function ProjectList(props) {
  const projects = props.projects;

  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div class="place-items-center grid grid-cols-4 p-4 gap-2">
      {projects.map((project) => (
        <div
          key={project.id}
          onMouseEnter={() => handleMouseEnter(project.id)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={project.image} alt={project.title} />
          {hovered === project.id && (
            <div className="transistion-opacity duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                <p className="text-sm mb-3 text-gray-300">
                  {project.description}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
