// src/components/Mobile/Footer/FooterMobile.jsx
import { useConfig } from "../../../config/configContext.jsx";

export default function FooterMobile() {
  const cfg = useConfig() || {};
  // podes mapear estes campos no buildConfigFromData se quiseres
  const fc = cfg.Footer || {};
  const textColor = fc.textColor || "#9ca3af"; // gray-400
  const linkColor = fc.linkColor || "#9ca3af";
  const linkHover = fc.linkHover || "#ffffff";
  const borderColor = fc.borderColor || "rgba(255,255,255,0.2)";
  const bg = fc.bgColor || "transparent";
  const text = fc.text || "";

  const links = [
    { label: "Kontrolsat", href: "/" },
    {
      label: "Política de Privacidade",
      href: "https://www.kontrolsat.com/pt/info/politica-de-privacidade-2",
      blank: true,
    },
    {
      label: "Termos e Condições",
      href: "https://www.kontrolsat.com/pt/info/termos-e-condicoes-de-venda-3",
      blank: true,
    },
    {
      label: "Ajuda",
      href: "https://www.kontrolsat.com/pt/info/como-fazer-uma-encomenda-23",
      blank: true,
    },
    {
      label: "Contactos",
      href: "https://www.kontrolsat.com/pt/info/contactos-27",
      blank: true,
    },
  ];

  return (
    <footer className="w-full mt-5 pb-5" style={{ backgroundColor: bg }}>
      <p className="text-center text-md mb-3" style={{ color: textColor }}>
        {text}
      </p>
      <hr />
      <div className="container mx-auto px-4 my-2">
        <ul
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b pb-3 mb-3"
          style={{ borderColor }}
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="px-2 text-sm"
                style={{ color: linkColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                target={l.blank ? "_blank" : undefined}
                rel={l.blank ? "noopener noreferrer" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-center text-xs" style={{ color: textColor }}>
          Copyright 2019–2024 Kontrolsat, Unip. Lda — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
