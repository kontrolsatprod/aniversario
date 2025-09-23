// src/components/shared/VerTodosButton.jsx
import { useConfig } from "../../../config/configContext";

export default function VerTodosButton() {
  const cfg = useConfig() || {};
  // Adapter: SeeAll -> { text, color, bgColor, href? }
  const see = cfg.SeeAll || {};

  const text = see.text || "VER TODOS DESCONTOS";
  const color = see.color || "#ffffff";
  const bgColor = see.bgColor || "#fa3a3a";
  const href = see.href || "https://www.kontrolsat.com/pt/promocoes";

  return (
    <div className="container mx-auto h-24 flex items-center justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-xl py-3 font-black text-xl uppercase text-center transition duration-300 ease-in-out hover:scale-105"
        style={{ backgroundColor: bgColor, color }}
        aria-label={text}
      >
        {text}
      </a>
    </div>
  );
}
