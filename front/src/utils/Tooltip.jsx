import PropTypes from "prop-types";

const Tooltip = ({ children, header, position }) => {
  const positionClasses = {
    left: "right-500 left-0",
    center: "top-0 -ml-24",
    right: "right-0",
    top: "-top-1 ml-6",
  };
  return (
    <div className="relative inline-block tooltip">
      {children}
      <div
        className={`flex flex-col bg-gradient-to-b from-cyan-400 to-cyan-800 min-w-max h-auto rounded-md absolute ${positionClasses[position]} -top-2 p-1 invisible group-hover:visible tooltip-item  text-white text-lg`}
      >
        {header}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.any,
  header: PropTypes.any,
  position: PropTypes.oneOf(["left", "center", "right", "top"]),
};
Tooltip.defaultProps = {
  position: "right",
};

export default Tooltip;
