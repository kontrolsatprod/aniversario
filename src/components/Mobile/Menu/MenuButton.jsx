import { useState } from "react";
import { useConfig } from "../../../config/configContext.jsx";

export default function MenuButton({ text, onClick }) {
  const cfg = useConfig() || {};
  const styleCfg = cfg.MenuButtonDesign || {};

  const [hover, setHover] = useState(false);

  const currentStyles = {
    backgroundColor: hover
      ? styleCfg.bgColorHover || "#fff"
      : styleCfg.bgColor || "#0277d3",
    color: hover
      ? styleCfg.textColorHover || "#000"
      : styleCfg.textColor || "#fff",
  };

  return (
    <button
      className="shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-all w-auto h-16 text-lg md:text-xl uppercase rounded-lg font-medium text-center px-4"
      style={currentStyles}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={text}
    >
      {text}
    </button>
  );
}
