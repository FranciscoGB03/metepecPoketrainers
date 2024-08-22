import { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineRule } from "react-icons/md";
import { Rol } from "./Rol/Rol";
import { Permisos } from "./Permisos/Permisos";

const catalogos = [
  { name: "Roles", icon: GrUserAdmin, component: <Rol /> },
  { name: "Permisos", icon: MdOutlineRule, component: <Permisos /> },
];

const Catalogos = () => {
  const [select, setSelect] = useState({});
  return (
    <div>
      Catalogos
      <div className="flex space-x-2">
        {catalogos.map((cat) => (
          <button
            className={`flex items-center space-x-2 rounded-sm p-2 transition-colors duration-300 ${
              cat.name === select?.name
                ? "bg-blue-950 text-white"
                : "bg-gray-200"
            }`}
            key={cat.name}
            onClick={() => setSelect(cat)}
            aria-pressed={cat.name === select?.name}
          >
            <cat.icon className="text-lg" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">{select?.component}</div>
    </div>
  );
};
export default Catalogos;
