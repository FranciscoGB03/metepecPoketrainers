import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      404 NotFound <button onClick={() => navigate("/")}>Regresar</button>
    </div>
  );
};

export default NotFound;
