import PropTypes from "prop-types";
import { useState } from "react";
import { EquipoTop } from "../models/models";

const EquipoModal = ({ isVisible, onClose }) => {
  /** hooks */
  const [equipo, setEquipo] = useState(EquipoTop);
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/2 relative">
        <button
          className="!absolute right-1 top-1 px-3 text-center align-middle text-xl text-gray-400 hover:text-gray-900"
          onClick={() => {
            onClose();
          }}
        >
          X
        </button>
      </div>
      <div></div>
    </div>
  );
};
EquipoModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};
export default EquipoModal;
